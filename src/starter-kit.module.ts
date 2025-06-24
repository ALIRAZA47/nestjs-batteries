import { Module, DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { StarterKitConfig } from './starter-kit.config';

@Global()
@Module({})
export class StarterKitModule {
  static forRoot(config: StarterKitConfig): DynamicModule {
    const dbModule =
      config.db.type === 'mongo'
        ? MongooseModule.forRoot(config.db.uri)
        : TypeOrmModule.forRoot(config.db);

    const cacheProvider = config.cache?.type === 'redis'
      ? CacheModule.register({
          store: redisStore,
          host: config.cache.host,
          port: config.cache.port,
          ttl: config.cache.ttl || 60,
        })
      : CacheModule.register();

    return {
      module: StarterKitModule,
      imports: [
        dbModule,
        JwtModule.register({
          secret: config.auth.jwtSecret,
          signOptions: { expiresIn: config.auth.expiresIn },
        }),
        cacheProvider,
      ],
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
    };
  }
}