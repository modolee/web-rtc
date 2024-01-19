import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class BackController {
  @Get()
  sayHello() {
    return { message: 'Hello' };
  }
}
