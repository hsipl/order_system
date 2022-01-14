import 'package:flutter/material.dart';

class NumInput extends StatelessWidget {
  const NumInput({
    Key? key,
    required this.numButtons,
  }) : super(key: key);

  final List<Widget> numButtons;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200,
      width: 220,
      child: Wrap(
        alignment: WrapAlignment.center,
        spacing: 5,
        children: numButtons.reversed.toList(),
      ),
    );
  }
}
