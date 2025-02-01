import {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PrismaExceptionHandler {
  static handle(error: any) {
    console.error('Erro Prisma:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const messagesByCode = {
        P2002: 'Registro já existe com este valor único.',
        P2003: 'Violação de chave estrangeira (@relation).',
        P2025: 'Registro não encontrado.',
        default: 'Erro não mapeado',
      };

      const allMessageData: Array<string> = [];

      const specificErrorMessage =
        messagesByCode[error.code] || messagesByCode.default;

      allMessageData.push(specificErrorMessage as string);

      if (error?.meta?.target) {
        const errorTarget = (error?.meta?.target as Array<string>).join(', ');
        allMessageData.push(`Verificar: ${errorTarget}`);
      }

      if (error?.meta?.field_name) {
        // const errorTarget = (error?.meta?.target as Array<string>).join(', ');
        allMessageData.push(
          `Verificar campo: ${error?.meta?.field_name as string}`,
        );
      }

      throw new BadRequestException(allMessageData);
    }

    throw new InternalServerErrorException('Erro interno');
  }
}
