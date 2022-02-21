import 'package:client/services/serializer.dart';

class AppState {
  List<CheckoutItem> checkoutList = [];
  List<CheckoutItem> tempCheckoutList = [];
  List<Product> productList = [];
  int totalAmount = 0;

  AppState({required this.checkoutList});

  AppState.fromAppState(AppState another) {
    checkoutList = another.checkoutList;
    productList = another.productList;
    tempCheckoutList = another.tempCheckoutList;
    totalAmount = another.totalAmount;
  }

  List get newCheckoutList => checkoutList;

  List get newProductList => productList;

  List get newTempCheckoutList => tempCheckoutList;

  int get newTotalAmount => totalAmount;
}
