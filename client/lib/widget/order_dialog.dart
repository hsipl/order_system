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
  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
      child: SizedBox(
        height: 600.0,
        width: 900.0,
        child: Column(
          children: <Widget>[
            Stack(
              children:[ColorFiltered(
                colorFilter: const ColorFilter.mode(
                  Colors.grey,
                  BlendMode.modulate,
                ),
                child: Container(
                  height: 200,
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(12),
                        topRight: Radius.circular(12)),
                    image: DecorationImage(
                      image: AssetImage("assets/img/test_img.jpg"),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Padding(
                    padding: EdgeInsets.fromLTRB(30, 30, 0, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.product,style: const TextStyle(color: Colors.white,fontSize: 30),),
                        const SizedBox(height: 10,),
                        Text(widget.price,style:const TextStyle(color: Colors.white,fontSize: 30),),
                        const SizedBox(height: 10,),
                        Text(widget.info,style:const TextStyle(color: Colors.white,fontSize: 30),),
                      ],
                    ),
                  ),
                ],
              ),
            ]),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Row(
                children:[
                  ElevatedButton(onPressed: () {},
                    child: const Text(
                      '+',
                    ),),
                  Container(height:40,width: 200,child: TextField()),
                  ElevatedButton(onPressed: () {},
                    child: const Text(
                      '-',
                    ),),
                ],
              ),
            ),
            Spacer(),
            Padding(
              padding: const EdgeInsets.fromLTRB(30, 0, 30, 20),
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
            )
          ],
        ),
      ),
    );
  }
}
