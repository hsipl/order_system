import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class LabelTextContainer extends StatefulWidget {
  const LabelTextContainer({
    required this.labels,
    Key? key,
  }) : super(key: key);

  final List<String> labels;

  @override
  State<LabelTextContainer> createState() => _LabelTextContainerState();
}

class _LabelTextContainerState extends State<LabelTextContainer> {
  final _scrollController = ScrollController();

  void _scrollDown() {
    _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance!.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollDown();
      }
    });
    String labelString = '';
    for(final l in widget.labels){
      labelString += l+'\n';
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
            child: CupertinoScrollbar(
              child: SingleChildScrollView(
                controller: _scrollController,
                child: Text(labelString),
              ),
            ),
          ),
        ),
      ),
    );
  }
}