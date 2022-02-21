import 'package:client/model/app_state.dart';
import 'package:client/redux/actions/temp_checkout_action.dart';
import 'package:client/services/decorations.dart';
import 'package:client/services/serializer.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

import '../styled_buttons.dart';

class TagsInput extends StatelessWidget {
  const TagsInput(
      {Key? key, required this.productId})
      : super(key: key);
  final int productId;

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
              child: StoreConnector<AppState, AppState>(
                converter: (store) => store.state,
                builder: (context, store) {
                  return Wrap(
                    alignment: WrapAlignment.start,
                    crossAxisAlignment: WrapCrossAlignment.start,
                    spacing: 5,
                    children:
                        tagButtonGenerate(store, productId,context),
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

List<ActionButton> tagButtonGenerate(store, productId,context) {
  Product product = Product.find(store, productId);
  List tags = product.tags;
  return List.generate(
    tags.length,
    (i) => ActionButton(
      action: tags[i],
      color: primaryTextColor,
      onPress: () {
        StoreProvider.of<AppState>(context).dispatch(SetTempCheckoutItemTags(tags[i]));
      },
    ),
  );
}
