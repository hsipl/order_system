import 'package:flutter/material.dart';
import 'order_dialog.dart';

class ProductCard extends StatefulWidget {
  const ProductCard(
      {Key? key,
      required this.img,
      required this.info,
      required this.product,
      required this.price})
      : super(key: key);
  final String product;
  final String info;
  final String price;
  final IconData img;

  @override
  _ProductCardState createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  @override
  Widget build(BuildContext context) {
    return Card(
        elevation: 5,
        child: InkWell(
          onTap: () {
            showDialog(
                context: context,
                builder: (BuildContext context) => OrderDialog(
                      info: widget.info,
                      img: widget.img,
                      price: widget.price,
                      product: widget.product,
                    ));
          },
          child: ListTile(
            leading: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Icon(
                  widget.img,
                  color: Colors.blueGrey,
                ),
              ],
            ),
            title: Text(widget.product),
            subtitle: Text(widget.info),
            trailing: Text(widget.price),
            isThreeLine: true,
          ),
        ));
  }
}
