import 'package:client/services/decorations.dart';
import 'package:flutter/material.dart';

class LabelTextContainer extends StatefulWidget {
  const LabelTextContainer({
    Key? key,
    required this.deleteItem,
    required this.getCustomData,
  }) : super(key: key);

  final Function deleteItem;
  final Function getCustomData;

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
    Map listData = widget.getCustomData();

    List<Widget> listWidget = [];
    for (int i = 0; i < listData['length']; i++) {
      listWidget.add(
        ListItem(widget: widget, index: i),
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
                itemCount: listData['length'],
                itemBuilder: (context, index) {
                  return ClipRect(
                    child: Dismissible(
                      key: UniqueKey(),
                      onDismissed: (direction) {
                        setState(() {
                          widget.deleteItem(index);
                        });
                      },

                      background: Container(
                          color: kCancelButtonColor,
                          child: const Icon(Icons.delete, color: Colors.white)),
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
  }
}

class ListItem extends StatelessWidget {
  const ListItem({
    Key? key,
    required this.widget,
    required this.index,
  }) : super(key: key);

  final LabelTextContainer widget;
  final int index;

  @override
  Widget build(BuildContext context) {
    Map listData = widget.getCustomData();
    return GestureDetector(
      child: Container(
        decoration: BoxDecoration(
          color:
              (index == listData['length'] - 1) ? primaryColor : Colors.white,
          border: const Border(
            bottom: BorderSide(width: 1.0, color: Colors.black),
          ),
        ),
        child: ListTile(
          title: Text(listData['labels'][index]),
          trailing: Text(listData['num'][index]),
        ),
      ),
    );
  }
}
