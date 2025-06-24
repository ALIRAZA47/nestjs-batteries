import { Module, DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import {NestJsBatteriesOptions} from "./interfaces/starter-kit-options.interface";

@Global()
@Module({})
export class NestJsBatteries {
    static forRoot(options: NestJsBatteriesOptions): DynamicModule {
        const imports = [];

        // Auth
        if (options.auth?.jwtModuleOptions) {
            imports.push(JwtModule.register(options.auth.jwtModuleOptions));
        }

        // DB
        if (options.db?.type === 'mongo' && options.db.mongooseOptions?.uri) {
            imports.push(MongooseModule.forRoot(options.db.mongooseOptions.uri, options.db.mongooseOptions.options));
        } else if (options.db?.type === 'sql' && options.db.typeormOptions) {
            imports.push(TypeOrmModule.forRoot(options.db.typeormOptions));
        }

        // Cache

        return {
            module: NestJsBatteries,
            imports,
        };
    }
}