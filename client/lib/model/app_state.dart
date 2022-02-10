import 'package:flutter/material.dart';

class AppState{


  List checkoutList = [];

  AppState({required this.checkoutList});

  AppState.fromAppState(AppState another){
    checkoutList = another.checkoutList;
  }

  List get newCheckoutList => checkoutList;
}