export interface IProductTableViewModel {
  id: number;
  name: string;
  parent: {
    id: number;
    name: string;
  };
  price: number;
}
