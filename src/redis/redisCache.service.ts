import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key) {
    console.log('getting redis value...');
    return await this.cache.get(key);
  }

  async set(key, value) {
    console.log('setting redis value...');
    await this.cache.set(key, value);
  }
}
