export class ProductsModel {
  counter = 0;
  items;

  constructor() {
    this.items = [];
  }

  addProduct(data) {
    const id = ++this.counter;
    this.items.push({
      id,
      ...data,
    });
  }

  getAll() {
    return this.items;
  }
}

export class ProductModel {
  id;
  name;
  group;
  price;

  constructor({id, name, group, price}) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.price = price;
  }
}
