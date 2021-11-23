import 'package:flutter/material.dart';
import 'product_card.dart';

class CardsColumn extends StatefulWidget {
  const CardsColumn({Key? key, required this.type}) : super(key: key);
  final String type;

  @override
  _CardsColumnState createState() => _CardsColumnState();
}

class _CardsColumnState extends State<CardsColumn> {
  @override
  Widget build(BuildContext context) {
    List<Widget> cards = List.generate(
        20,
        (i) => ProductCard(
            img: Icons.ac_unit,
            info: 'info',
            product: widget.type + " $i",
            price: 'price'));
    return Column(children: [
      Expanded(
          flex: 1,
          child: Container(
              width: double.maxFinite,
              color: const Color(0xFFFAFAFA),
              child: Center(
                  child: Text(
                widget.type,
                style: const TextStyle(fontSize: 20),
              )))),
      Expanded(
        flex: 11,
        child: ListView(
          children: cards,
        ),
      ),
    ]);
  }
}
