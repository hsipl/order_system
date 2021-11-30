import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
class SplashPage extends StatelessWidget {
  const SplashPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Colors.grey,
      body: SafeArea(
        child: SpinKitSpinningCircle(
          duration: Duration(milliseconds: 1000),
          color: Colors.white,
          size: 150.0,
        ),
      ),
    );
  }
}
