import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Rechaza requests con propiedades extras
    transform: true, // Transforma automáticamente los tipos
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
