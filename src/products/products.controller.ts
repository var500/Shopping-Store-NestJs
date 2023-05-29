import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsServices } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsServices) { }

    @Post('add')
    addProduct(
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number
    ):{error:boolean,message:string} {
        this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
        return{error:false,message:"Data Updated successfully"}
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId:string){
        this.productsService.deleteProduct(prodId);
        return{error:false,message:"Data Deleted successfully"}
    }
}