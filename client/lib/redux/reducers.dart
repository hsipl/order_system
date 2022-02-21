import 'package:client/model/app_state.dart';
import 'package:client/services/serializer.dart';

import 'actions/checkout_action.dart';
import 'actions/product_action.dart';
import 'actions/temp_checkout_action.dart';

AppState reducer(AppState prevState, dynamic action) {
  AppState newState = AppState.fromAppState(prevState);

  // Checkout表單
  if (action is CheckoutAdd) {
    // 新增物件到 Checkout Column

    for (CheckoutItem item in prevState.tempCheckoutList) {
      prevState.checkoutList.add(item);
    }
    newState.checkoutList = prevState.checkoutList;
  } else if (action is CheckoutRemove) {
    // 刪除 Checkout Column 物件

    prevState.checkoutList.removeAt(action.payload);
    newState.checkoutList = prevState.checkoutList;
  } else if (action is CheckoutClear) {
    // 清空 Checkout Column 物件

    newState.checkoutList = [];
  } else if (action is UpdateCheckoutPrice) {
    // 計算總金額

    prevState.totalAmount = 0;
    for (CheckoutItem item in prevState.checkoutList) {
      prevState.totalAmount += item.amount * int.parse(item.product.price);
    }
    newState.totalAmount = prevState.totalAmount;
  }

  // Product清單

  else if (action is ProductAdd) {
    // 新增 Product

    prevState.productList.add(action.payload);
    newState.productList = prevState.productList;
  } else if (action is ProductClear) {
    newState.productList = [];
  }
  // OrderDialog 的表單
  else if (action is TempCheckoutAdd) {
    // OrderDialog List 新增物件 tempCheckoutItem(預購物品 還沒送到右邊的)

    prevState.tempCheckoutList
        .add(CheckoutItem(product: action.payload, tags: []));
    newState.tempCheckoutList = prevState.tempCheckoutList;
  } else if (action is TempCheckoutClear) {
    // OrderDialog List 清空 CheckoutItem

    newState.tempCheckoutList = [];
  } else if (action is TempCheckoutRemove) {
    // OrderDialog List 移除指定 tempCheckoutItem

    prevState.tempCheckoutList.removeAt(action.payload);
    newState.tempCheckoutList = prevState.tempCheckoutList;
  }
  // CheckoutItem 控制
  else if (action is SetTempCheckoutItemTags) {
    // CheckoutItem 新增Tag

    prevState.tempCheckoutList.last.tags.add(action.payload);
    newState.tempCheckoutList.last.tags = prevState.tempCheckoutList.last.tags;
  } else if (action is SetTempCheckoutItemAmount) {
    // CheckoutItem 新增數量

    prevState.tempCheckoutList.last.amount += action.payload;
    if (prevState.tempCheckoutList.last.amount < 1) {
      prevState.tempCheckoutList.last.amount = 1;
    }
    newState.tempCheckoutList.last.amount =
        prevState.tempCheckoutList.last.amount;
  }

  return newState;
}
