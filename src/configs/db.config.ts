import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"

export const dbConfig: TypeOrmModuleAsyncOptions = {
    useFactory() {
       return  {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User],
        autoLoadEntities: true,
        synchronize: true,
      }
}
}