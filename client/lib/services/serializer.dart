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
    price = map['price'].toString();
    // img = map['image'];
    img =
        'https://d1ralsognjng37.cloudfront.net/3ea3bab1-7c51-4812-8534-03821aff031a';
    category = map['category'];
    status = map['status'];
    for (final tag in map['tags']) {
      tags.add(tag['tag']);
    }
  }
}

class CheckoutItem {
  late Product product;

  late int amount;

  late List tags;

  CheckoutItem({
    required this.product,
    this.amount = 1,
    required this.tags,
  });

  CheckoutItem.fromMap(Map<String, dynamic> map) {
    product = map['product'];
    tags = map['tags'];
    amount = map['amount'];
  }
}
