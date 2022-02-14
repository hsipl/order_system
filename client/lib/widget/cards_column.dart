import 'package:client/model/app_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:client/services/decorations.dart';
import 'package:flutter_redux/flutter_redux.dart';
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
                child: StoreConnector<AppState, AppState>(
                  converter: (store) => store.state,
                  builder: (context, store){
                    return ListView(
                      padding: const EdgeInsets.fromLTRB(0, 0, 10, 0),
                      controller: _controller,
                      children: cardGenerate(store,widget.category),
                    );
                  },

                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}


List<Widget> cardGenerate(store,category){
  List product = store.newProductList;
  List<Widget> cards = List.generate(product.length, (i) {
    if (product[i].category == category) {
      return ProductCard(
          img:
          'https://d1ralsognjng37.cloudfront.net/3ea3bab1-7c51-4812-8534-03821aff031a',
          info: product[i].tags,
          product: product[i].name.toString(),
          price: product[i].price.toString() + '元');
    } else {
      return Container();
    }
  });
  return cards;
}