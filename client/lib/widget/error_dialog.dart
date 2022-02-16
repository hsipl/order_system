import 'package:flutter/material.dart';
import 'package:client/services/decorations.dart';
import 'styled_buttons.dart';

class ErrorDialog extends StatelessWidget {
  const ErrorDialog({
    required this.status,
    Key? key,
  }) : super(key: key);
  final String status;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(32.0))),
      contentPadding: const EdgeInsets.only(top: 10.0),
      title: Center(child: Text(status)),
      actions: [
        Center(
          child: ActionButton(
            action: '確定',
            color: kConfirmButtonColor,
            onPress: (){
              Navigator.pop(context);
            },
          ),
        )
      ],
    );
  }
}

void showErrorDialog(context,status){
  showDialog(
    context: context,
    builder: (context) {
      return ErrorDialog(status: status);
    },
  );
}
