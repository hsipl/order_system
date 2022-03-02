import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_shopping_action.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

import '../button_style/styled_buttons.dart';

class TagsInput extends StatelessWidget {
  const TagsInput({Key? key, required this.product}) : super(key: key);
  final Product product;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 250,
      width: 300,
      child: InputDecorator(
        expands: true,
        decoration: InputDecoration(
          labelText: '選項',
          border: OutlineInputBorder(
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
                children: tagButtonGenerate(product, context),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

List<ActionButton> tagButtonGenerate(product, context) {
  List tags = product.tags;
  return List.generate(
    tags.length,
    (i) => ActionButton(
      action: tags[i],
      color: primaryTextColor,
      onPress: () {
        StoreProvider.of<AppState>(context)
            .dispatch(SetTempCheckoutItemTags(tags[i]));
      },
    ),
  );
}
