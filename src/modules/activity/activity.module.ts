import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   ...appLogOptions,
    //   name: 'appLogOptions',
    // }),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
