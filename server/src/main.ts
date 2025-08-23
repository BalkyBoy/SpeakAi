import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000", // your React app
    credentials: true,               // allow cookies, auth headers
  });

  await app.listen(process.env.PORT ?? 5000); // backend on port 5000
}
bootstrap();
