import 'package:shared_preferences/shared_preferences.dart';

Future<void> setLoginSharedPrefs(bool status) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setBool('login', status);
  print(
      'printed by setLoginSharedPrefs : ' + prefs.getBool('login').toString());
}
