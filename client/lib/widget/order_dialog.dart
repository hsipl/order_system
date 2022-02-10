import 'package:client/services/decorations.dart';
import 'package:client/widget/styled_buttons.dart';
import 'package:client/widget/widget_for_order_dialog/action_row.dart';
import 'package:client/widget/widget_for_order_dialog/edit_buttons_for_text_container.dart';
import 'package:client/widget/widget_for_order_dialog/tag_input.dart';
import 'package:flutter/material.dart';
import 'widget_for_order_dialog/label_text_container.dart';
import 'widget_for_order_dialog/amount_input.dart';
import 'widget_for_order_dialog/filter_image.dart';
import 'widget_for_order_dialog/product_info.dart';

class OrderDialog extends StatefulWidget {
  const OrderDialog(
      {Key? key,
      required this.img,
      required this.product,
      required this.price,
      required this.info})
      : super(key: key);
  final String product;
  final List<String> info;
  final String price;
  final String img;

  @override
  _OrderDialogState createState() => _OrderDialogState();
}

class _OrderDialogState extends State<OrderDialog> {
  List<Widget> tagButtons = [];
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

    tagButtons = List.generate(
      widget.info.length,
      (i) => ActionButton(
        action: widget.info[i],
        color: primaryTextColor,
        onPress: () {
          setState(() {
            List<String> checkList =
                customLabels[customLabels.length - 1].split(',');
            if (!checkList.contains(widget.info[i])) {
              customLabels[customLabels.length - 1] =
                  customLabels[customLabels.length - 1] + widget.info[i] + ',';
            }
          });
        },
      ),
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
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
                      image: widget.img,
                    ),
                    ProductInfo(widget: widget),
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
                    TagsInput(tagButtons: tagButtons),
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
                price: widget.price,
                labels: customLabels,
                product: widget.product,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
