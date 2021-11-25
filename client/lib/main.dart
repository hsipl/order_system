import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:flutter/services.dart';
import 'package:client/pages/login_page.dart';
import 'package:client/pages/home.dart';
import 'package:client/pages/block_goods_page.dart';
import 'package:client/pages/completed_order_page.dart';
import 'package:client/pages/delete_order_page.dart';
import 'package:client/pages/earning_page.dart';
import 'package:client/pages/go_to_admin_page.dart';
import 'pages/splash_screen.dart';
import 'services/decorations.dart';


void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
      overlays: [SystemUiOverlay.bottom, SystemUiOverlay.top]);
  runApp(const InitApp());
}

class InitApp extends StatelessWidget {
  const InitApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Init.instance.initialize(),
      builder: (context, AsyncSnapshot snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const MaterialApp(home: Splash());
        } else {
          return const OrderSystem();
        }
      },
    );
  }
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
            break;
          case '/admin':
            return PageTransition(
                child: const GoToAdminPage(),
                type: PageTransitionType.rightToLeftWithFade);
            break;
          case '/earning':
            return PageTransition(
                child: const EarningPage(),
                type: PageTransitionType.rightToLeftWithFade);
            break;
          case '/block':
            return PageTransition(
                child: const BlockGoodsPage(),
                type: PageTransitionType.rightToLeftWithFade);
            break;
          case '/delete':
            return PageTransition(
                child: const DeletedOrderPage(),
                type: PageTransitionType.rightToLeftWithFade);
            break;
          case '/completed':
            return PageTransition(
                child: const CompletedOrderPage(),
                type: PageTransitionType.rightToLeftWithFade);
            break;
          case '/':
            return PageTransition(
                child: const Home(),
                type: PageTransitionType.rightToLeftWithFade);
            break;
          default:
            return null;
        }
      },
      initialRoute: '/',
    );
  }
}

