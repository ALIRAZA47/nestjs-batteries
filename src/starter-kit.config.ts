export interface StarterKitConfig {
  auth: {
    jwtSecret: string;
    expiresIn: string;
  };
  db: 
    | { type: 'mongo'; uri: string }
    | {
        type: 'mysql' | 'postgres';
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        entities: any[];
        synchronize: boolean;
      };
  cache?: {
    type: 'redis' | 'memory';
    host?: string;
    port?: number;
    ttl?: number;
  };
}