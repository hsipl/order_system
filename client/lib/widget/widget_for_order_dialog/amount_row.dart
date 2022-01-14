import 'package:client/services/decorations.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../styled_buttons.dart';

class AmountRow extends StatefulWidget {
  const AmountRow({
    Key? key,
  }) : super(key: key);

  @override
  State<AmountRow> createState() => _AmountRowState();
}

class _AmountRowState extends State<AmountRow> {
  int amount = 0;

  var textController = TextEditingController(text: '0');

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ActionButton(
            color: primaryTextColor,
            action: '+5',
            onPress: () {
              amount = amount + 5;
              textController.text = amount.toString();
            },
          ),
          const SizedBox(
            width: 30,
          ),
          ActionButton(
            color: primaryTextColor,
            action: '+',
            onPress: () {
              amount = amount + 1;
              textController.text = amount.toString();
            },
          ),
          const SizedBox(
            width: 30,
          ),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: primaryTextColor),
              borderRadius: BorderRadius.circular(12),
            ),
            width: 150,
            height: 40,
            child: TextField(
              controller: textController,
              decoration: const InputDecoration(
                hintText: "0",
                border: InputBorder.none,
              ),
              textAlign: TextAlign.center,
              readOnly: true,
              enableInteractiveSelection: false,
            ),
          ),
          const SizedBox(
            width: 30,
          ),
          ActionButton(
            color: primaryTextColor,
            action: '-',
            onPress: () {
              amount = amount - 1;
              if (amount < 0) {
                amount = 0;
              }
              textController.text = amount.toString();
            },
          ),
          const SizedBox(
            width: 30,
          ),
          ActionButton(
            color: primaryTextColor,
            action: '-5',
            onPress: () {
              amount = amount - 5;
              if (amount < 0) {
                amount = 0;
              }
              textController.text = amount.toString();
            },
          ),
        ],
      ),
    );
  }
}