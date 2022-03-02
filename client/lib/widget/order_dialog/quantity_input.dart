import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_shopping_action.dart';
import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../button_style/styled_buttons.dart';

class QuantityInput extends StatefulWidget {
  const QuantityInput({
    required this.price,
    Key? key,
  }) : super(key: key);
  final int price;
  @override
  State<QuantityInput> createState() => _QuantityInputState();
}

class _QuantityInputState extends State<QuantityInput> {
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
                    .dispatch(SetTempShoppingItemQuantity(5));
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '+',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(SetTempShoppingItemQuantity(1));

              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(SetTempShoppingItemQuantity(-1));

              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-5',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(SetTempShoppingItemQuantity(-5));
              },
            ),
          ],
        ),
      ),
    );
  }
}
