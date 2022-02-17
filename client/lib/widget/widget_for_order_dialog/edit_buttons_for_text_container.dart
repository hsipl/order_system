import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';

import '../styled_buttons.dart';

class EditButtonsForTextContainer extends StatelessWidget {
  const EditButtonsForTextContainer({
    Key? key,
  }) : super(key: key);

  void nextLabel() {}

  void clearLabel() {}

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
              onPress: nextLabel,
            ),
            ActionButton(
              color: kCancelButtonColor,
              action: '清空所有',
              onPress: clearLabel,
            ),
          ],
        ),
      ),
    );
  }
}
