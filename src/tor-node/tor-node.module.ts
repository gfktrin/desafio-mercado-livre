import { Module } from '@nestjs/common';
import { TorNodeService } from './tor-node.service';
import { TorNodeController } from './tor-node.controller';
import { TorNodeSchema } from './schemas/tor-node.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TorNode',
        schema: TorNodeSchema,
      },
    ]),
  ],
  providers: [TorNodeService],
  controllers: [TorNodeController],
})
export class TorNodeModule {}
