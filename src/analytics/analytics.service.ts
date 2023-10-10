import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { VideoService } from 'src/video/video.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly videoService: VideoService, private readonly emailService: EmailService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_10AM) // 매일 오전 10시 마다
  @Cron(CronExpression.EVERY_MINUTE) // 1분 마다 (테스트용)
  async handleEmailCron() {
    Logger.log('Email task called');
    // const videos = await this.videoService.findTop5Download();
    // this.emailService.send(videos);
  }
}
