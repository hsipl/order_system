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
              AmountRow(),
              Row(
                children: const [
                  LabelTextContainer(),
                ],
              ),
              const ButtomRow(),
            ],
          ),
        ),
      ),
    );
  }
}

class ButtomRow extends StatelessWidget {
  const ButtomRow({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
      child: Row(
        children: [
          ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text(
                '確定',
              )),
          const Spacer(),
          ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text(
                '取消',
              )),
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
      padding: const EdgeInsets.all(20.0),
      child: Row(
        children: [
          ElevatedButton(
            onPressed: () {},
            child: const Text(
              '+',
            ),
          ),
          Container(
              height: 40,
              width: 200,
              child: TextField(
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              )),
          ElevatedButton(
            onPressed: () {},
            child: const Text(
              '-',
            ),
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
          padding: EdgeInsets.fromLTRB(30, 30, 0, 0),
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
          child: Text('沙小拉'),
        ),
      ),
    );
  }
}
