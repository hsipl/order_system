import 'package:flutter/material.dart';

class EditButtonsForTextContainer extends StatelessWidget {
  const EditButtonsForTextContainer({
    required this.buttons,
    Key? key,
  }) : super(key: key);
  final List<Widget> buttons;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: buttons,
    );
  }
}