import 'package:client/model/app_state.dart';
import 'package:client/redux/actions.dart';
import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';
import '../styled_buttons.dart';
import 'package:flutter_redux/flutter_redux.dart';


enum Actions { orderData }
class ActionRow extends StatefulWidget {
  const ActionRow({
    Key? key,
    required this.price,
    required this.labels,
    required this.amount,
    required this.product,
  }) : super(key: key);



  final String price;
  final String product;
  final List<String> labels;
  final List<String> amount;

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
            child:ActionButton(
                  action: '確定',
                  color: kConfirmButtonColor,
                  //TODO send values to check out column
                  onPress: () {
                    Map returnDataFromDialog = {
                      'product':widget.product,
                      'price':widget.price,
                      'labels':widget.labels,
                      'amount' :widget.amount,
                    };
                    StoreProvider.of<AppState>(context).dispatch(CheckoutAdd(returnDataFromDialog));
                    Navigator.pop(context,returnDataFromDialog);
                  },
                )
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
