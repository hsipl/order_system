import 'package:client/services/serializer.dart';

class AppState {
  List checkoutList = [];
  List<Product> productList = [];

  AppState({required this.checkoutList});

  AppState.fromAppState(AppState another) {
    checkoutList = another.checkoutList;
    productList = another.productList;
  }

  List get newCheckoutList => checkoutList;

  List get newProductList => productList;
}
