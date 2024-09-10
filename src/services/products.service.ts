import { del, get, patch, post } from "./cg-api.service";
import { IProductCreate, IProductUpdate, ISearchProducts } from "../interfaces/products";

export function listProducts(params: ISearchProducts) {
  return get(`/product`, { params });
}

export function listOneProduct(productId: string) {
  return get(`/product/${productId}`);
}

export function createProduct(data: IProductCreate) {
  return post("/product", { data });
}

export function deleteProduct(productId: string) {
  return del(`/product/${productId}`);
}

export function updateProduct(productId: string, data: IProductUpdate) {
  return patch(`/product/${productId}`, { data });
}
