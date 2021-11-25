import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:flutter/material.dart';
class Splash extends StatelessWidget {
  const Splash({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    return const Scaffold(
      backgroundColor:  Color(0xffe1f5fe),
      body: Center(
          child:SpinKitRotatingCircle(
            color: Colors.white,
            size: 50.0,
          )
      ),
    );
  }
}

class Init {
  Init._();
  static final instance = Init._();
  Future initialize() async {
    await Future.delayed(const Duration(seconds: 3));
  }
}
