import 'package:client/model/app_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'order_dialog.dart';

class ProductCard extends StatefulWidget {
  const ProductCard({
    Key? key,
    required this.productId,
  }) : super(key: key);

  final int productId;


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
                      productId: super.widget.productId,
                    ),
                  ),
                );
              },
              transitionDuration: const Duration(milliseconds: 200),
              barrierDismissible: false,
              barrierLabel: '',
              context: context,
              pageBuilder: (context, animation1, animation2) {
                return Container();
              },
            ).then((dataFromDialog){
              // DEBUG
              print(dataFromDialog);
            });
          },
          child: Center(
            child: StoreConnector<AppState,AppState>(
              converter: (store) => store.state,
              builder: (context,store){
                return ListTile(
                  enabled: true,
                  leading: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      SizedBox(
                        height: 50,
                        width: 50,
                        child: Image(image: NetworkImage(store.newProductList[widget.productId].img)),
                      )
                    ],
                  ),
                  title: Text(store.newProductList[widget.productId].product),
                  trailing: Text(store.newProductList[widget.productId].price),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}

