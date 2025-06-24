# 🔋 NestJS Batteries

A drop-in NestJS module with built-in support for **JWT authentication** and **database integration** (MongoDB or SQL). Bring your own config, and we handle the rest.

[![npm version](https://badge.fury.io/js/%40yourorg%2Fnestjs-batteries.svg)](https://badge.fury.io/js/%40yourorg%2Fnestjs-batteries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

---

## 🚀 Features

- ✅ **Plug-and-play JWT Auth** - Zero-boilerplate authentication setup
- ✅ **Flexible Database Support** - Switch between MongoDB and SQL (TypeORM) seamlessly
- ✅ **Environment-aware** - Perfect for multi-environment deployments
- ✅ **TypeScript First** - Full type safety and IntelliSense support
- ✅ **Minimal Dependencies** - Lean by design, no unnecessary bloat
- ✅ **Test-friendly** - Easy mocking and stubbing for unit tests

---

## 📦 Installation

```bash
npm install @yourorg/nestjs-batteries
```

Or with Yarn:

```bash
yarn add @yourorg/nestjs-batteries
```

### 📌 Peer Dependencies

Install the appropriate database drivers based on your setup:

**For MongoDB:**
```bash
npm install @nestjs/mongoose mongoose
```

**For SQL databases:**
```bash
npm install @nestjs/typeorm typeorm

# Choose your database driver:
npm install mysql2      # MySQL
npm install pg          # PostgreSQL  
npm install sqlite3     # SQLite
npm install mssql       # SQL Server
```

**For JWT (always required if using auth):**
```bash
npm install @nestjs/jwt
```

---

## 🔧 Quick Start

Import and configure the module in your `AppModule`:

```typescript
import { Module } from '@nestjs/common';
import { NestJsBatteriesModule } from '@yourorg/nestjs-batteries';

@Module({
  imports: [
    NestJsBatteriesModule.forRoot({
      auth: {
        jwtModuleOptions: {
          secret: process.env.JWT_SECRET || 'your-secret-key',
          signOptions: { expiresIn: '1d' }
        }
      },
      db: {
        type: 'mongo',
        mongooseOptions: {
          uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
          options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        }
      }
    })
  ],
})
export class AppModule {}
```

---

## 📚 Usage Examples

### 1. 🗃️ SQL Database (PostgreSQL) + JWT Authentication

```typescript
NestJsBatteriesModule.forRoot({
  auth: {
    jwtModuleOptions: {
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' }
    }
  },
  db: {
    type: 'sql',
    typeormOptions: {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development'
    }
  }
});
```

### 2. 🔐 JWT Authentication Only (No Database)

Perfect for microservices that only handle authentication:

```typescript
NestJsBatteriesModule.forRoot({
  auth: {
    jwtModuleOptions: {
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' }
    }
  }
});
```

### 3. 🛢️ Database Only (No Authentication)

Ideal for data-only services:

```typescript
NestJsBatteriesModule.forRoot({
  db: {
    type: 'sql',
    typeormOptions: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
    }
  }
});
```

### 4. 📊 MongoDB with Custom Options

```typescript
NestJsBatteriesModule.forRoot({
  auth: {
    jwtModuleOptions: {
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: '24h',
        issuer: 'your-app-name'
      }
    }
  },
  db: {
    type: 'mongo',
    mongooseOptions: {
      uri: process.env.MONGODB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeou