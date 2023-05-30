import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(
    'mongodb+srv://varun:321654@shopdb.barhux7.mongodb.net/'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
