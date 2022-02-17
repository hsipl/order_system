import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/checkout_action.dart';
import 'package:client/redux/actions/temp_checkout_action.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
import 'package:flutter/material.dart';
import '../styled_buttons.dart';
import 'package:flutter_redux/flutter_redux.dart';


class ActionRow extends StatefulWidget {
  const ActionRow({
    Key? key,
    required this.tags,
    required this.productId,
    required this.amount,
  }) : super(key: key);

  final int productId;
  final int amount;
  final List<String> tags;

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
                  Map<String, dynamic> returnDataFromDialog = {
                    'productId': widget.productId,
                    'tags': widget.tags,
                    'amount': widget.amount,
                  };
                  CheckoutItem checkoutItem =
                      CheckoutItem.fromMap(returnDataFromDialog);
                  StoreProvider.of<AppState>(context)
                      .dispatch(CheckoutAdd(checkoutItem));
                  StoreProvider.of<AppState>(context)
                      .dispatch(TempCheckoutClear());
                  Navigator.pop(context, returnDataFromDialog);
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
                    .dispatch(TempCheckoutClear());
                Navigator.pop(context);
              },
            ),
          ),
        ],
      ),
    );
  }
}
