import 'package:client/model/app_state.dart';
import 'package:client/widget/button_style/styled_buttons.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../../redux/actions/calculator_action.dart';
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
  String calculatorValue = "0";
  List buttons = [];

  @override
  void initState() {
    buttons = List.generate(
      10,
      (index) => ActionButton(
          color: primaryTextColor,
          action: index.toString(),
          onPress: () {
            setState(() {
              calculatorValue += index.toString();
              StoreProvider.of<AppState>(context)
                  .dispatch(CalculatorValue(calculatorValue));
            });
          }),
    );
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, AppState>(
      converter: (store) => store.state,
      builder: (context, store) {
        int totalAmount = store.newTotalAmount;

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
                    onPress: () {
                      setState(() {
                        StoreProvider.of<AppState>(context)
                            .dispatch(CalculatorValue("0"));
                      });
                    }),
                buttons[0],
                ActionButton(
                    color: kCancelButtonColor,
                    action: "C",
                    onPress: () {
                      setState(() {
                        List<String> c = calculatorValue.split("");
                        c.removeLast();
                        if(c.isEmpty){
                          StoreProvider.of<AppState>(context)
                              .dispatch(CalculatorValue("0"));
                        }else{
                          calculatorValue = c.join();
                          StoreProvider.of<AppState>(context)
                              .dispatch(CalculatorValue(calculatorValue));
                        }

                      });
                    }),
              ],
            ),
            const Divider(
              height: 1,
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(17, 0, 17, 0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "實收",
                    style: TextStyle(fontSize: 20),
                  ),
                  Text(
                    "${int.parse(store.calculatorValue)}",
                    style: TextStyle(fontSize: 20),
                  )
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(17, 0, 17, 0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "應收",
                    style: TextStyle(fontSize: 20),
                  ),
                  Text(
                    "$totalAmount",
                    style: TextStyle(fontSize: 20),
                  )
                ],
              ),
            ),
            const Divider(
              height: 1,
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(17, 0, 17, 0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "找零",
                    style: TextStyle(fontSize: 20),
                  ),
                  Text(
                    "${int.parse(store.calculatorValue) - totalAmount}",
                    style: TextStyle(fontSize: 20),
                  )
                ],
              ),
            ),
          ],
        );
      },
    );
  }
}
