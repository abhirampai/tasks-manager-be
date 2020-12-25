import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: '*' });
  }


  const options = new DocumentBuilder()
  .setTitle('Task API')
  .setDescription('Api for task management application')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('doc',app,document)


  await app.listen(process.env.PORT||3999);
}
bootstrap();
