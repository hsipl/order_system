import 'package:flutter/material.dart';

class EditButtonsForTextContainer extends StatelessWidget {
  const EditButtonsForTextContainer({
    required this.buttons,
    Key? key,
  }) : super(key: key);
  final List<Widget> buttons;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 250,
      width: 150,
      child: InputDecorator(
        expands: true,
        decoration:InputDecoration(
          labelText: '操作選項',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        ) ,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: buttons,
        ),
      ),
    );
  }
}