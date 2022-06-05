import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    console.log('insertProduct: ', newProduct);
    console.log('currentProduct: ', this.products);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];

    return { ...product };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    const [product, productIndex] = this.findProduct(prodId);
    const updatedProduct = { ...product };

    if (!title) {
      updatedProduct.title = title;
    }
    if (!desc) {
      updatedProduct.description = desc;
    }
    if (!price) {
      updatedProduct.price = price;
    }
    this.products[productIndex] = updatedProduct;
  }
  
  removeProduct(prodId: string) {
    const [_, productIndex] = this.findProduct(prodId);
    this.products.splice(productIndex, 1);
  }
}
