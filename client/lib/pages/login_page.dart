import 'package:client/pages/splash_page.dart';
import 'package:client/services/decorations.dart';
import 'package:client/widget/loading_dialog.dart';
import 'package:client/widget/styling_buttons.dart';
import 'package:flutter/material.dart';
import 'package:client/services/preference_operation.dart';
import 'package:client/services/api_connection.dart';
import 'package:client/widget/login_text_field.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  LoginTextField usernameField = LoginTextField(
    icon: Icons.person,
    hint: 'username',
    isPasswordField: false,
    title: 'username',
  );
  LoginTextField passwordField = LoginTextField(
      icon: Icons.lock,
      hint: 'password',
      isPasswordField: true,
      title: 'password');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: Container(
        padding: const EdgeInsets.fromLTRB(40, 40, 40, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(flex: 4, child: usernameField),
            Expanded(flex: 4, child: passwordField),
            Expanded(
              flex: 2,
              child: ElevatedButton(
                onPressed: () async {
                  String username = usernameField.getText();
                  String password = passwordField.getText();
                  var loginData = <String, String>{
                    'username': 'hsipl206',
                    'password': 'hsipl206'
                  };
                  showLoaderDialog(context);
                  Api api = Api();
                  Future<String> loginResponse = api.login(loginData);
                  await Future.delayed(const Duration(seconds: 1));
                  loginResponse.then((value) {
                    loginChecker(context, value);
                  });
                },
                child: const Text('Login'),
              ),
            ),
            const Expanded(flex: 15, child: SizedBox(height: 0)),
          ],
        ),
      ),
    );
  }
}

void loginChecker(context, String loginStatus) {
  if (loginStatus == 'login success.') {
    setLoginSharedPrefs(true);
    Navigator.pushNamedAndRemoveUntil(
        context, '/home_activate', (Route<dynamic> route) => false);
  } else {
    Navigator.pop(context);

    showDialog(
      context: context,
      builder: (context) {
        return ErrorDialog(loginStatus: loginStatus);
      },
    );
  }
}

class ErrorDialog extends StatelessWidget {
  const ErrorDialog({
    required this.loginStatus,
    Key? key,
  }) : super(key: key);
  final String loginStatus;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(32.0))),
      contentPadding: const EdgeInsets.only(top: 10.0),
      title: Text(loginStatus),
      actions:  [
        Center(
          child: ActionButton(action: '確定', color: kConfirmButtonColor,onPress:()=>Navigator.pop(context),),
        )
      ],
    );
  }
}

