import 'package:client/model/app_state.dart';
import 'package:client/services/serializer.dart';

import 'actions/shopping_action.dart';
import 'actions/product_action.dart';
import 'actions/temp_shopping_action.dart';

AppState reducer(AppState prevState, dynamic action) {
  AppState newState = AppState.fromAppState(prevState);

  // Checkout表單
  if (action is ShoppingListAdd) {
    // 新增物件到 Checkout Column

    for (ShoppingItem item in prevState.tempShoppingList) {
      prevState.shoppingList.add(item);
    }
    newState.shoppingList = prevState.shoppingList;
  } else if (action is ShoppingLIstRemove) {
    // 刪除 Checkout Column 物件

    prevState.shoppingList.removeAt(action.payload);
    newState.shoppingList = prevState.shoppingList;
  } else if (action is ShoppingListClear) {
    // 清空 Checkout Column 物件

    newState.shoppingList = [];
  } else if (action is UpdateTotalAmount) {
    // 計算總金額

    prevState.totalAmount = 0;
    for (ShoppingItem item in prevState.shoppingList) {
      prevState.totalAmount += item.quantity * int.parse(item.product.price);
    }
    newState.totalAmount = prevState.totalAmount;
  } else if (action is UpdateSheetNo) {
    prevState.sheetNo += 1;

    newState.sheetNo = prevState.sheetNo;
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
  else if (action is TempShoppingListAdd) {
    // OrderDialog List 新增物件 tempCheckoutItem(預購物品 還沒送到右邊的)
    prevState.tempShoppingList
        .add(ShoppingItem(product: action.payload, tags: []));
    newState.tempShoppingList = prevState.tempShoppingList;
  } else if (action is TempShoppingListClear) {
    // OrderDialog List 清空 CheckoutItem

    newState.tempShoppingList = [];
  } else if (action is TempShoppingListRemove) {
    // OrderDialog List 移除指定 tempCheckoutItem

    prevState.tempShoppingList.removeAt(action.payload);
    newState.tempShoppingList = prevState.tempShoppingList;
  }
  // CheckoutItem 控制
  else if (action is SetTempCheckoutItemTags) {
    // CheckoutItem 新增Tag

    prevState.tempShoppingList.last.tags.add(action.payload);
    newState.tempShoppingList.last.tags = prevState.tempShoppingList.last.tags;
  } else if (action is SetTempShoppingItemQuantity) {
    // CheckoutItem 新增數量

    prevState.tempShoppingList.last.quantity += action.payload;
    if (prevState.tempShoppingList.last.quantity < 1) {
      prevState.tempShoppingList.last.quantity = 1;
    }
    newState.tempShoppingList.last.quantity =
        prevState.tempShoppingList.last.quantity;
  }

  return newState;
}
