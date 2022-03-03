import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_shopping_action.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

import '../button_style/styled_buttons.dart';

class EditButtonsForTextContainer extends StatelessWidget {
  const EditButtonsForTextContainer({
    Key? key,
    required this.product,
  }) : super(key: key);

  final Product product;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 250,
      width: 150,
      child: InputDecorator(
        expands: true,
        decoration: InputDecoration(
          labelText: '操作選項',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ActionButton(
              color: kConfirmButtonColor,
              action: '輸入下列',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(TempShoppingListAdd(product));
              },
            ),
            ActionButton(
              color: kCancelButtonColor,
              action: '清空所有',
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(TempShoppingListClear());
              },
            ),
          ],
        ),
      ),
    );
  }
}
