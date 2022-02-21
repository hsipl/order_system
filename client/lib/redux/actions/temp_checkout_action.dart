class TempCheckoutAdd {
  final int payload;

  TempCheckoutAdd(this.payload);
}

class TempCheckoutRemove {
  final int payload;

  TempCheckoutRemove(this.payload);
}

class TempCheckoutClear {
  TempCheckoutClear();
}

// item
class SetTempCheckoutItemTags {
  final String payload;

  SetTempCheckoutItemTags(this.payload);
}

class SetTempCheckoutItemAmount {
  final int payload;

  SetTempCheckoutItemAmount(this.payload);
}
