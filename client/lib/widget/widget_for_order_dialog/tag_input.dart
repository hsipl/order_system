import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class TagsInput extends StatelessWidget {
  const TagsInput({Key? key, required this.tagButtons}) : super(key: key);
  final List<Widget> tagButtons;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 200,
        width: 250,
        child: MediaQuery.removePadding(
          context: context,
          removeTop: true,
          child: CupertinoScrollbar(
            child: SingleChildScrollView(
              child: Wrap(
                alignment: WrapAlignment.center,
                spacing: 5,
                children: tagButtons,
              ),
            ),
          ),
        ));
  }
}
