import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_checkout_action.dart';
import 'package:client/services/serializer.dart';
import 'package:client/widget/widget_for_order_dialog/action_row.dart';
import 'package:client/widget/widget_for_order_dialog/edit_buttons_for_text_container.dart';
import 'package:client/widget/widget_for_order_dialog/tag_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'widget_for_order_dialog/label_text_container.dart';
import 'widget_for_order_dialog/amount_input.dart';
import 'widget_for_order_dialog/filter_image.dart';
import 'widget_for_order_dialog/product_info.dart';

class OrderDialog extends StatefulWidget {
  const OrderDialog({
    Key? key,
    required this.productId,
  }) : super(key: key);
  final int productId;

  @override
  _OrderDialogState createState() => _OrderDialogState();
}

class _OrderDialogState extends State<OrderDialog> {



  @override
  Widget build(BuildContext context) {

    return StoreConnector<AppState, AppState>(
        converter: (store) => store.state,
        builder: (context, store) {
          Product product = Product.find(store, widget.productId);
          if(store.newTempCheckoutList.isEmpty){
            StoreProvider.of<AppState>(context).dispatch(TempCheckoutAdd(widget.productId));
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
                            image: product.img,
                          ),
                          ProductInfo(productId: widget.productId),
                        ]),

                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 25, 20, 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const LabelTextContainer(),
                          TagsInput(
                            productId: widget.productId,
                          ),
                          const AmountInput(),
                          EditButtonsForTextContainer(productId: widget.productId,),
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
