import 'package:http/http.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

const String kLoginPath = 'http://140.125.45.167:8000/api/user/login';
const String kLogoutPath = 'http://140.125.45.167:8000/api/user/logout';
const String kStorePath = 'http://140.125.45.167:8000/api/store';

class Api {
  Future<String> login(Map loginData) async {
    final uri = Uri.parse(kLoginPath);
    final headers = {'Content-Type': 'application/json'};
    final encoding = Encoding.getByName('utf-8');
    String jsonBody = json.encode(loginData);
    Response response = await post(
      uri,
      headers: headers,
      body: jsonBody,
      encoding: encoding,
    );
    updateCookie(response);
    var status = jsonDecode(response.body);
    return status['msg'];
  }

  Future<String> logout() async {
    final uri = Uri.parse(kLogoutPath);
    final headers = {'Content-Type': 'application/json'};
    Response response = await get(
      uri,
      headers: headers,
    );
    updateCookie(response);
    print(response.body);
    var status = jsonDecode(response.body);
    return status['msg'];
  }

  Future<String> store() async {
    final uri = Uri.parse(kStorePath);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    Map<String,dynamic> headersWithNull = jsonDecode(prefs.getString('cookie').toString());
    Map<String, String> headers = <String, String>{};
    headersWithNull.forEach((key, value) => headers[key] = value.toString());
    Response response = await get(
      uri,
      headers: headers,
    );
    return response.body;
  }

  void updateCookie(Response response) async {
    Map<String, String> headers = {};
    String? rawCookie = response.headers['set-cookie'];
    if (rawCookie != null) {
      int index = rawCookie.indexOf(';');
      headers['cookie'] =
          (index == -1) ? rawCookie : rawCookie.substring(0, index);
      SharedPreferences prefs = await SharedPreferences.getInstance();
      var stringHeader = json.encode(headers);
      print(headers);
      await prefs.setString('cookie', stringHeader);
    }
  }
}
