export interface Products {
    results: Product[]
}

export interface Product {
  title: string;
  price: number;
  img?: string;
  link?: string;
  description?: string;
  store: string
}
