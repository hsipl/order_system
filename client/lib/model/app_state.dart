import 'package:client/services/serializer.dart';
import 'package:flutter/material.dart';

class AppState {
  List<ShoppingItem> shoppingList = [];
  List<ShoppingItem> tempShoppingList = [];
  List<Product> productList = [];
  int totalAmount = 0;
  int sheetNo = 0;
  String calculatorValue = "0";
  GlobalKey<AnimatedListState> animatedListKey = GlobalKey();

  AppState({required this.shoppingList});

  AppState.fromAppState(AppState another) {
    shoppingList = another.shoppingList;
    productList = another.productList;
    tempShoppingList = another.tempShoppingList;
    totalAmount = another.totalAmount;
    sheetNo = another.sheetNo;
    calculatorValue = another.calculatorValue;
    animatedListKey = another.animatedListKey;
  }


  List<ShoppingItem> get newShoppingList => shoppingList;

  List get newProductList => productList;

  List get newTempShoppingList => tempShoppingList;

  int get newTotalAmount => totalAmount;

  int get newSheetNo => sheetNo;

  String get newCalculatorValue => calculatorValue;

  GlobalKey get newAnimatedListKey => animatedListKey;
}
