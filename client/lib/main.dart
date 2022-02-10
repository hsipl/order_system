import 'package:client/model/app_state.dart';
import 'package:client/pages/splash_page.dart';
import 'package:client/redux/reducers.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:page_transition/page_transition.dart';
import 'package:client/pages/home_deactivate_page.dart';
import 'package:client/pages/login_page.dart';
import 'package:client/pages/home_activate_page.dart';
import 'package:client/pages/block_goods_page.dart';
import 'package:client/pages/completed_order_page.dart';
import 'package:client/pages/delete_order_page.dart';
import 'package:client/pages/earning_page.dart';
import 'package:client/pages/go_to_admin_page.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/preference_operation.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
      overlays: [SystemUiOverlay.bottom, SystemUiOverlay.top]);
  runApp(const EnterPoint());
}

class EnterPoint extends StatelessWidget {
  const EnterPoint({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _initState = AppState(checkoutList: []);
    final _store = Store<AppState>(reducer, initialState: _initState);
    bool? login;
    return FutureBuilder<bool?>(
      initialData: login,
      future: Init.instance.initialize(),
      builder: (context, AsyncSnapshot snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const MaterialApp(
              debugShowCheckedModeBanner: false, home: SplashPage());
        } else {
          login = snapshot.data;
          return OrderSystem(
            login: login,
            store: _store,
          );
        }
      },
    );
  }
}

class Init {
  Init._();

  static final instance = Init._();

  Future<bool?> initialize() async {
    await Future.delayed(const Duration(seconds: 2));
    return getLoginSharedPrefs();
  }
}

class OrderSystem extends StatelessWidget {
  const OrderSystem({Key? key, this.login, required this.store})
      : super(key: key);
  final bool? login;
  final Store<AppState> store;

  @override
  Widget build(BuildContext context) {
    return StoreProvider<AppState>(
      store: store,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: appTheme,
        home: (login == true) ? const HomePage() : const DeactivateHomePage(),
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/home_deactivate':
              return PageTransition(
                  child: const DeactivateHomePage(),
                  type: PageTransitionType.scale,
                  duration: const Duration(milliseconds: 200),
                  alignment: Alignment.center);
            case '/home_activate':
              return PageTransition(
                  child: const HomePage(),
                  type: PageTransitionType.scale,
                  duration: const Duration(milliseconds: 400),
                  alignment: Alignment.center);
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
            default:
              return null;
          }
        },
      ),
    );
  }
}
