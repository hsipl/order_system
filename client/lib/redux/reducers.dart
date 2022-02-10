import 'actions.dart';
import 'package:client/model/app_state.dart';


AppState reducer(AppState prevState,dynamic action){
  AppState newState = AppState.fromAppState(prevState);

  if (action is CheckoutAdd){
    prevState.checkoutList.add(action.payload);
    newState.checkoutList = prevState.checkoutList;
  }else if(action is CheckoutClear){
    newState.checkoutList = [];
  }





  return newState;

}