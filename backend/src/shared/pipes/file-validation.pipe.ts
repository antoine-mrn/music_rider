import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly maxSize = 5 * 1024 * 1024; // 5 MO
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    if (!this.allowedMimeTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `Type de fichier non autorisé. Types acceptés : ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `Fichier trop volumineux. Taille maximum : 5 MB`,
      );
    }

    return value;
  }
}
