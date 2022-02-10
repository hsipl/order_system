import 'package:client/services/preference_operation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:client/services/decorations.dart';
import 'product_card.dart';

class CardsColumn extends StatefulWidget {
  const CardsColumn({Key? key, required this.type, required this.category})
      : super(key: key);
  final String type;
  final int category;

  @override
  _CardsColumnState createState() => _CardsColumnState();
}

class _CardsColumnState extends State<CardsColumn> {
  List<dynamic>? product;
  List<Widget> cards = [];

  @override
  void initState() {
    getProductSharedPrefs().then((value) {
      product = value!;

      setState(() {
        cards = List.generate(product!.length, (i) {
          if (product![i]['category'] == widget.category) {
            List<String> tags = [];
            for (final tag in product![i]['tags']) {
              tags.add(tag['tag']);
            }
            tags.insert(0,'原味');
            return ProductCard(
                img:
                    'https://d1ralsognjng37.cloudfront.net/3ea3bab1-7c51-4812-8534-03821aff031a',
                info: tags,
                product: product![i]['name'].toString(),
                price: product![i]['price'].toString() + '元');
          } else {
            return Container();
          }
        });
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final _controller = ScrollController();

    return Expanded(
      child: Ink(
        color: const Color(0xFFFAFAFA),
        child: Column(
          children: [
            Expanded(
              flex: 1,
              child: InkWell(
                onTap: () {
                  _controller.animateTo(
                    _controller.position.minScrollExtent,
                    duration: const Duration(seconds: 1),
                    curve: Curves.fastOutSlowIn,
                  );
                },
                onLongPress: () {
                  _controller.animateTo(
                    _controller.position.maxScrollExtent,
                    duration: const Duration(seconds: 1),
                    curve: Curves.fastOutSlowIn,
                  );
                },
                child: Ink(
                  decoration: kBoxDecorationStyle,
                  child: Center(
                    child: Text(
                      widget.type,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 3,
            ),
            Expanded(
              flex: 11,
              child: CupertinoScrollbar(
                isAlwaysShown: true,
                thickness: 5,
                thicknessWhileDragging: 6,
                controller: _controller,
                child: ListView(
                  padding: const EdgeInsets.fromLTRB(0, 0, 10, 0),
                  controller: _controller,
                  children: cards,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
