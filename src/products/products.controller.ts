import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsServices } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsServices) { }

    @Post('add')
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        const generatedId = await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        await this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
        return{error:false,message:"Data Updated successfully"}
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId:string){
        await this.productsService.deleteProduct(prodId);
        return{error:false,productId:prodId,message:"Data Deleted successfully"}
    }
}