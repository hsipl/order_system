class Product {
  int? id;
  String name = '';
  int? price;
  String img = '';
  int? category;
  int? status;
  List<String> tags=[];

  Product(this.id, this.name, this.price, this.img, this.status,
      this.category, this.tags);

  Product.fromMap(Map<String, dynamic> map) {
    id = map['id'];
    name = map['name'];
    price = map['price'];
    // image = map['image'];
    img = 'https://d1ralsognjng37.cloudfront.net/3ea3bab1-7c51-4812-8534-03821aff031a';
    category = map['category'];
    status = map['status'];
    for (final tag in map['tags']) {
      tags.add(tag['tag']);
    }

  }
}
