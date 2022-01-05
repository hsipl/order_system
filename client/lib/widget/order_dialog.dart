import 'package:client/services/decorations.dart';
import 'package:client/widget/styled_buttons.dart';
import 'package:client/widget/widget_for_order_dialog/action_row.dart';
import 'package:client/widget/widget_for_order_dialog/num_input.dart';
import 'package:client/widget/widget_for_order_dialog/tag_input.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'widget_for_order_dialog/label_text_container.dart';
import 'widget_for_order_dialog/amount_row.dart';
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
  List<Widget> numButtons = [];
  List<Widget> tagButtons = [];
  List<Widget> editButtons = [];

  @override
  void initState() {
    editButtons = [
      ActionButton(
          color: kConfirmButtonColor,
          action: '輸入下列',
          onPress: () {
            setState(() {
              if(labels.last.contains(RegExp(r'([*][0-9])'))){
                labels.add('');
              }else{
                labels.last = '';
                const snackBar = SnackBar(
                  content: Text('不符合規範，因此刪除'),
                );
                ScaffoldMessenger.of(context).showSnackBar(snackBar);
              }
            });
          }),
      ActionButton(
          color: kCancelButtonColor,
          action: '清除單行',
          onPress: () {
            setState(() {
              (labels.length == 1)?labels = ['']:labels.removeAt(labels.length - 1);
            });
          }),
      const SizedBox(height: 48),
      ActionButton(
          color: kCancelButtonColor,
          action: '清空所有',
          onPress: () {
            setState(() {
              labels = [''];
            });
          }),
    ];
    numButtons = List.generate(
      10,
      (i) => ActionButton(
        action: " $i",
        color: primaryTextColor,
        onPress: () {
          setState(() {
            labels[labels.length - 1] = labels[labels.length - 1] + "$i";
          });
        },
      ),
    );
    tagButtons = List.generate(
      widget.info.length,
      (i) => ActionButton(
        action: widget.info[i],
        color: primaryTextColor,
        onPress: () {
          setState(() {
            labels[labels.length - 1] = widget.info[i] + '*';
          });
        },
      ),
    );
    super.initState();
  }

  List<String> labels = [''];

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
                  clipBehavior: Clip.none,
                  alignment: Alignment.center,
                  children: [
                    FilteredImage(
                      image: widget.img,
                    ),
                    ProductInfo(widget: widget),
                  ]),
              const AmountRow(),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    LabelTextContainer(labels: labels),
                    TagsInput(tagButtons: tagButtons),
                    NumInput(numButtons: numButtons),
                    EditColumnForBox(buttons: editButtons),
                  ],
                ),
              ),
              const ActionRow(),
            ],
          ),
        ),
      ),
    );
  }
}

class EditColumnForBox extends StatelessWidget {
  const EditColumnForBox({
    required this.buttons,
    Key? key,
  }) : super(key: key);
  final List<Widget> buttons;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: buttons,
    );
  }
}
