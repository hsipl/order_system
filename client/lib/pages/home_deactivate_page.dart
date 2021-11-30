import 'package:client/widget/home_actions.dart';
import 'package:client/widget/navigation_drawer.dart';
import 'package:flutter/material.dart';

class HomeDeactivate extends StatelessWidget {
  const HomeDeactivate({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: homeActions(),
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
