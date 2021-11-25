import 'dart:io';

import 'package:flutter/material.dart';
import 'package:client/services/api_connection.dart';
import 'package:client/widget/login_text_field.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

void loginChecker(context, String loginStatus) {
  if (loginStatus == 'login success.') {
    Navigator.pop(context);
  } else {
    AlertDialog dialog = AlertDialog(
      title: Text(loginStatus),
      actions: [
        ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Got it'))
      ],
    );
    showDialog(
      context: context,
      builder: (context) {
        return dialog;
      },
    );
  }
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
                onPressed: () {
                  String username = usernameField.getText();
                  String password = passwordField.getText();
                  var loginData = <String, String>{
                    'username': username,
                    'password': password
                  };
                  Api api = Api();
                  Future<String> loginResponse = api.login(loginData);
                  loginResponse.then((String value) {
                    print(value);
                    loginChecker(context, value);
                  });
                },
                child: const Text('Login'),
              ),
            ),
            const Expanded(flex: 15, child: SizedBox(height: 30)),
          ],
        ),
      ),
    );
  }
}
