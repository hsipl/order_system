import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/shopping_action.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
import 'package:client/widget/shopping_column/shopping_confirm_dialog.dart';
import 'package:client/widget/button_style/styled_buttons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ShoppingColumn extends StatefulWidget {
  const ShoppingColumn({Key? key}) : super(key: key);

  @override
  _ShoppingColumnState createState() => _ShoppingColumnState();
}

class _ShoppingColumnState extends State<ShoppingColumn> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, AppState>(
      converter: (store) => store.state,
      builder: (context, store) {
        int totalAmount = store.newTotalAmount;
        int sheetNo = store.newSheetNo;
        return Expanded(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(0, 5, 4, 5),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  flex: 2,
                  child: ShoppingColumnButton(
                    color: kCancelButtonColor,
                    text: '清空',
                    onPress: () {
                      StoreProvider.of<AppState>(context)
                          .dispatch(ShoppingListClear());
                      StoreProvider.of<AppState>(context)
                          .dispatch(UpdateTotalAmount());
                    },
                  ),
                ),
                //TODO : the checkout row
                const Expanded(
                  flex: 16,
                  child: ShoppingList(),
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
                          "編號 : $sheetNo \n總金額 $totalAmount 元",
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 25),
                        )),
                      ),
                    )),

                Expanded(
                  flex: 2,
                  child: ShoppingColumnButton(
                      color: kConfirmButtonColor,
                      text: '送出',
                      onPress: () {
                        showGeneralDialog(
                          transitionBuilder: (context, a1, a2, widget) {
                            return Align(
                              alignment: Alignment.center,
                              child: FadeTransition(
                                opacity: a1,
                                child: Opacity(
                                  opacity: a1.value,
                                  child: const ShoppingConfirmDialog(),
                                ),
                              ),
                            );
                          },
                          transitionDuration: const Duration(milliseconds: 200),
                          barrierDismissible: true,
                          barrierLabel: '',
                          context: context,
                          pageBuilder: (context, animation1, animation2) {
                            return Container();
                          },
                        );
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

class ShoppingList extends StatefulWidget {
  const ShoppingList({
    Key? key,
  }) : super(key: key);

  @override
  State<ShoppingList> createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
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
          itemCount: store.newShoppingList.length,
          itemBuilder: (context, index) {
            ShoppingItem item = store.newShoppingList[index];
            return ClipRect(
              child: Dismissible(
                key: UniqueKey(),
                onDismissed: (direction) {
                  StoreProvider.of<AppState>(context)
                      .dispatch(ShoppingListRemove(index));
                  StoreProvider.of<AppState>(context)
                      .dispatch(UpdateTotalAmount());
                },
                background: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: Container(
                      color: kCancelButtonColor,
                      child: const Icon(Icons.delete, color: Colors.white)),
                ),
                child: ShoppingTile(
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

class ShoppingTile extends StatelessWidget {
  const ShoppingTile({
    Key? key,
    required this.item,
  }) : super(key: key);

  final ShoppingItem item;

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
            title: Text(item.product.name + '*${item.quantity}'),
            subtitle: Text(tagString),
            trailing: Text('${int.parse(item.product.price) * item.quantity}'),
          ),
        ),
      ),
    );
  }
}
