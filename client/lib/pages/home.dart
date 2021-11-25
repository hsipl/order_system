import 'package:client/widget/checkout_column.dart';
import 'package:flutter/material.dart';
import 'package:client/widget/navigation_drawer.dart';
import 'package:client/widget/cards_column.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool? login;

  Future<void> getSharedPrefs() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      login = prefs.getBool("login") as bool;
    });
  }

  @override
  void initState() {
    super.initState();
    getSharedPrefs();
  }

  @override
  Widget build(BuildContext context) {
    getSharedPrefs();
    return Scaffold(
      resizeToAvoidBottomInset: false,
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
      body: bodySelect(login),
    );
  }
}

dynamic bodySelect(login) {
  switch (login) {
    case (true):
      return const LoginHome();
      break;
    case (null):
      return Container();
      break;
    case (false):
      return const PleaseLoginHome();
  }
}

class PleaseLoginHome extends StatelessWidget {
  const PleaseLoginHome({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('請先登入'));
  }
}

class LoginHome extends StatelessWidget {
  const LoginHome({
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
