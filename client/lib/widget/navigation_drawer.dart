import 'package:client/services/api_connection.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/preference_operation.dart';
import 'package:client/widget/styled_buttons.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ActivateDrawer extends StatefulWidget {
  const ActivateDrawer({Key? key}) : super(key: key);

  @override
  State<ActivateDrawer> createState() => _ActivateDrawerState();
}

class _ActivateDrawerState extends State<ActivateDrawer> {
  String storeName = '';

  @override
  void initState() {
    getStoreInfoSharedPrefs().then((value) {
      setState(() {
        storeName = value!['name'];
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          Column(
            children: [
              const SizedBox(height: 10),
              const Text(
                "好客雞排",
                style: TextStyle(fontSize: 30),
              ),
              const SizedBox(height: 10),
              Text(storeName),
              const SizedBox(height: 10),
              const CircleAvatar(
                child: Icon(Icons.person, size: 50),
                backgroundColor: Colors.grey,
                radius: 50,
              ),
              const SizedBox(height: 10),
            ],
          ),
          const Divider(height: 2),
          const Padding(
              padding: EdgeInsets.fromLTRB(20, 10, 0, 0), child: Text('訂單資訊')),
          buildMenuItem(
              text: "已完成訂單",
              icon: Icons.list_alt,
              onClicked: () => selectedItem(context, 0)),
          buildMenuItem(
              text: "刪除訂單",
              icon: Icons.delete,
              onClicked: () => selectedItem(context, 1)),
          buildMenuItem(
              text: "當班缺貨項目",
              icon: Icons.announcement_rounded,
              onClicked: () => selectedItem(context, 2)),
          const Divider(height: 2),
          const Padding(
              padding: EdgeInsets.fromLTRB(20, 10, 0, 0), child: Text('登出&後台')),
          buildMenuItem(
              text: "後臺系統",
              icon: Icons.admin_panel_settings,
              onClicked: () => selectedItem(context, 3)),
          buildMenuItem(
              text: "當班營收",
              icon: Icons.money,
              onClicked: () => selectedItem(context, 4)),
          buildMenuItem(
              text: "登出",
              icon: Icons.logout,
              onClicked: () => selectedItem(context, 5)),
        ],
      ),
    );
  }
}

class DeactivateDrawer extends StatelessWidget {
  const DeactivateDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          Column(
            children: const [
              SizedBox(height: 10),
              Text(
                "None",
                style: TextStyle(fontSize: 30),
              ),
              SizedBox(height: 10),
              Text("None"),
              SizedBox(height: 10),
              CircleAvatar(
                child: Icon(Icons.person, size: 50),
                backgroundColor: Colors.grey,
                radius: 50,
              ),
              SizedBox(height: 10),
            ],
          ),
          const Divider(height: 2),
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 10, 0, 0),
            child: Text('登入'),
          ),
          buildMenuItem(
            text: "登入",
            icon: Icons.login,
            onClicked: () => selectedItem(context, 6),
          ),
        ],
      ),
    );
  }
}

Widget buildMenuItem({
  required String text,
  required IconData icon,
  VoidCallback? onClicked,
}) {
  return ListTile(
    leading: Icon(icon),
    title: Text(text),
    onTap: onClicked,
  );
}

void selectedItem(BuildContext context, int index) {
  switch (index) {
    case 0:
      Navigator.pop(context);
      Navigator.pushNamed(context, '/completed');
      break;
    case 1:
      Navigator.pop(context);
      Navigator.pushNamed(context, '/delete');
      break;
    case 2:
      Navigator.pop(context);
      Navigator.pushNamed(context, '/block');
      break;
    case 3:
      Navigator.pop(context);
      Navigator.pushNamed(context, '/admin');
      break;
    case 4:
      Navigator.pop(context);
      Navigator.pushNamed(context, '/earning');
      break;
    case 5:
      AlertDialog dialog = AlertDialog(
        title: const Text(
          '確定要登出嗎',
          textAlign: TextAlign.center,
        ),
        content: Row(
          children: [
            ActionButton(
                color: kConfirmButtonColor,
                action: '確定',
                onPress: () async {
                  Api().logout();
                  SharedPreferences preferences =
                      await SharedPreferences.getInstance();
                  await preferences.clear();
                  Navigator.pushNamedAndRemoveUntil(context, '/home_deactivate',
                      (Route<dynamic> route) => false);
                }),
            const Spacer(),
            ActionButton(
              color: kCancelButtonColor,
              action: '取消',
              onPress: () => Navigator.pop(context),
            ),
          ],
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(32.0),
          ),
        ),
      );
      showDialog(context: context, builder: (context) => dialog);
      break;
    case 6:
      Navigator.pushNamed(context, '/login');
      break;
  }
}
