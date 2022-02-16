class Product {
  int id = 0;
  String name = '';
  String price = '';
  String img = '';
  int category = 0;
  int status = 0;
  List<String> tags=[];

  Product(this.id, this.name, this.price, this.img, this.status,
      this.category, this.tags);

  Product.fromMap(Map<String, dynamic> map) {
    id = map['id'];
    name = map['name'];
    price = map['price'].toString() + '元';
    // img = map['image'];
    img = 'https://d1ralsognjng37.cloudfront.net/3ea3bab1-7c51-4812-8534-03821aff031a';
    category = map['category'];
    status = map['status'];
    for (final tag in map['tags']) {
      tags.add(tag['tag']);
    }
  }

  static  Product find(store,productId){
    late Product product;
    for(int i = 0;i<store.newProductList.length;i++ ){
      product = store.newProductList[i];
      if(product.id==productId){
        break;
      }
    }
   return product;
  }

}
