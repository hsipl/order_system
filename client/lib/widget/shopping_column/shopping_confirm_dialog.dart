import 'package:client/model/app_state.dart';
import 'package:flutter_redux/flutter_redux.dart';

import 'action_row.dart';
import 'package:flutter/material.dart';
import 'calculator.dart';
import 'final_shopping_list.dart';

class ShoppingConfirmDialog extends StatelessWidget {
  const ShoppingConfirmDialog({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, AppState>(

      converter: (store) => store.state,
      builder: (context, store) {
        int totalAmount = store.newTotalAmount;
        int sheetNo = store.newSheetNo;
        return SingleChildScrollView(
          child: Dialog(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.0)),
            child: SizedBox(
              width: 900,
              height: 600,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(25, 20, 0, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          '確認訂單',
                          style: TextStyle(fontSize: 30),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(
                          '編號 : $sheetNo',
                          style: const TextStyle(fontSize: 20),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(
                          '金額 : $totalAmount',
                          style: const TextStyle(fontSize: 20),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                      ],
                    ),
                  ),
                  const Divider(color: Colors.grey, height: 1),
                  IntrinsicHeight(
                    child: Row(
                      children: const[
                        Expanded(flex: 2, child: FinalShoppingList()),
                        VerticalDivider(color: Colors.grey, width: 1),
                        Expanded(flex: 1, child: Calculator()),
                      ],
                    ),
                  ),
                  const Divider(color: Colors.grey, height: 1),
                  const ActionRow(),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
