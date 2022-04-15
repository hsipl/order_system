import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/shopping_action.dart';
import 'package:client/services/decorations.dart';
import 'package:client/widget/button_style/styled_buttons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

import '../../redux/actions/calculator_action.dart';
import '../../redux/actions/final_shopping_list.dart';

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
    return StoreConnector<AppState, AppState>(
        converter: (store) => store.state,
        builder: (context, store) {
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
                      onPress: () {
                        for (int i = 0; i < store.shoppingList.length; i++) {
                          StoreProvider.of<AppState>(context)
                              .dispatch(RemoveFinalShoppingListItem(0));
                        }
                        StoreProvider.of<AppState>(context)
                            .dispatch(UpdateSheetNo());
                        StoreProvider.of<AppState>(context)
                            .dispatch(ShoppingListClear());
                        StoreProvider.of<AppState>(context)
                            .dispatch(CalculatorValue("0"));
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
                      Navigator.pop(context);
                    },
                  ),
                ),
              ],
            ),
          );
        });
  }
}
