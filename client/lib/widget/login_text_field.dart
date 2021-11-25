import 'package:flutter/material.dart';
import 'package:client/services/decorations.dart';

class LoginTextField extends StatefulWidget {
  final IconData icon;
  final String hint;
  final String title;
  final bool isPasswordField;
  final textController = TextEditingController();

  LoginTextField(
      {Key? key,
      required this.icon,
      required this.hint,
      required this.isPasswordField,
      required this.title})
      : super(key: key);

  String getText() {
    return textController.text;
  }

  @override
  State<LoginTextField> createState() => _LoginTextFieldState();
}

class _LoginTextFieldState extends State<LoginTextField> {
  bool _textVisible = true;

  @override
  void dispose() {
    widget.textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      style: const TextStyle(fontSize: 20),
        controller: widget.textController,
        obscureText: widget.isPasswordField ? _textVisible : !_textVisible,
        keyboardType: TextInputType.text,
        decoration: InputDecoration(
          labelText: widget.hint,
          hintText: widget.hint,
          enabledBorder: kOutlineInputBorder,
          focusedBorder: kOutlineInputBorder,
          prefixIcon: Icon(
            widget.icon,
            color: Colors.black38,
          ),
          suffixIcon: widget.isPasswordField
              ? IconButton(
                  splashRadius: 1,
                  icon: Icon(
                    _textVisible ? Icons.visibility : Icons.visibility_off,
                    color: Theme.of(context).primaryColorDark,
                  ),
                  onPressed: () {
                    setState(() {
                      _textVisible = !_textVisible;
                    });
                  },
                )
              : null,
        ));
  }
}
