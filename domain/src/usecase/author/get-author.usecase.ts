import { AuthorEntity } from 'domain/src/model/author/author.entity';
import { IAuthorRepository } from 'domain/src/model/author/author.repository';

export class GetAuthorUsecase {
  constructor(private authorRepository: IAuthorRepository) {}

  async apply(): Promise<AuthorEntity> {
    return this.authorRepository.getAuthor();
  }
}
