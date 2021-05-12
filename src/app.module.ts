import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisCacheModule } from './redis/redisCache.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
