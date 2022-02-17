import 'package:client/services/serializer.dart';
class CheckoutAdd {
  final CheckoutItem payload;

  CheckoutAdd(this.payload);
}

class CheckoutRemove {
  final int payload;

  CheckoutRemove(this.payload);
}

class CheckoutClear {
  CheckoutClear();
}