import { ProductsModel } from './products.model';

const products = new ProductsModel();

[
  ['CPU', 'PC', 37000],
  ['Video card', 'PC', 69000],
  ['Motherboard', 'PC', 9000],
  ['RAM', 'PC', 6000],
  ['Source of power', 'PC', 1500],
  ['Cooler', 'PC', 3000],
]
  .forEach(item => {
    products.addProduct({
      name: item[0],
      group: item[1],
      price: item[2],
    });
  });

export default products.getAll();
