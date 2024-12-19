import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryRepository } from './cloudinary.repository';

@Module({
  imports: [],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryRepository],
  exports: [],
})
export class CloudinaryModule {}
