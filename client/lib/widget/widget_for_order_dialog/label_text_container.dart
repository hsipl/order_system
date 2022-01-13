import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class LabelTextContainer extends StatefulWidget {
  const LabelTextContainer({
    required this.labels,
    required this.num,
    required this.onTapIndex,
    required this.onTapLabel,
    Key? key,
  }) : super(key: key);

  final List<String> labels;
  final List<String> num;
  final Function onTapIndex;
  final int onTapLabel;

  @override
  State<LabelTextContainer> createState() => _LabelTextContainerState();
}

class _LabelTextContainerState extends State<LabelTextContainer> {
  final _scrollController = ScrollController();

  void _scrollDown() {
    if (_scrollController.hasClients &&
        widget.onTapLabel == widget.labels.length - 1) {
      // _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
      _scrollController.animateTo(_scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250), curve: Curves.ease);
    }
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance!.addPostFrameCallback((_) {
      _scrollDown();
    });

    List<Widget> listWidget = [];
    for (int i = 0; i < widget.num.length; i++) {
      listWidget.add(
        GestureDetector(
          onTap: () {
            widget.onTapIndex(i);
          },
          child: Container(
            decoration: BoxDecoration(
              color: (i == widget.onTapLabel) ? Colors.grey : Colors.white,
              border: const Border(
                bottom: BorderSide(width: 1.0, color: Colors.black),
              ),
            ),
            child: ListTile(
              title: Text(widget.labels[i]),
              trailing: Text(widget.num[i]),
            ),
          ),
        ),
      );
    }
    return Padding(
      padding: const EdgeInsets.fromLTRB(0, 5, 0, 10),
      child: SizedBox(
        height: 200,
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
              child: ListView(
                controller: _scrollController,
                children: listWidget,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
