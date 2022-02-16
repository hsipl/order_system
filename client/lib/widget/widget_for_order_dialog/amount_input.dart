import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';
import '../styled_buttons.dart';

class AmountInput extends StatefulWidget {
  const AmountInput({
    required this.returnAmount,
    required this.amount,
    Key? key,
  }) : super(key: key);

  final Function returnAmount;
  final int amount;

  @override
  State<AmountInput> createState() => _AmountInputState();
}

class _AmountInputState extends State<AmountInput> {
  @override
  Widget build(BuildContext context) {
    int amount = widget.amount;
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
                amount = amount + 5;
                widget.returnAmount(amount);
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '+',
              onPress: () {
                amount = amount + 1;
                widget.returnAmount(amount);
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-',
              onPress: () {
                amount = amount - 1;
                if (amount < 1) {
                  amount = 1;
                }
                widget.returnAmount(amount);
              },
            ),
            ActionButton(
              color: primaryTextColor,
              action: '-5',
              onPress: () {
                amount = amount - 5;
                if (amount < 1) {
                  amount = 1;
                }
                widget.returnAmount(amount);
              },
            ),
          ],
        ),
      ),
    );
  }
}
