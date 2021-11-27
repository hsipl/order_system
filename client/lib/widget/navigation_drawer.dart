import 'package:client/services/preference_operation.dart';
import 'package:flutter/material.dart';

class ActivateDrawer extends StatefulWidget {
  const ActivateDrawer({Key? key}) : super(key: key);

  @override
  State<ActivateDrawer> createState() => _ActivateDrawerState();
}

class _ActivateDrawerState extends State<ActivateDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          Column(
            children: const [
              SizedBox(height: 10),
              Text(
                "大雞雞",
                style: TextStyle(fontSize: 30),
              ),
              SizedBox(height: 10),
              Text("hsipl分店"),
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
              padding: EdgeInsets.fromLTRB(20, 10, 0, 0), child: Text('登入')),
          buildMenuItem(
              text: "登入",
              icon: Icons.login,
              onClicked: () => selectedItem(context, 6)),
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
  Navigator.pop(context);

  switch (index) {
    case 0:
      Navigator.pushNamed(context, '/completed');
      break;
    case 1:
      Navigator.pushNamed(context, '/delete');
      break;
    case 2:
      Navigator.pushNamed(context, '/block');
      break;
    case 3:
      Navigator.pushNamed(context, '/admin');
      break;
    case 4:
      Navigator.pushNamed(context, '/earning');
      break;
    case 5:
      setLoginSharedPrefs(false);
      Navigator.pushNamedAndRemoveUntil(context, '/home_deactivate',(Route<dynamic> route) => false);
      break;
    case 6:
      Navigator.pushNamed(context, '/login');
      break;
  }
}
