import 'package:http/http.dart';
import 'dart:convert';

const String kLoginPath = 'http://10.0.2.2:8000/login';

class LoginApi {
  static Future<String> login(Map loginData) async {
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
    return response.body;
  }
}
