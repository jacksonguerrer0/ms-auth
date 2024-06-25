import { Module } from '@nestjs/common';
import { IAuthorRepository } from 'domain/src/model/author/author.repository';
import { GetAuthorUsecase } from 'domain/src/usecase/author/get-author.usecase';
import { AuthorController } from 'src/adapters/in/http/author/author.controller';
import { DriverRepositoryModule } from 'src/adapters/out/postgres/driver-repository-module';
import { AuthorRepository } from 'src/adapters/out/postgres/repositories/author.repository';
import { HandlerGetAuthor } from 'src/handler/author/get-author-handler';

@Module({
  imports: [DriverRepositoryModule],
  providers: [
    {
      provide: HandlerGetAuthor,
      useFactory: (usecase: GetAuthorUsecase) => new HandlerGetAuthor(usecase),
      inject: [GetAuthorUsecase],
    },
    {
      provide: GetAuthorUsecase,
      useFactory: (repository: IAuthorRepository) =>
        new GetAuthorUsecase(repository),
      inject: [AuthorRepository],
    },
  ],
  controllers: [AuthorController],
})
export class AuthorModule {}
