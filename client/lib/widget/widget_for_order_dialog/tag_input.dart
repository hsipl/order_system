import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class TagsInput extends StatelessWidget {
  const TagsInput({Key? key, required this.tagButtons}) : super(key: key);
  final List<Widget> tagButtons;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 250,
        width: 300,
        child: InputDecorator(
          expands: true,
          decoration: InputDecoration(
            labelText: '選項',
            border:OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),
          child: MediaQuery.removePadding(
            context: context,
            removeTop: true,
            child: CupertinoScrollbar(
              child: SingleChildScrollView(
                child: Wrap(
                  alignment: WrapAlignment.start,
                  crossAxisAlignment: WrapCrossAlignment.start,
                  spacing: 5,
                  children: tagButtons,
                ),
              ),
            ),
          ),
        ));
  }
}
