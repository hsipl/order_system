import 'package:client/services/decorations.dart';
import 'package:client/widget/styling_buttons.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

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
  List<Widget> numButtons = [];

  List<Widget> tagButtons = [];

  @override
  void initState() {
    numButtons = List.generate(
      10,
      (i) => Padding(
        padding: const EdgeInsets.fromLTRB(0, 0, 10, 0),
        child: ActionButton(
          action: " $i",
          color: primaryTextColor,
          onPress: () {
            setState(() {
              labels = labels + "*$i \n";
            });
          },
        ),
      ),
    );
    tagButtons = List.generate(
      10,
      (i) => Padding(
        padding: const EdgeInsets.fromLTRB(0, 0, 10, 0),
        child: ActionButton(
          action: " tag $i",
          color: primaryTextColor,
          onPress: () {
            setState(() {
              labels = labels + "tag:$i";
            });
          },
        ),
      ),
    );
    super.initState();
  }

  String labels = '';

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
              const Divider(),
              Row(
                children: [
                  LabelTextContainer(labels: labels),
                  NumInput(numButtons: numButtons),
                  const SizedBox(
                    width: 25,
                  ),
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
          SizedBox(
            width: 150,
            height: 50,
            child: ActionButton(
              action: '確定',
              color: kConfirmButtonColor,
              onPress: () => Navigator.pop(context),
            ),
          ),
          const Spacer(),
          SizedBox(
            width: 150,
            height: 50,
            child: ActionButton(
              action: '取消',
              color: kCancelButtonColor,
              onPress: () => Navigator.pop(context),
            ),
          ),
        ],
      ),
    );
  }
}

class AmountRow extends StatefulWidget {
  const AmountRow({
    Key? key,
  }) : super(key: key);

  @override
  State<AmountRow> createState() => _AmountRowState();
}

class _AmountRowState extends State<AmountRow> {
  int amount = 0;

  var textController = TextEditingController(text: '0');

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0, 5, 0, 0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ActionButton(
            color: primaryTextColor,
            action: '+5',
            onPress: () {
              amount = amount + 5;
              textController.text = amount.toString();
            },
          ),
          const SizedBox(
            width: 30,
          ),
          ActionButton(
            color: primaryTextColor,
            action: '+',
            onPress: () {
              amount = amount + 1;
              textController.text = amount.toString();
            },
          ),
          const SizedBox(
            width: 30,
          ),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: primaryTextColor),
              borderRadius: BorderRadius.circular(12),
            ),
            width: 150,
            height: 40,
            child: TextField(
              controller: textController,
              decoration: const InputDecoration(
                hintText: "0",
                border: InputBorder.none,
              ),
              textAlign: TextAlign.center,
              readOnly: true,
              enableInteractiveSelection: false,
            ),
          ),
          const SizedBox(
            width: 30,
          ),
          ActionButton(
            color: primaryTextColor,
            action: '-',
            onPress: () {
              amount = amount - 1;
              if (amount < 0) {
                amount = 0;
              }
              textController.text = amount.toString();
            },
          ),
          const SizedBox(
            width: 30,
          ),
          ActionButton(
            color: primaryTextColor,
            action: '-5',
            onPress: () {
              amount = amount - 5;
              if (amount < 0) {
                amount = 0;
              }
              textController.text = amount.toString();
            },
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
            topLeft: Radius.circular(12),
            topRight: Radius.circular(12),
          ),
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

class LabelTextContainer extends StatefulWidget {
  const LabelTextContainer({
    required this.labels,
    Key? key,
  }) : super(key: key);

  final String labels;

  @override
  State<LabelTextContainer> createState() => _LabelTextContainerState();
}

class _LabelTextContainerState extends State<LabelTextContainer> {
  final _scrollController = ScrollController();

  void _scrollDown() {
    _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance!.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollDown();
      }
    });
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
          //TODO tags adder
          child: MediaQuery.removePadding(
            context: context,
            removeTop: true,
            child: CupertinoScrollbar(
              child: SingleChildScrollView(
                controller: _scrollController,
                child: Text(widget.labels),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
