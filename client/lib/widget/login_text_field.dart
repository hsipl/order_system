import 'package:flutter/material.dart';
import 'package:client/services/decorations.dart';

class LoginTextField extends StatefulWidget {
  final IconData icon;
  final String hint;
  final String title;
  final bool mask;
  final textController = TextEditingController();
  LoginTextField(
      {Key? key, required this.icon,
      required this.hint,
      required this.mask,
      required this.title}) : super(key: key);

  String getText(){
    return textController.text;
  }

  @override
  State<LoginTextField> createState() => _LoginTextFieldState();
}

class _LoginTextFieldState extends State<LoginTextField> {

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    widget.textController.dispose();
    super.dispose();
  }



  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 10),
        Text(widget.title,style:const TextStyle(fontSize: 18),),
        const SizedBox(height: 10),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60,
          child: TextField(
              controller: widget.textController,
              obscureText: widget.mask,
              keyboardType: TextInputType.text,
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14),
                prefixIcon: Icon(
                  widget.icon,
                  color: Colors.black38,
                ),
                hintText: widget.hint,
              )),
        ),
      ],
    );
  }
}
