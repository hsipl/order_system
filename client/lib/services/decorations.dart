import 'package:flutter/material.dart';

const fieldColor = Color(0xFFEAEAEA);

final kBoxDecorationStyle = BoxDecoration(
  color: fieldColor,
  borderRadius: BorderRadius.circular(10.0),
  boxShadow: const [
    BoxShadow(
      color: Colors.black12,
      blurRadius: 6.0,
      offset: Offset(0, 2),
    ),
  ],
);

const kOutlineInputBorder =  OutlineInputBorder(
  borderSide: BorderSide(color: Colors.grey, width: 2.0),
  borderRadius: BorderRadius.all(Radius.circular(20)),
);

