import 'package:client/services/serializer.dart';

class CheckoutAdd {
  final Map payload;

  CheckoutAdd(this.payload);
}

class CheckoutClear {
  CheckoutClear();
}

class ProductAdd {
  final Product payload;

  ProductAdd(this.payload);
}

class ProductClear {
  ProductClear();
}