import 'package:flutter/material.dart';

const fieldColor = Color(0xFFEAEAEA);

const kBoxDecorationStyle = BoxDecoration(
  color: fieldColor,
  boxShadow: [
    BoxShadow(
      color: Colors.black12,
      offset: Offset(0, 2),
    ),
  ],
);

const kOutlineInputBorder = OutlineInputBorder(
  borderSide: BorderSide(color: Colors.grey, width: 2.0),
  borderRadius: BorderRadius.all(Radius.circular(20)),
);



// theme setting
const primaryColor = Color(0xFFE0E0E0);
const primaryColorLight = Color(0xFFFFFFFF);
const primaryColorDark = Color(0xFFAEAEAE);
const primaryTextColor = Color(0xFF000000);
const double scrollbarThickness = 10.0;
ThemeData  appTheme = ThemeData(
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
  scrollbarTheme: const ScrollbarThemeData().copyWith(
    thickness: MaterialStateProperty.all(scrollbarThickness),
  ),
);