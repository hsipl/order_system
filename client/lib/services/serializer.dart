class Product {
  int? id;
  String? name;
  int? price;
  String? image;
  int? category;
  int? status;
  List<String> tags=[];

  Product(this.id, this.name, this.price, this.image, this.status,
      this.category, this.tags);

  Product.fromMap(Map<String, dynamic> map) {
    id = map['id'];
    name = map['name'];
    price = map['price'];
    image = map['image'];
    category = map['category'];
    status = map['status'];
    for (final tag in map['tags']) {
      tags.add(tag['tag']);
    }

  }
}
