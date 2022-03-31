import 'package:flutter/material.dart';

class ActionButton extends StatelessWidget {
  const ActionButton({
    required this.color,
    required this.action,
    required this.onPress,
    Key? key,
  }) : super(key: key);

  final String action;
  final Color color;
  final Function onPress;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        primary: Colors.white,
        shadowColor: Colors.transparent,
        elevation: 0,
        side: BorderSide(width: 1.0, color: color),
      ),
      onPressed: () => onPress(),
      child: Text(
        action,
        style: TextStyle(
          color: color,
        ),
      ),
    );
  }
}

class ShoppingColumnButton extends StatelessWidget {
  const ShoppingColumnButton({
    required this.text,
    required this.color,
    required this.onPress,
    Key? key,
  }) : super(key: key);

  final String text;
  final Color color;
  final Function onPress;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(primary: color),
      onPressed: () => onPress(),
      child: Text(
        text,
        style: const TextStyle(color: Colors.white),
      ),
    );
  }
}
