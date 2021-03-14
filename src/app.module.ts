import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TorNodeModule } from './tor-node/tor-node.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/desafio-db'), TorNodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
