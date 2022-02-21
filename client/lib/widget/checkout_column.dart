import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/checkout_action.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
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
    return StoreConnector<AppState, AppState>(
      converter: (store) => store.state,
      builder: (context, store) {
        int totalAmount = store.newTotalAmount;
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
                      StoreProvider.of<AppState>(context)
                          .dispatch(CheckoutClear());
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
                            borderRadius:
                                BorderRadius.all(Radius.circular(20.0))),
                        child: Center(
                            child: Text(
                          "編號:0\n總金額 $totalAmount 元",
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 25),
                        )),
                      ),
                    )),

                Expanded(
                  flex: 2,
                  child: CheckoutColumnButton(
                      color: kConfirmButtonColor,
                      text: '送出',
                      onPress: () {
                        print(store.newCheckoutList);
                      }),
                ),
              ],
            ),
          ),
        );
      },
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
            CheckoutItem item = store.newCheckoutList[index];
            int amount = item.amount;
            String tagString = '';
            for (String tag in item.tags) {
              tagString += tag + ',';
            }
            return ClipRect(
              child: Dismissible(
                key: UniqueKey(),
                onDismissed: (direction) {
                  StoreProvider.of<AppState>(context)
                      .dispatch(CheckoutRemove(index));
                  StoreProvider.of<AppState>(context)
                      .dispatch(UpdateCheckoutPrice());
                },
                background: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: Container(
                      color: kCancelButtonColor,
                      child: const Icon(Icons.delete, color: Colors.white)),
                ),
                child: CheckoutTile(
                  img: item.product.img,
                  name: item.product.name + '*$amount',
                  tagString: tagString,
                  itemPrice: int.parse(item.product.price) * amount,
                ),
              ),
            );
          },
        );
      },
    );
  }
}

class CheckoutTile extends StatelessWidget {
  const CheckoutTile({
    Key? key,
    required this.name,
    required this.tagString,
    required this.img,
    required this.itemPrice,
  }) : super(key: key);

  final String name;
  final String tagString;
  final String img;
  final int itemPrice;

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
              children: [
                SizedBox(
                  height: 50,
                  width: 50,
                  child: Image(image: NetworkImage(img)),
                )
              ],
            ),
            title: Text(name),
            subtitle: Text(tagString),
            trailing: Text('$itemPrice'),
          ),
        ),
      ),
    );
  }
}
