import 'package:client/model/app_state.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
import 'package:client/widget/styled_buttons.dart';
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
  List<Widget> editButtons = [];

  List<String> customLabels = [''];
  List<String> customLabelsNum = ['1'];
  int amount = 1;

  void deleteItem(int index) {
    (customLabels.length == 1)
        ? customLabels = ['']
        : customLabels.removeAt(index);
    (customLabelsNum.length == 1)
        ? customLabelsNum = ['1']
        : customLabelsNum.removeAt(index);
  }

  Map getCustomData() {
    return {
      'labels': customLabels,
      'num': customLabelsNum,
      'length': customLabelsNum.length
    };
  }

  void getAmount(int amount) {
    setState(() {
      this.amount = amount;
      customLabelsNum[customLabelsNum.length - 1] = this.amount.toString();
    });
  }

  void setTag(tags, i) {
    setState(() {
      List<String> checkList = customLabels[customLabels.length - 1].split(',');
      if (!checkList.contains(tags[i])) {
        customLabels[customLabels.length - 1] =
            customLabels[customLabels.length - 1] + tags[i] + ',';
      }
    });
  }

  @override
  void initState() {
    //TODO Refactor those ugly code
    editButtons = [
      ActionButton(
          color: kConfirmButtonColor,
          action: '輸入下列',
          onPress: () {
            setState(
              () {
                if (customLabels.last != '' && customLabelsNum.last != '') {
                  customLabels.add('');
                  customLabelsNum.add('1');
                  amount = 1;
                } else {
                  customLabels.last = '';
                  customLabelsNum.last = '1';
                  amount = 1;
                  const snackBar = SnackBar(
                    content: Text('不符合規範，因此刪除'),
                  );
                  ScaffoldMessenger.of(context).showSnackBar(snackBar);
                }
              },
            );
          }),
      ActionButton(
          color: kCancelButtonColor,
          action: '清空所有',
          onPress: () {
            setState(() {
              customLabels = [''];
              customLabelsNum = ['1'];
            });
          }),
    ];

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, AppState>(
        converter: (store) => store.state,
        builder: (context, store) {
          Product product = Product.find(store, widget.productId);
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
                          LabelTextContainer(
                            deleteItem: deleteItem,
                            getCustomData: getCustomData,
                          ),
                          TagsInput(
                            productId: widget.productId,
                            setTagFunction: setTag,
                          ),
                          AmountInput(
                            amount: amount,
                            returnAmount: getAmount,
                          ),
                          EditButtonsForTextContainer(buttons: editButtons),
                        ],
                      ),
                    ),
                    //TODO send values to ActionRow()
                    ActionRow(
                      amount: customLabelsNum,
                      price: product.price,
                      labels: customLabels,
                      product: product.name,
                    ),
                  ],
                ),
              ),
            ),
          );
        });
  }
}
