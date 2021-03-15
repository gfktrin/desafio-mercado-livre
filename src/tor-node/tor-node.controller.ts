import { Controller, Get } from '@nestjs/common';
import { TorNodeService } from './tor-node.service';

@Controller('tor-node')
export class TorNodeController {
  constructor(private service: TorNodeService) {}

  @Get('/getips')
  get() {
    return this.service.getIps();
  }
}
