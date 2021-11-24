import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';

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
    elevation: 3,
    shadowColor: primaryColorDark,
    backgroundColor: primaryColorLight,
    centerTitle: true,
    titleTextStyle: TextStyle(color: primaryTextColor, fontSize: 20),
    iconTheme: IconThemeData(
        color: primaryColorDark,
    ),
  ),
  primaryColor: primaryColor,
  primaryColorLight: primaryColorLight,
  primaryColorDark: primaryColorDark,
  primaryTextTheme: const TextTheme().apply(bodyColor: primaryTextColor),

  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      onPrimary: primaryTextColor,
      primary: primaryColor,

    ),
  ),
);

// void main() {
//   runApp(MaterialApp(theme: appTheme, initialRoute: '/home', routes: {
//
//     '/home': (context) =>const Home(),
//     '/admin': (content) => const GoToAdminPage(),
//     '/block': (content) => const BlockGoodsPage(),
//     '/completed': (content) => const CompletedOrderPage(),
//     '/delete': (content) => const DeletedOrderPage(),
//     '/earning': (content) => const EarningPage(),
//     '/login': (content) => const Login(),
//   }));
// }

void main() {
  runApp(MaterialApp(
    theme: appTheme,
    home: const Home(),
    onGenerateRoute: (settings) {
      switch (settings.name) {
        case '/login':
          return PageTransition(child: const Login(), type: PageTransitionType.rightToLeftWithFade);
          break;
        case '/admin':
          return PageTransition(child: const GoToAdminPage(), type: PageTransitionType.rightToLeftWithFade);
          break;
        case '/earning':
          return PageTransition(child: const EarningPage(), type: PageTransitionType.rightToLeftWithFade);
          break;
        case '/block':
          return PageTransition(child: const BlockGoodsPage(), type: PageTransitionType.rightToLeftWithFade);
          break;
        case '/delete':
          return PageTransition(child: const DeletedOrderPage(), type: PageTransitionType.rightToLeftWithFade);
          break;
        case '/completed':
          return PageTransition(child: const CompletedOrderPage(), type: PageTransitionType.rightToLeftWithFade);
          break;
        default:
          return null;
      }
    },
    initialRoute: '/',
  ));
}
