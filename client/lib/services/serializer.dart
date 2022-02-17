class Product {
  late int id;
  late String name;
  late String price;
  late String img;
  late int category;
  late int status;
  late List<String> tags = [];

  Product(this.id, this.name, this.price, this.img, this.status, this.category,
      this.tags);

  Product.fromMap(Map<String, dynamic> map) {
    id = map['id'];
    name = map['name'];
    price = map['price'].toString() ;
    // img = map['image'];
    img =
        'https://d1ralsognjng37.cloudfront.net/3ea3bab1-7c51-4812-8534-03821aff031a';
    category = map['category'];
    status = map['status'];
    tags.add('不辣');
    for (final tag in map['tags']) {
      tags.add(tag['tag']);
    }
  }

  static Product find(store, productId) {
    late Product product;
    for (int i = 0; i < store.newProductList.length; i++) {
      product = store.newProductList[i];
      if (product.id == productId) {
        break;
      }
    }
    return product;
  }
}

class CheckoutItem {
  late int productId;
  late int amount;
  late List tags;

  CheckoutItem(this.productId, this.amount, this.tags);

  CheckoutItem.fromMap(Map<String, dynamic> map) {
    productId = map['productId'];
    tags = map['tags'];
    amount = map['amount'];
  }
}
