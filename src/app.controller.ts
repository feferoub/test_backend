import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisCacheService } from './redis/redisCache.service';
const { PubSub } = require('@google-cloud/pubsub');
const process = require('process');

const pubsub = new PubSub();

const { PUBSUB_VERIFICATION_TOKEN, PUBSUB_TOPIC } = process.env;
const topic = pubsub.topic(PUBSUB_TOPIC);

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  private count: number = 0;

  @Get('/')
  async getDefault(): Promise<string> {
    // used by kubernetes health check
    return this.appService.getHello();
  }

  @Get('set/:key/:value')
  async getHello(
    @Param('key') key: string,
    @Param('value') value: string,
  ): Promise<string> {
    console.log('Call process number:', this.count);
    this.count = this.count + 1;
    await this.redisCacheService.set(key, value);
    return this.appService.getHello();
  }

  @Get('object')
  async getObject(): Promise<string> {
    const value = await this.redisCacheService.get('test');
    this.count = this.count + 1;
    return this.appService.getHello();
  }

  @Get('get/:key')
  async getObj(@Param('key') key: string): Promise<Record<string, string>> {
    console.log('Call process number:', this.count);
    const value = await this.redisCacheService.get(key);
    this.count = this.count + 1;
    return { data: value };
  }

  @Get('push-pub-sub')
  async push(): Promise<string> {
    try {
      const data = Buffer.from('coucou');
      const messageId = await topic.publish(data);
      console.log(`Message ${messageId} sent.`);
      return 'success';
    } catch (error) {
      console.log(error);
      return 'failed';
    }
  }
}
