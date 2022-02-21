import 'package:client/model/app_state.dart';
import 'package:client/services/serializer.dart';

import 'actions/checkout_action.dart';
import 'actions/product_action.dart';
import 'actions/temp_checkout_action.dart';

AppState reducer(AppState prevState, dynamic action) {
  AppState newState = AppState.fromAppState(prevState);

  if (action is CheckoutAdd) {
    for(CheckoutItem item in prevState.tempCheckoutList){
      prevState.checkoutList.add(item);
    }
    newState.checkoutList = prevState.checkoutList;
  } else if (action is CheckoutRemove) {
    prevState.checkoutList.removeAt(action.payload);
    newState.checkoutList = prevState.checkoutList;
  } else if (action is CheckoutClear) {
    newState.checkoutList = [];
  } else if (action is ProductAdd) {
    prevState.productList.add(action.payload);
    newState.productList = prevState.productList;
  } else if (action is ProductClear) {
    newState.productList = [];
  }else if (action is TempCheckoutAdd){
    prevState.tempCheckoutList.add( CheckoutItem(productId:action.payload,tags: []));
    newState.tempCheckoutList = prevState.tempCheckoutList;
  }else if (action is TempCheckoutClear){
    newState.tempCheckoutList = [];
  }else if (action is TempCheckoutRemove){
    prevState.tempCheckoutList.removeAt(action.payload);
    newState.tempCheckoutList = prevState.tempCheckoutList;
  }else if (action is SetTempCheckoutItemTags){
    prevState.tempCheckoutList.last.tags.add(action.payload);
    newState.tempCheckoutList = prevState.tempCheckoutList;
  }else if (action is SetTempCheckoutItemAmount){
    prevState.tempCheckoutList.last.amount += action.payload;
    if(prevState.tempCheckoutList.last.amount<1){
      prevState.tempCheckoutList.last.amount = 1;
    }
    newState.tempCheckoutList = prevState.tempCheckoutList;
  }

  return newState;
}
