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
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			entities: ["dist/models/*.entity{.ts,.js}"],
			synchronize: true,
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