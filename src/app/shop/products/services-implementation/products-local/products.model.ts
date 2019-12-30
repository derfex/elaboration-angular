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
