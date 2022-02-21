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
                      StoreProvider.of<AppState>(context)
                          .dispatch(UpdateCheckoutPrice());
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
  final _scrollController = ScrollController();

  void _scrollDown() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(_scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250), curve: Curves.ease);
    }
  }
  @override
  Widget build(BuildContext context) {

    return StoreConnector<AppState, AppState>(
      converter: (store) => store.state,
      builder: (context, store) {
        WidgetsBinding.instance!.addPostFrameCallback((_) {
          _scrollDown();
        });
        return ListView.builder(
          controller: _scrollController,
          itemCount: store.newCheckoutList.length,
          itemBuilder: (context, index) {
            CheckoutItem item = store.newCheckoutList[index];
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
                  item: item,
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
    required this.item,
  }) : super(key: key);

  final CheckoutItem item;

  @override
  Widget build(BuildContext context) {
    String tagString = '';
    for (String tag in item.tags) {
      tagString += tag + ',';
    }

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
                  child: Image(image: NetworkImage(item.product.img)),
                )
              ],
            ),
            title: Text(item.product.name + '*${item.amount}'),
            subtitle: Text(tagString),
            trailing: Text('${int.parse(item.product.price) * item.amount}'),
          ),
        ),
      ),
    );
  }
}
