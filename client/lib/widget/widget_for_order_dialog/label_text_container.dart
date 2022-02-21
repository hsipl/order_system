import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_checkout_action.dart';
import 'package:client/services/decorations.dart';

import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class LabelTextContainer extends StatefulWidget {
  const LabelTextContainer({
    Key? key,
  }) : super(key: key);

  @override
  State<LabelTextContainer> createState() => _LabelTextContainerState();
}

class _LabelTextContainerState extends State<LabelTextContainer> {
  final _scrollController = ScrollController();

  void _scrollDown() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(_scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250), curve: Curves.ease);
    }
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance!.addPostFrameCallback((_) {
      _scrollDown();
    });

    return StoreConnector<AppState, AppState>(
      converter: (store) => store.state,
      builder: (context, store) {
        List checkoutItems = store.newTempCheckoutList;

        List<Widget> listWidget = [];
        for (int i = 0; i < checkoutItems.length; i++) {
          listWidget.add(
            ListItem(checkoutItems: checkoutItems, index: i),
          );
        }

        return Padding(
          padding: const EdgeInsets.fromLTRB(0, 0, 0, 10),
          child: SizedBox(
            height: 250,
            width: 300,
            child: InputDecorator(
              expands: true,
              decoration: InputDecoration(
                labelText: '客製化選項',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              child: MediaQuery.removePadding(
                context: context,
                removeTop: true,
                child: Scrollbar(
                  child: ListView.builder(
                    controller: _scrollController,
                    itemCount: checkoutItems.length,
                    itemBuilder: (context, index) {
                      return ClipRect(
                        child: Dismissible(
                          key: UniqueKey(),
                          onDismissed: (direction) {
                            StoreProvider.of<AppState>(context)
                                .dispatch(TempCheckoutRemove(index));
                          },
                          background: Container(
                              color: kCancelButtonColor,
                              child: const Icon(Icons.delete,
                                  color: Colors.white)),
                          child: listWidget[index],
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class ListItem extends StatelessWidget {
  const ListItem({
    Key? key,
    required this.checkoutItems,
    required this.index,
  }) : super(key: key);

  final List checkoutItems;
  final int index;

  @override
  Widget build(BuildContext context) {
    String tagString = '';
    for (String tag in checkoutItems[index].tags) {
      tagString += tag + ',';
    }

    return GestureDetector(
      child: Container(
        decoration: BoxDecoration(
          color:
              (index == checkoutItems.length - 1) ? primaryColor : Colors.white,
          border: const Border(
            bottom: BorderSide(width: 1.0, color: Colors.black),
          ),
        ),
        child: ListTile(
          title: Text(tagString),
          trailing: Text(checkoutItems[index].amount.toString()),
        ),
      ),
    );
  }
}
