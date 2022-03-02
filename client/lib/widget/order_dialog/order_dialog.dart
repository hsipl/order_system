import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_shopping_action.dart';
import 'package:client/services/serializer.dart';
import 'package:client/widget/order_dialog/action_row.dart';
import 'package:client/widget/order_dialog/edit_buttons_for_text_container.dart';
import 'package:client/widget/order_dialog/tag_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'label_text_container.dart';
import 'quantity_input.dart';
import 'filter_image.dart';
import 'product_info.dart';

class OrderDialog extends StatefulWidget {
  const OrderDialog({
    Key? key,
    required this.product,
  }) : super(key: key);
  final Product product;

  @override
  _OrderDialogState createState() => _OrderDialogState();
}

class _OrderDialogState extends State<OrderDialog> {
  @override
  Widget build(BuildContext context) {
    StoreProvider.of<AppState>(context).dispatch(TempShoppingListClear());
    return StoreConnector<AppState, AppState>(
        converter: (store) => store.state,
        builder: (context, store) {
          if (store.newTempShoppingList.isEmpty) {
            StoreProvider.of<AppState>(context)
                .dispatch(TempShoppingListAdd(widget.product));
          }

          return Dialog(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.0)),
            child: SingleChildScrollView(
              child: SizedBox(
                height: 600.0,
                width: 900.0,
                child: Column(
                  children: <Widget>[
                    Stack(
                        clipBehavior: Clip.antiAlias,
                        alignment: Alignment.center,
                        children: [
                          FilteredImage(
                            image: widget.product.img,
                          ),
                          ProductInfo(product: widget.product),
                        ]),

                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 25, 20, 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Expanded(
                            flex: 4,
                            child: LabelTextContainer(),
                          ),
                          SizedBox(width: 4,),
                          Expanded(
                            flex: 4,
                            child: TagsInput(
                              product: widget.product,
                            ),
                          ),
                          SizedBox(width: 4,),
                          Expanded(
                            flex: 2,
                            child: QuantityInput(
                              price: int.parse(widget.product.price),
                            ),
                          ),
                          SizedBox(width: 4,),
                          Expanded(
                            flex: 2,
                            child: EditButtonsForTextContainer(
                              product: widget.product,
                            ),
                          ),
                        ],
                      ),
                    ),
                    //TODO send values to ActionRow()
                    const ActionRow(),
                  ],
                ),
              ),
            ),
          );
        });
  }
}
