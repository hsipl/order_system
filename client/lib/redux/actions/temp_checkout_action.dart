import 'package:client/services/serializer.dart';
class TempCheckoutAdd {
  final CheckoutItem payload;

  TempCheckoutAdd(this.payload);
}

class TempCheckoutRemove {
  final int payload;

  TempCheckoutRemove(this.payload);
}

class TempCheckoutClear {
  TempCheckoutClear();
}