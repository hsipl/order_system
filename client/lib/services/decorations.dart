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
