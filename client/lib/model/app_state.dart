import 'package:client/services/serializer.dart';

class AppState {
  List<ShoppingItem> shoppingList = [];
  List<ShoppingItem> tempShoppingList = [];
  List<Product> productList = [];
  int totalAmount = 0;
  int sheetNo = 0;

  AppState({required this.shoppingList});

  AppState.fromAppState(AppState another) {
    shoppingList = another.shoppingList;
    productList = another.productList;
    tempShoppingList = another.tempShoppingList;
    totalAmount = another.totalAmount;
  }

  List<ShoppingItem> get newShoppingList => shoppingList;

  List get newProductList => productList;

  List get newTempShoppingList => tempShoppingList;

  int get newTotalAmount => totalAmount;
}
