import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';
import '../styled_buttons.dart';

class ActionRow extends StatelessWidget {
  const ActionRow({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 15, 20, 10),
      child: Row(
        children: [
          SizedBox(
            width: 150,
            height: 50,
            child: ActionButton(
              action: '確定',
              color: kConfirmButtonColor,
              //TODO send values to check out column
              onPress: () => Navigator.pop(context),
            ),
          ),
          const Spacer(),
          SizedBox(
            width: 150,
            height: 50,
            child: ActionButton(
              action: '取消',
              color: kCancelButtonColor,
              onPress: () => Navigator.pop(context),
            ),
          ),
        ],
      ),
    );
  }
}
