import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:flutter/services.dart';
import 'package:client/pages/login_page.dart';
import 'package:client/pages/home_page.dart';
import 'package:client/pages/block_goods_page.dart';
import 'package:client/pages/completed_order_page.dart';
import 'package:client/pages/delete_order_page.dart';
import 'package:client/pages/earning_page.dart';
import 'package:client/pages/go_to_admin_page.dart';
import 'services/decorations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
      overlays: [SystemUiOverlay.bottom, SystemUiOverlay.top]);
  runApp(const OrderSystem());
}

class OrderSystem extends StatelessWidget {
  const OrderSystem({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: appTheme,
      home: const Home(),
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/login':
            return PageTransition(
                child: const Login(),
                type: PageTransitionType.rightToLeftWithFade);
          case '/admin':
            return PageTransition(
                child: const GoToAdminPage(),
                type: PageTransitionType.rightToLeftWithFade);
          case '/earning':
            return PageTransition(
                child: const EarningPage(),
                type: PageTransitionType.rightToLeftWithFade);
          case '/block':
            return PageTransition(
                child: const BlockGoodsPage(),
                type: PageTransitionType.rightToLeftWithFade);
          case '/delete':
            return PageTransition(
                child: const DeletedOrderPage(),
                type: PageTransitionType.rightToLeftWithFade);
          case '/completed':
            return PageTransition(
                child: const CompletedOrderPage(),
                type: PageTransitionType.rightToLeftWithFade);
          case '/':
            return PageTransition(
                child: const Home(),
                type: PageTransitionType.rightToLeftWithFade);
          default:
            return null;
        }
      },
      initialRoute: '/',
    );
  }
}
