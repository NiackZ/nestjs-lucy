import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/models/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
	exports:[ProductsService],
	imports:[
		CacheModule.register({
			ttl: 60
		}),
		TypeOrmModule.forFeature([Product]),
		forwardRef(()=>AuthModule)
	]
})
export class ProductsModule {}
