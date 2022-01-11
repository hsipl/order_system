import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'order_dialog.dart';

class ProductCard extends StatefulWidget {
  const ProductCard({
    Key? key,
    required this.img,
    required this.info,
    required this.product,
    required this.price,
  }) : super(key: key);
  final String product;
  final List<String> info;
  final String price;
  final String img;

  @override
  _ProductCardState createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  List<double> position = [];

  List<double> getTapPosition(
      TapDownDetails details, double width, double height) {
    var dx = details.globalPosition.dx;
    var dy = details.globalPosition.dy;
    double xHalf = (width / 2);
    double yHalf = (height / 2);
    dx = (dx - xHalf) / xHalf;
    dy = (dy - yHalf) / yHalf;
    dx = double.parse(dx.toStringAsFixed(2));
    dy = double.parse(dy.toStringAsFixed(2));
    return [dx, dy];
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return SizedBox(
      height: 120,
      child: Card(
        semanticContainer: true,
        clipBehavior: Clip.antiAliasWithSaveLayer,
        elevation: 5,
        child: InkWell(
          onTapDown: (TapDownDetails details) {
            setState(() {
              position = getTapPosition(details, width, height);
            });
          },
          onTap: () {
            showGeneralDialog(
              barrierColor: Colors.black.withOpacity(0.5),
              transitionBuilder: (context, a1, a2, widget) {
                return Transform.scale(
                  scale: a1.value,
                  alignment: Alignment(position[0], position[1]),
                  child: Opacity(
                    opacity: a1.value,
                    child: OrderDialog(
                      img: super.widget.img,
                      info: super.widget.info,
                      product: super.widget.product,
                      price: super.widget.price,
                    ),
                  ),
                );
              },
              transitionDuration: const Duration(milliseconds: 200),
              barrierDismissible: true,
              barrierLabel: '',
              context: context,
              pageBuilder: (context, animation1, animation2) {
                return Container();
              },
            );
          },
          child: Center(
            child: ListTile(
              leading: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(
                    height: 50,
                    width: 50,
                    child: Image(image: NetworkImage(widget.img)),
                  )
                ],
              ),
              title: Text(widget.product),
              subtitle: Text(widget.info.toString()),
              trailing: Text(widget.price),
              isThreeLine: true,
            ),
          ),
        ),
      ),
    );
  }
}
