import 'package:client/model/app_state.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../styled_buttons.dart';

class AmountInput extends StatefulWidget {
  const AmountInput({

    Key? key,
  }) : super(key: key);


  @override
  State<AmountInput> createState() => _AmountInputState();
}

class _AmountInputState extends State<AmountInput> {
  @override
  Widget build(BuildContext context) {
    int amount = 0;
    // CheckoutItem tempItem = CheckoutItem(widget.productId, 0, []);
    // void setAmount(int amount,store) {
    //   if(store.newTempCheckoutList.length==0){
    //     StoreProvider.of<AppState>(context).dispatch(TempCheckoutAdd(tempItem));
    //   }
    //   tempItem.amount = amount;
    //   print(tempItem.amount);
    // }
    return SizedBox(
      height: 250,
      width: 100,
      child: InputDecorator(
        decoration: InputDecoration(
          labelText: '數量',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ActionButton(
              color: primaryTextColor,
              action: '+5',
              onPress: () {
                amount = amount + 5;
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '+',
              onPress: () {
                amount = amount + 1;
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-',
              onPress: () {
                amount = amount - 1;
                if (amount < 1) {
                  amount = 1;
                }
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-5',
              onPress: () {
                amount = amount - 5;
                if (amount < 1) {
                  amount = 1;
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
