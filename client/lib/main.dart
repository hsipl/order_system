import 'package:flutter/material.dart';
import 'package:client/pages/login_page.dart';
import 'package:client/pages/home.dart';
import 'package:client/pages/block_goods_page.dart';
import 'package:client/pages/completed_order_page.dart';
import 'package:client/pages/delete_order_page.dart';
import 'package:client/pages/earning_page.dart';
import 'package:client/pages/go_to_admin_page.dart';

// theme setting
const primaryColor = Color(0xFFE0E0E0);
const primaryColorLight = Color(0xFFFFFFFF);
const primaryColorDark = Color(0xFFAEAEAE);
const primaryTextColor = Color(0xFF000000);
ThemeData appTheme = ThemeData(
  appBarTheme: const AppBarTheme(
    toolbarHeight: 100,
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
  runApp(MaterialApp(theme: appTheme, initialRoute: '/home', routes: {

    '/home': (context) =>const Home(),
    '/admin': (content) => const GoToAdminPage(),
    '/block': (content) => const BlockGoodsPage(),
    '/completed': (content) => const CompletedOrderPage(),
    '/delete': (content) => const DeletedOrderPage(),
    '/earning': (content) => const EarningPage(),
    '/login': (content) => const Login(),
  }));
}
