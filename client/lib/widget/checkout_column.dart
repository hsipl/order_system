import 'package:client/model/app_state.dart';
import 'package:client/redux/actions.dart';
import 'package:client/services/decorations.dart';
import 'package:client/widget/styled_buttons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class CheckoutColumn extends StatefulWidget {
  const CheckoutColumn({Key? key}) : super(key: key);

  @override
  _CheckoutColumnState createState() => _CheckoutColumnState();
}

class _CheckoutColumnState extends State<CheckoutColumn> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 5, 4, 5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              flex: 2,
              child: CheckoutColumnButton(
                color: kCancelButtonColor,
                text: '清空',
                onPress: () {
                  StoreProvider.of<AppState>(context).dispatch(CheckoutClear());
                },
              ),
            ),
            //TODO : the checkout row
            const Expanded(
              flex: 16,
              child: CheckList(),
            ),
            const Divider(
              color: Colors.black,
            ),
            Expanded(
                flex: 3,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                  child: Container(
                    decoration: const BoxDecoration(
                        color: Color(0xFFF0F0F0),
                        borderRadius: BorderRadius.all(Radius.circular(20.0))),
                    child: const Center(
                        child: Text(
                      "編號:0\n總金額0元",
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 25),
                    )),
                  ),
                )),
            StoreConnector<AppState, AppState>(
                converter: (store) => store.state,
                builder: (context, store) {
                  return Expanded(
                    flex: 2,
                    child: CheckoutColumnButton(
                        color: kConfirmButtonColor,
                        text: '送出',
                        onPress: () {
                          print(store.newCheckoutList);
                          print(store.newProductList);
                        }),
                  );
                }),
          ],
        ),
      ),
    );
  }
}

class CheckList extends StatefulWidget {
  const CheckList({
    Key? key,
  }) : super(key: key);

  @override
  State<CheckList> createState() => _CheckListState();
}

class _CheckListState extends State<CheckList> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, AppState>(
      converter: (store) => store.state,
      builder: (context, store) {
        return ListView.builder(
          itemCount: store.newCheckoutList.length,
          itemBuilder: (context, index) {
            return ClipRect(
              child: Dismissible(
                key: UniqueKey(),
                onDismissed: (direction) {
                  setState(() {
                    store.newCheckoutList.removeAt(index);
                  });
                },
                background: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: Container(color: kCancelButtonColor,
                      child: const Icon(Icons.delete, color: Colors.white)),
                ),
                child: CheckoutItem(item: store.newCheckoutList[index]),
              ),
            );
          },
        );
      },
    );
  }
}

class CheckoutItem extends StatelessWidget {
  const CheckoutItem({
    Key? key,
    required this.item,
  }) : super(key: key);

  final Map item;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 80,
        child: Card(
          elevation: 2,
          child: Center(
            child: ListTile(
              enabled: true,
              leading: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const <Widget>[
                  SizedBox(
                    height: 50,
                    width: 50,
                    child: Image(
                        image: NetworkImage(
                            'https://d1ralsognjng37.cloudfront.net/3ea3bab1-7c51-4812-8534-03821aff031a')),
                  )
                ],
              ),
              title: Text(item['product']),
              subtitle: Text('title'),
              trailing: Text(item['price']),
            ),
          ),
        ),
    );
  }
}
