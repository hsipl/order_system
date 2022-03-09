import 'package:client/services/serializer.dart';

class TempShoppingListAdd {
  final Product payload;

  TempShoppingListAdd(this.payload);
}

class TempShoppingListRemove {
  final int payload;

  TempShoppingListRemove(this.payload);
}

class TempShoppingListClear {
  TempShoppingListClear();
}

// item
class SetTempCheckoutItemTags {
  final String payload;

  SetTempCheckoutItemTags(this.payload);
}

class SetTempShoppingItemQuantity {
  final int payload;

  SetTempShoppingItemQuantity(this.payload);
}

