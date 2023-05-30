import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsServices } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PorductSchema } from "./products.model";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: PorductSchema}])],
    controllers:[ProductsController],
    providers:[ProductsServices]
})
export class ProductsModule{}