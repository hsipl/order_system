import 'dart:async';
import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/product_action.dart';
import 'package:client/services/serializer.dart';
import 'package:client/widget/situation_dialog/error_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:http/http.dart';
import 'dart:convert';
import 'preference_operation.dart';

const String kLoginPath = 'http://140.125.45.167:8000/api/user/login';
const String kLogoutPath = 'http://140.125.45.167:8000/api/user/logout';
const String kStorePath = 'http://140.125.45.167:8000/api/store';
const String kProductPath = 'http://140.125.45.167:8000/api/product';

class Api {
  Future<String> login(Map loginData, context) async {
    String status = '';
    try {
      final uri = Uri.parse(kLoginPath);
      final headers = {'Content-Type': 'application/json'};
      final encoding = Encoding.getByName('utf-8');
      String jsonBody = json.encode(loginData);
      Response response = await post(
        uri,
        headers: headers,
        body: jsonBody,
        encoding: encoding,
      ).timeout(const Duration(seconds: 3));
      if (response.statusCode == 200) {
        updateCookie(response);
        Map<String, dynamic> store =
            jsonDecode(response.body)['data']['storeId'];
        setStoreInfoSharedPrefs(jsonEncode(store));
        setLoginSharedPrefs(true);
        Navigator.pushNamedAndRemoveUntil(
            context, '/home_activate', (Route<dynamic> route) => false);
      } else {
        status = 'login api: ' + response.statusCode.toString();
        setLoginSharedPrefs(false);
        showErrorDialog(context, status);
      }
      status = response.statusCode.toString();
    } on TimeoutException catch (e) {
      status = 'login api: ' + e.toString();
      setLoginSharedPrefs(false);
      showErrorDialog(context, status);
    }
    return status;
  }

  Future<String> logout(context) async {
    String status = '';
    try {
      final uri = Uri.parse(kLogoutPath);
      final headers = {'Content-Type': 'application/json'};
      Response response = await get(
        uri,
        headers: headers,
      ).timeout(const Duration(seconds: 2));
      if (response.statusCode == 200) {
        status = response.statusCode.toString();
        StoreProvider.of<AppState>(context).dispatch(ProductClear());
      } else {
        status = 'logout api: ' + response.statusCode.toString();
        showErrorDialog(context, status);
      }
    } on TimeoutException catch (e) {
      status = 'logout api : ' + e.toString();
      showErrorDialog(context, status);
    }
    return status;
  }

  Future<String> product(context) async {
    String status = '';
    try {
      final uri = Uri.parse(kProductPath);
      String? cookie = await getCookieSharedPrefs();
      Map<String, dynamic> headersWithNull = jsonDecode(cookie.toString());
      Map<String, String> headers = <String, String>{};
      headersWithNull.forEach((key, value) => headers[key] = value.toString());

      Response response = await get(
        uri,
        headers: headers,
      ).timeout(const Duration(seconds: 3));
      if (response.statusCode == 200) {
        updateCookie(response);

        List productList = jsonDecode(response.body.toString());
        for (int i = 0; i < productList.length; i++) {
          Product product = Product.fromMap(productList[i]);
          StoreProvider.of<AppState>(context).dispatch(ProductAdd(product));
        }
        status = response.statusCode.toString();
      } else {
        status = 'product api : ' + response.statusCode.toString();
        setLoginSharedPrefs(false);
        Navigator.pushNamedAndRemoveUntil(
            context, '/home_deactivate', (Route<dynamic> route) => false);
        showErrorDialog(context, status);
      }
    } on TimeoutException catch (e) {
      status = 'product api : ' + e.toString();
      setLoginSharedPrefs(false);
      Navigator.pushNamedAndRemoveUntil(
          context, '/home_deactivate', (Route<dynamic> route) => false);
      showErrorDialog(context, status);
    }
    return status;
  }

  void updateCookie(Response response) async {
    Map<String, String> headers = {};
    String? rawCookie = response.headers['set-cookie'];
    if (rawCookie != null) {
      int index = rawCookie.indexOf(';');
      headers['cookie'] =
          (index == -1) ? rawCookie : rawCookie.substring(0, index);
      var stringHeader = json.encode(headers);
      setCookieSharedPrefs(stringHeader);
    }
  }
}
