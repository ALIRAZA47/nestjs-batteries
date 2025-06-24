
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface NestJsBatteriesOptions {
    auth?: {
        jwtModuleOptions: JwtModuleOptions;
    };
    db?: {
        type: 'mongo' | 'sql';
        mongooseOptions?: {
            uri: string,
            options: MongooseModuleOptions;
        }
        typeormOptions?: TypeOrmModuleOptions;
    };
}
