import 'package:flutter/material.dart';
import 'package:client/pages/login_page.dart';
import 'package:client/pages/home.dart';

// theme setting
const primaryColor = Color(0xFFE0E0E0);
const primaryColorLight = Color(0xFFFFFFFF);
const primaryColorDark = Color(0xFFAEAEAE);
const primaryTextColor = Color(0xFF000000);
ThemeData appTheme = ThemeData(
  appBarTheme: const AppBarTheme(
    elevation: 2,
    shadowColor: primaryColorLight,
    backgroundColor: primaryColorDark,
    centerTitle: true,
    titleTextStyle: TextStyle(color: primaryTextColor, fontSize: 20),
  ),
  primaryColor: primaryColor,
  primaryColorLight: primaryColorLight,
  primaryColorDark: primaryColorDark,
  primaryTextTheme: const TextTheme().apply(bodyColor: primaryTextColor),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      onPrimary: primaryTextColor,
      primary: primaryColorDark,
    ),
  ),
);

//main
void main() {
  runApp(MaterialApp(theme: appTheme, initialRoute: '/login', routes: {
    '/login': (BuildContext content) => const Login(),
    '/home': (context) =>const Home(),
  }));
}
