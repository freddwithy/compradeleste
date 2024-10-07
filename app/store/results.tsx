
import { Products } from "@/types/types";
import { create } from "zustand";

interface ProductsState {
  products: Products;
  setProducts: (products: Products) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: {
    results: [],
  },
  setProducts: (products) => set({ products }),
}));
