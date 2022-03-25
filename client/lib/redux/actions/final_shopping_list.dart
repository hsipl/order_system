import 'package:flutter/material.dart';

class SetKey {
  final GlobalKey<AnimatedListState> payload;

  SetKey(this.payload);
}

class RemoveFinalShoppingListItem {
  final int payload;

  RemoveFinalShoppingListItem(this.payload);
}
