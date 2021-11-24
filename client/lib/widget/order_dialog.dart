import 'package:flutter/material.dart';

class OrderDialog extends StatefulWidget {
  const OrderDialog(
      {Key? key,
      required this.img,
      required this.product,
      required this.price,
      required this.info})
      : super(key: key);
  final String product;
  final String info;
  final String price;
  final IconData img;

  @override
  _OrderDialogState createState() => _OrderDialogState();
}

class _OrderDialogState extends State<OrderDialog> {
  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
      child: SizedBox(
        height: 600.0,
        width: 900.0,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(widget.img),
            Text(widget.product),
            Text(widget.price),
            Text(widget.info),
            TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text(
                  '確定',
                )),
            TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text(
                  '取消',
                ))
          ],
        ),
      ),
    );
  }
}
