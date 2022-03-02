import 'package:client/widget/app_bar_widget/home_pop_up_menu.dart';
import 'package:client/widget/app_bar_widget/navigation_drawer.dart';
import 'package:flutter/material.dart';

class DeactivateHomePage extends StatelessWidget {
  const DeactivateHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: homePopUpMenu(),
      ),
      drawer: const DeactivateDrawer(),
      body: const Center(
        child: Text(
          '請先登入\n點選右邊工具列進行登入',
          style: TextStyle(color: Colors.grey),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
