import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityService {
  findAll() {
    return `This action returns all activity`;
  }

  delete() {
    return `This action removes a activity`;
  }
}
