export interface ProductTableViewModel {
  readonly id: number;
  readonly name: string;
  readonly parent: {
    readonly id: number;
    readonly name: string;
  };
  readonly price: number;
}
