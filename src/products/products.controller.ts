import { CacheInterceptor, Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from 'src/auth/auth.guard';
import { Product } from 'src/models/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Продукты')
@Crud({
	model: {
		type: Product,
	},
	routes: {
		only: ["getManyBase", "getOneBase", "createOneBase", "updateOneBase"],
		createOneBase:{
			decorators: [UseGuards(AuthGuard), ApiBearerAuth()]
		},
		updateOneBase:{
			decorators: [UseGuards(AuthGuard), ApiBearerAuth()],
			interceptors: [CacheInterceptor]
		}
	},
})
@Controller('products')
export class ProductsController implements CrudController<Product> {
	constructor(public service: ProductsService) { }
}
