import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:client/widget/login_text_field.dart';
import 'package:http/http.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

void loginChecker(context) {
  Navigator.pushNamed(context, '/home');
}

class _LoginState extends State<Login> {
  LoginTextField usernameField = LoginTextField(
    icon: Icons.person,
    hint: 'username',
    isPasswordField: false,
    title: 'username',
  );
  LoginTextField passwordField = LoginTextField(
      icon: Icons.lock, hint: 'password', isPasswordField: true, title: 'password');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: Container(
        padding: const EdgeInsets.all(40),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            usernameField,
            passwordField,
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                loginChecker(context);
                String username = usernameField.getText();
                String password = passwordField.getText();
                var map = <String, dynamic>{};
                map['username'] = username;
                map['password'] = password;

                final uri = Uri.parse('http://hinininininini.ddns.net:8000/login');
                final headers = {'Content-Type': 'application/json'};
                final encoding = Encoding.getByName('utf-8');
                String jsonBody = json.encode(map);
                Response response = await post(
                  uri,
                  headers: headers,
                  body: jsonBody,
                  encoding: encoding,
                );
                print(response.body);

              },
              child: const Text('Login'),
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(100, 48),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
