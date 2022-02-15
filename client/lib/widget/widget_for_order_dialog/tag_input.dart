import 'package:client/model/app_state.dart';
import 'package:client/services/decorations.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

import '../styled_buttons.dart';

class TagsInput extends StatelessWidget {
  const TagsInput({Key? key, required this.index}) : super(key: key);
  final int index;

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
                child: StoreConnector<AppState,AppState>(
                  converter: (store)  => store.state,
                  builder: (context, store){
                    return Wrap(
                      alignment: WrapAlignment.start,
                      crossAxisAlignment: WrapCrossAlignment.start,
                      spacing: 5,
                      children: tagButtonGenerate(store,index),
                    );
                  } ,
                ),
              ),
            ),
          ),
        ));
  }
}

List<ActionButton> tagButtonGenerate(store,index){
  List product = store.newProductList;
  List tags = product[index].tags;
  return List.generate(
    tags.length,
        (i) => ActionButton(
      action: tags[i],
      color: primaryTextColor,
      onPress: () {
        // setState(() {
        //   List<String> checkList =
        //   customLabels[customLabels.length - 1].split(',');
        //   if (!checkList.contains(widget.info[i])) {
        //     customLabels[customLabels.length - 1] =
        //         customLabels[customLabels.length - 1] + widget.info[i] + ',';
        //   }
        // });
      },
    ),
  );
}