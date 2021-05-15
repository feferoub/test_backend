import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// require('@google-cloud/debug-agent').start({
//   serviceContext: { enableCanary: true },
// });

// test

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
