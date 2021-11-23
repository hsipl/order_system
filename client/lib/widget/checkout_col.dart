import 'package:flutter/material.dart';

class CheckoutCol extends StatefulWidget {
  const CheckoutCol({Key? key}) : super(key: key);

  @override
  _CheckoutColState createState() => _CheckoutColState();
}

class _CheckoutColState extends State<CheckoutCol> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(0, 5, 0, 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
              flex: 2,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(primary: Color(0xFFE74C3C)),
                onPressed: () {},
                child: const Text(
                  "清空",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
              )),
          Expanded(flex: 16, child: Container()),
          const Divider(

            color: Colors.black,
          ),
          Expanded(
              flex: 3,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0,0,0,10),
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
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(primary: Color(0xFF003CFF)),
                onPressed: () {},
                child: const Text(
                  "送出",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
              )),
        ],
      ),
    );
  }
}
