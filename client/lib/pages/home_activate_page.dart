import 'package:client/widget/checkout_column.dart';
import 'package:client/widget/home_actions.dart';
import 'package:flutter/material.dart';
import 'package:client/widget/navigation_drawer.dart';
import 'package:client/widget/cards_column.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: homeActions(),
      ),
      drawer: const ActivateDrawer(),
      body: const ActivateHome(),
    );
  }
}

class ActivateHome extends StatelessWidget {
  const ActivateHome({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: const [
        CardsColumn(
          type: '雞肉類',
        ),
        CardsColumn(
          type: '加工類',
        ),
        CardsColumn(
          type: '蔬菜類',
        ),
        CardsColumn(
          type: '其他',
        ),
        Padding(
          padding: EdgeInsets.fromLTRB(0, 2, 0, 2),
          child: VerticalDivider(
            width: 10,
            color: Color(0xFFE0E0E0),
            thickness: 2,
          ),
        ),
        CheckoutColumn(),
      ],
    );
  }
}
