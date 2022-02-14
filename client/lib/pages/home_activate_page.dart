import 'package:client/services/api_connection.dart';
import 'package:client/services/preference_operation.dart';
import 'package:client/widget/checkout_column.dart';
import 'package:client/widget/home_actions.dart';
import 'package:flutter/material.dart';
import 'package:client/widget/navigation_drawer.dart';
import 'package:client/widget/cards_column.dart';


class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String title = '';

  @override
  void initState() {
    getStoreInfoSharedPrefs().then((value) {
      setState(() {
        title = value!['name'];
      });
    });
    Api().product(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        actions: homeActions(),
      ),
      drawer: const ActivateDrawer(),
      body: const ActivateHomePage(),
    );
  }
}

class ActivateHomePage extends StatelessWidget {
  const ActivateHomePage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: const [
        CardsColumn(
          type: '雞肉類',
          category: 0,
        ),
        CardsColumn(
          type: '加工類',
          category: 1,
        ),
        CardsColumn(
          type: '蔬菜類',
          category: 2,
        ),
        CardsColumn(
          type: '其他',
          category: 3,
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
