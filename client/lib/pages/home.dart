import 'package:flutter/material.dart';
import 'package:client/widget/navigation_drawer.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:const Text('Home'),
        actions: [
          PopupMenuButton(
              icon: const Icon(Icons.notifications),
              itemBuilder: (context) => [
                const PopupMenuItem(
                  child: ListTile(leading: Icon(Icons.error),title: Text('error 123456789'),),
                  value: 1,
                ),
                const PopupMenuItem(
                  child: ListTile(leading: Icon(Icons.error),title: Text('error 78978978'),),
                  value: 2,
                )
              ]
          ),
          PopupMenuButton(
              itemBuilder: (context) => [
               const PopupMenuItem(
                  child: ListTile(leading: Icon(Icons.font_download),title: Text('字體大小設定'),),
                  value: 1,
                ),
                const PopupMenuItem(
                  child: ListTile(leading: Icon(Icons.app_settings_alt),title: Text('布景主體設定'),),
                  value: 2,
                )
              ]
          )
        ],
      ),
      drawer:const NavigationDrawer() ,
    );
  }
}
