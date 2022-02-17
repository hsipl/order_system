import 'package:client/services/serializer.dart';

class CheckoutAdd {
  final CheckoutItem payload;

  CheckoutAdd(this.payload);
}

class CheckoutDelete {
  final int payload;

  CheckoutDelete(this.payload);
}

class CheckoutClear {
  CheckoutClear();
}

class TempCheckoutAdd{
  final CheckoutItem payload;

  TempCheckoutAdd(this.payload);
}

class ProductAdd {
  final Product payload;

  ProductAdd(this.payload);
}

class ProductClear {
  ProductClear();
}

