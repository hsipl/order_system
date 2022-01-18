import 'dart:async';
import 'package:http/http.dart';
import 'dart:convert';
import 'preference_operation.dart';

const String kLoginPath = 'http://140.125.45.167:8000/api/user/login';
const String kLogoutPath = 'http://140.125.45.167:8000/api/user/logout';
const String kStorePath = 'http://140.125.45.167:8000/api/store';
const String kProductPath = 'http://140.125.45.167:8000/api/product';

class Api {
  Future<String> login(Map loginData) async {
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
      } else {
        status = 'login api: ' + response.statusCode.toString();
      }
      status = response.statusCode.toString();
    } on TimeoutException catch (e) {
      status = 'login api: ' + e.toString();
    }
    return status;
  }

  Future<String> logout() async {
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
      } else {
        status = 'logout api: ' + response.statusCode.toString();
      }
    } on TimeoutException catch (e) {
      status = 'logout api : ' + e.toString();
    }
    return status;
  }

  Future<String> product() async {
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
        setProductSharedPrefs(response.body);
        status = response.statusCode.toString();
      } else {
        status = 'product api : ' + response.statusCode.toString();
      }
    } on TimeoutException catch (e) {
      status = 'product api : ' + e.toString();
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
