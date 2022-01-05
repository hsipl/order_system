import 'package:client/widget/loading_dialog.dart';
import 'package:flutter/material.dart';
import 'package:client/services/preference_operation.dart';
import 'package:client/services/api_connection.dart';
import 'package:client/widget/login_text_field.dart';
import 'package:client/widget/error_dialog.dart';

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
                  // DEBUG
                  String username = usernameField.getText();
                  String password = passwordField.getText();
                  var loginData = <String, String>{
                    'username': 'hsipl206',
                    'password': 'hsipl206'
                  };
                  showLoaderDialog(context);
                  await Future.delayed(const Duration(seconds: 1));
                  Api().login(loginData).then(
                    (status) {
                      if (status == '200') {
                        Api().product().then(
                          (status) {
                            loginChecker(context, status);
                          },
                        );
                      } else {
                        loginChecker(context, status);
                      }
                    },
                  );
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

void loginChecker(context, String status) {
  if (status == '200') {
    setLoginSharedPrefs(true);
    Navigator.pushNamedAndRemoveUntil(
        context, '/home_activate', (Route<dynamic> route) => false);
  } else {
    Navigator.pop(context);
    showDialog(
      context: context,
      builder: (context) {
        return ErrorDialog(status: status);
      },
    );
  }
}
