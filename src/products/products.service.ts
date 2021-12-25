import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Product } from 'src/models/product.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }

	@Override()
	async getByEmail(email: string){
		const user = await this.repo.findOne({where:{email}});
		return user
 	}

	@Override("createOneBase")
	async create(dto){
		const user = await this.repo.create(dto);
		return user
 	}
}