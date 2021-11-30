import 'package:client/services/decorations.dart';
import 'package:client/widget/styling_buttons.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class OrderDialog extends StatefulWidget {
  const OrderDialog(
      {Key? key,
      required this.img,
      required this.product,
      required this.price,
      required this.info})
      : super(key: key);
  final String product;
  final String info;
  final String price;
  final IconData img;

  @override
  _OrderDialogState createState() => _OrderDialogState();
}

class _OrderDialogState extends State<OrderDialog> {
  List<Widget> numButtons = List.generate(
      10,
      (i) => Padding(
        padding: const EdgeInsets.fromLTRB(0,0,10,0),
        child: ActionButton(
              action: " $i",
              color: primaryTextColor,
              onPress: () {print("num:$i");},
            ),
      ));
  List<Widget> tagButtons = List.generate(
      10,
          (i) => Padding(
        padding: const EdgeInsets.fromLTRB(0,0,10,0),
        child: ActionButton(
          action: " tag $i",
          color: primaryTextColor,
          onPress: () {print("tag:$i");},
        ),
      ));

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
              Stack(children: [
                const FilteredImage(
                    image: AssetImage("assets/img/test_img.jpg")),
                ProductInfo(widget: widget),
              ]),
              const AmountRow(),
              Row(
                children: [
                  const LabelTextContainer(),
                  NumInput(numButtons: numButtons),
                  SizedBox(width: 25,),
                  NumInput(numButtons: tagButtons),

                ],
              ),
              const ActionRow(),
            ],
          ),
        ),
      ),
    );
  }
}

class NumInput extends StatelessWidget {
  const NumInput({
    Key? key,
    required this.numButtons,
  }) : super(key: key);

  final List<Widget> numButtons;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: numButtons.sublist(7),
        ),
        Row(
          children: numButtons.sublist(4, 7),
        ),
        Row(
          children: numButtons.sublist(1, 4),
        ),
        Row(
          children: [numButtons[0]],
        ),
      ],
    );
  }
}

class ActionRow extends StatelessWidget {
  const ActionRow({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
      child: Row(
        children: [
          ActionButton(
            action: '確定',
            color: kConfirmButtonColor,
            onPress: () => Navigator.pop(context),
          ),
          Spacer(),
          ActionButton(
            action: '取消',
            color: kCancelButtonColor,
            onPress: () => Navigator.pop(context),
          ),
        ],
      ),
    );
  }
}

class AmountRow extends StatelessWidget {
  const AmountRow({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 20, 0, 0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ActionButton(
            color: primaryTextColor,
            action: '+',
            onPress: () {},
          ),
          const SizedBox(
            width: 20,
          ),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: primaryTextColor),
              borderRadius: BorderRadius.circular(12),
            ),
            width: 180,
            height: 50,
            child: TextField(
              decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: "0",
              ),
              textAlign: TextAlign.center,
              keyboardType: TextInputType.number,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            ),
          ),
          const SizedBox(
            width: 20,
          ),
          ActionButton(
            color: primaryTextColor,
            action: '-',
            onPress: () {},
          ),
        ],
      ),
    );
  }
}

class FilteredImage extends StatelessWidget {
  const FilteredImage({
    Key? key,
    required this.image,
  }) : super(key: key);

  final AssetImage image;

  @override
  Widget build(BuildContext context) {
    return ColorFiltered(
      colorFilter: const ColorFilter.mode(
        Colors.grey,
        BlendMode.modulate,
      ),
      child: Container(
        height: 200,
        width: double.infinity,
        decoration: BoxDecoration(
          borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(12), topRight: Radius.circular(12)),
          image: DecorationImage(
            image: image,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}

class ProductInfo extends StatelessWidget {
  const ProductInfo({
    Key? key,
    required this.widget,
  }) : super(key: key);

  final OrderDialog widget;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(30, 30, 0, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.product,
                style: const TextStyle(color: Colors.white, fontSize: 30),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                widget.price,
                style: const TextStyle(color: Colors.white, fontSize: 30),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                widget.info,
                style: const TextStyle(color: Colors.white, fontSize: 30),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class LabelTextContainer extends StatelessWidget {
  const LabelTextContainer({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: SizedBox(
        height: 200,
        width: 350,
        child: InputDecorator(
          expands: true,
          decoration: InputDecoration(
            labelText: '客製化選項',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),
          child: const Text('沙小拉'),
        ),
      ),
    );
  }
}
