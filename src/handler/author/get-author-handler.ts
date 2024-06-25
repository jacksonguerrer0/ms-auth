import { Inject, Injectable } from '@nestjs/common';
import { AuthorEntity } from 'domain/src/model/author/author.entity';
import { GetAuthorUsecase } from 'domain/src/usecase/author/get-author.usecase';

@Injectable()
export class HandlerGetAuthor {
  constructor(
    @Inject('GetAuthorUsecase')
    private readonly getAuthorUseCase: GetAuthorUsecase,
  ) {}

  async execute(): Promise<AuthorEntity> {
    const result = await this.getAuthorUseCase.apply();
    return result;
  }
}
