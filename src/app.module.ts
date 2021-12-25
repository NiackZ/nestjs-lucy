import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Product } from './models/product.entity';
import { User } from './models/user.entity';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.PG_HOST,
			port: Number(process.env.PG_PORT),
			username: process.env.PG_USER,
			password: process.env.PG_PASS,
			database: process.env.PG_DB,
			entities: ["dist/models/*.entity{.ts,.js}"],
			synchronize: false,
			migrations:["dist/**/db/migrations/*{.ts,.js}"],
			cli: {
				"migrationsDir": "db/migrations"
			}
		}),
		UsersModule,
		AuthModule,
		ProductsModule
	]
})
export class AppModule { }