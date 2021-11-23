import 'package:flutter/material.dart';

class ProductCard extends StatefulWidget {
  const ProductCard({Key? key,required this.img ,required this.info , required this.product,required this.price}) : super(key: key);
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
      child: ListTile(
        leading: Icon(widget.img),
        title: Text(widget.product),
        subtitle: Text(widget.info),
        trailing: Text(widget.price),
        isThreeLine: true,
      ),
    );
  }
}
