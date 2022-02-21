import 'package:client/services/serializer.dart';
class CheckoutAdd {
  CheckoutAdd();
}

class CheckoutRemove {
  final int payload;

  CheckoutRemove(this.payload);
}

class CheckoutClear {
  CheckoutClear();
}