import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> setLoginSharedPrefs(bool status) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setBool('login', status);
  //DEBUG
  print(
      'printed by setLoginSharedPrefs : ' + prefs.getBool('login').toString());
}

Future<bool?> getLoginSharedPrefs() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getBool('login');
}

Future<void> setCookieSharedPrefs(String stringHeader) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setString('cookie', stringHeader);
  //DEBUG
  print('printed by setCookieSharedPrefs : ' +
      prefs.getString('cookie').toString());
}

Future<String?> getCookieSharedPrefs() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getString('cookie');
}

Future<void> setStoreInfoSharedPrefs(var store) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setString('storeInfo', store.toString());
  //DEBUG
  print('printed by setStoreInfoSharedPrefs : ' +
      prefs.getString('storeInfo').toString());
}

Future<Map?> getStoreInfoSharedPrefs() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  Map<String, dynamic> storeId =
      jsonDecode(prefs.getString('storeInfo').toString());
  return storeId;
}

Future<void> setProductSharedPrefs(var product) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setString('product', product.toString());
}

Future<List<dynamic>?> getProductSharedPrefs() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  List<dynamic> storeId = jsonDecode(prefs.getString('product').toString());
  return storeId;
}
