import 'package:client/redux/actions/shopping_action.dart';
import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:client/services/serializer.dart';
import '../../model/app_state.dart';

class FinalShoppingList extends StatefulWidget {
  const FinalShoppingList({
    Key? key,
  }) : super(key: key);

  @override
  State<FinalShoppingList> createState() => _FinalShoppingListState();
}

class _FinalShoppingListState extends State<FinalShoppingList> {
  final GlobalKey<AnimatedListState> _key = GlobalKey();

  void _removeItem(int index) {
    _key.currentState!.removeItem(index, (_, animation) {
      return SizeTransition(
        axisAlignment: -1,
        sizeFactor: animation,
        child: Container(
            height: 50,
            color: kCancelButtonColor,
            child: Center(child: Icon(Icons.delete, color: Colors.white))),
      );
    }, duration: const Duration(milliseconds: 250));
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, AppState>(
        converter: (store) => store.state,
        builder: (context, store) {
          List<ShoppingItem> items = store.newShoppingList;
          return Column(
            children: [
              SizedBox(
                height: 50,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: const [
                    Expanded(child: Center(child: Text('品名'))),
                    Expanded(child: Center(child: Text('客製化口味'))),
                    Expanded(child: Center(child: Text('數量'))),
                    Expanded(child: Center(child: Text('價格'))),
                    Expanded(child: Center(child: Text('刪除'))),
                  ],
                ),
              ),
              const Divider(color: Colors.grey, height: 1),
              SizedBox(
                  height: 300,
                  child: MediaQuery.removePadding(
                    context: context,
                    removeTop: true,
                    child: AnimatedList(
                      key: _key,
                      initialItemCount: items.length,
                      itemBuilder: (context, index, animation) {
                        return SizedBox(
                          height: 50,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              Expanded(
                                  child: Center(
                                      child: Text(items[index].product.name))),
                              Expanded(
                                  child: Center(
                                      child:
                                          Text(items[index].tags.toString()))),
                              Expanded(
                                  child: Center(
                                      child: Text(
                                          items[index].quantity.toString()))),
                              Expanded(
                                child: Center(
                                  child: Text((items[index].quantity.toInt() *
                                          int.parse(items[index].product.price))
                                      .toString()),
                                ),
                              ),
                              Expanded(
                                child: Center(
                                  child: IconButton(
                                    onPressed: () {
                                      _removeItem(index);
                                      StoreProvider.of<AppState>(context)
                                          .dispatch(ShoppingLIstRemove(index));
                                      StoreProvider.of<AppState>(context)
                                          .dispatch(UpdateTotalAmount());
                                    },
                                    icon: Icon(Icons.delete),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  )),
            ],
          );
        });
  }
}
