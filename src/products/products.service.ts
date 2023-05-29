import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsServices {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = (Math.random() * 1000).toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);

        return prodId;

    };

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const prod = this.findProduct(productId)[0];
        return { ...prod };
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;


    }

    deleteProduct(prodId: string) {
        const [_, index] = this.findProduct(prodId);
        this.products.splice(index,1);

    }

    private findProduct(id: string): [Product, number] {
        const prodIndex = this.products.findIndex(prod => prod.id === id)
        const prod = this.products.find((prod) => prod.id === id);
        if (!prod) {
            throw new NotFoundException('Could not find the product');
        }
        return [prod, prodIndex];
    }
}