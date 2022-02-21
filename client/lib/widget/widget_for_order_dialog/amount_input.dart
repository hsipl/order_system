import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_checkout_action.dart';
import 'package:client/services/decorations.dart';
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
                StoreProvider.of<AppState>(context)
                    .dispatch(SetTempCheckoutItemAmount(5));
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '+',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(SetTempCheckoutItemAmount(1));
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(SetTempCheckoutItemAmount(-1));
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-5',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(SetTempCheckoutItemAmount(-5));
              },
            ),
          ],
        ),
      ),
    );
  }
}
