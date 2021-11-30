import 'package:client/services/decorations.dart';
import 'package:client/widget/styling_buttons.dart';
import 'package:flutter/material.dart';

class CheckoutColumn extends StatefulWidget {
  const CheckoutColumn({Key? key}) : super(key: key);

  @override
  _CheckoutColumnState createState() => _CheckoutColumnState();
}

class _CheckoutColumnState extends State<CheckoutColumn> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 5, 0, 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              flex: 2,
              child: CheckoutColumnButton(
                color: kCancelButtonColor,
                text: '清空',
                onPress:(){},
              ),
            ),
            Expanded(flex: 16, child: Container()),
            const Divider(
              color: Colors.black,
            ),
            Expanded(
                flex: 3,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                  child: Container(
                    decoration: const BoxDecoration(
                        color: Color(0xFFF0F0F0),
                        borderRadius: BorderRadius.all(Radius.circular(20.0))),
                    child: const Center(
                        child: Text(
                      "編號:0\n總金額0元",
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 25),
                    )),
                  ),
                )),
            Expanded(
              flex: 2,
              child: CheckoutColumnButton(
                color: kConfirmButtonColor,
                text: '送出',
                onPress: (){},
              ),
            ),
          ],
        ),
      ),
    );
  }
}


