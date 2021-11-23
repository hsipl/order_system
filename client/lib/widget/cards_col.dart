import 'package:flutter/material.dart';
import 'product_card.dart';

class CardsColumn extends StatefulWidget {
  const CardsColumn({Key? key}) : super(key: key);

  @override
  _CardsColumnState createState() => _CardsColumnState();
}

class _CardsColumnState extends State<CardsColumn> {
  List<Widget> cards = List.generate(
      20,
      (i) => const ProductCard(
          img: Icons.ac_unit,
          info: 'info',
          product: 'product',
          price: 'price'));

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Expanded(flex:1,child: Container(width: double.maxFinite ,color:const Color(0xFFE0E0E0),child: Center(child: Text("product type")))),
      Expanded(
        flex: 15,
        child: ListView(
          children: cards,
        ),
      ),
    ]);
  }
}
