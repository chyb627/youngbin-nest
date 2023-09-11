import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    this.logger.log(ip);
    console.log(this.configService.get<string>('ENVIRONMENT'));
    return this.appService.getHello();
    // throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
  }
}
