import 'package:client/widget/button_style/styled_buttons.dart';
import '../../services/decorations.dart';
import 'package:flutter/material.dart';
class Calculator extends StatefulWidget {
  const Calculator({
    Key? key,
  }) : super(key: key);

  @override
  State<Calculator> createState() => _CalculatorState();
}

class _CalculatorState extends State<Calculator> {
  List buttons = List.generate(
      10,
          (index) => ActionButton(
          color: primaryTextColor,
          action: index.toString(),
          onPress: () => print(index)));

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            buttons[7],
            buttons[8],
            buttons[9],
          ],
        ),
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            buttons[4],
            buttons[5],
            buttons[6],
          ],
        ),
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            buttons[1],
            buttons[2],
            buttons[3],
          ],
        ),
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            ActionButton(
                color: kCancelButtonColor,
                action: "AC",
                onPress: () => print(10)),
            buttons[0],
            ActionButton(
                color: kCancelButtonColor,
                action: "C",
                onPress: () => print(10)),
          ],
        ),
        const Divider(
          height: 1,
        ),
        const Padding(
          padding: EdgeInsets.fromLTRB(17,0,0,0),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(
              '實收',
              style: TextStyle(fontSize: 20),
            ),
          ),
        ),
        const Padding(
          padding: EdgeInsets.fromLTRB(17,0,0,0),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(
              '應收',
              style: TextStyle(fontSize: 20),
            ),
          ),
        ),
        const Divider(
          height: 1,
        ),
        const Padding(
          padding: EdgeInsets.fromLTRB(17,0,0,5),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(
              '找零',
              style: TextStyle(fontSize: 20),
            ),
          ),
        ),
      ],
    );
  }
}