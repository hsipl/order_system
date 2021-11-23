import 'package:client/widget/checkout_column.dart';
import 'package:flutter/material.dart';
import 'package:client/widget/navigation_drawer.dart';
import 'package:client/widget/cards_column.dart';
import 'package:client/widget/cards_column.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: [
          PopupMenuButton(
              icon: const Icon(Icons.notifications),
              itemBuilder: (context) => [
                    const PopupMenuItem(
                      child: ListTile(
                        leading: Icon(Icons.error),
                        title: Text('error 123456789'),
                      ),
                      value: 1,
                    ),
                    const PopupMenuItem(
                      child: ListTile(
                        leading: Icon(Icons.error),
                        title: Text('error 78978978'),
                      ),
                      value: 2,
                    )
                  ]),
          PopupMenuButton(
              itemBuilder: (context) => [
                    const PopupMenuItem(
                      child: ListTile(
                        leading: Icon(Icons.font_download),
                        title: Text('字體大小設定'),
                      ),
                      value: 1,
                    ),
                    const PopupMenuItem(
                      child: ListTile(
                        leading: Icon(Icons.app_settings_alt),
                        title: Text('布景主體設定'),
                      ),
                      value: 2,
                    )
                  ])
        ],
      ),
      drawer: const NavigationDrawer(),
      body: Row(
        children: const [
          CardsColumn(type: '雞肉類',),
          CardsColumn(type: '加工類',),
          CardsColumn(type: '蔬菜類',),
          CardsColumn(type: '其他',),
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
      ),
    );
  }
}


