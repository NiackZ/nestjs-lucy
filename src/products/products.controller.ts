import { CacheInterceptor, Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { AuthGuard } from 'src/auth/auth.guard';
import { Product } from 'src/models/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Продукты')
@Crud({
	model: {
		type: Product,
	},
	routes: {
		only: ["getManyBase", "getOneBase", "createOneBase", "updateOneBase"],
	}
})
@Controller('products')
export class ProductsController implements CrudController<Product> {
	constructor(public service: ProductsService) { }

	@UseGuards(AuthGuard)
	@Override('createOneBase')
	create(
		@ParsedRequest() req: CrudRequest,
		@ParsedBody() dto: CreateProductDto
	) {
		return this.service.createOne(req, dto)
	}

	@UseInterceptors(CacheInterceptor)
	@UseGuards(AuthGuard)
	@Override('updateOneBase')
	update(@ParsedRequest() req: CrudRequest,
		@ParsedBody() dto: CreateProductDto
	) {
		return this.service.updateOne(req, dto)
	}
}
