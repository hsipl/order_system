import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/shopping_action.dart';
import 'package:client/redux/actions/temp_shopping_action.dart';
import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';
import '../button_style/styled_buttons.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ActionRow extends StatefulWidget {
  const ActionRow({
    Key? key,
  }) : super(key: key);

  @override
  State<ActionRow> createState() => _ActionRowState();
}

class _ActionRowState extends State<ActionRow> {
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
                onPress: () {
                  StoreProvider.of<AppState>(context).dispatch(ShoppingListAdd());
                  StoreProvider.of<AppState>(context)
                      .dispatch(UpdateTotalAmount());
                  Navigator.pop(context);
                },
              )),
          const Spacer(),
          SizedBox(
            width: 150,
            height: 50,
            child: ActionButton(
              action: '取消',
              color: kCancelButtonColor,
              onPress: () {
                StoreProvider.of<AppState>(context)
                    .dispatch(TempShoppingListClear());
                Navigator.pop(context);
              },
            ),
          ),
        ],
      ),
    );
  }
}
