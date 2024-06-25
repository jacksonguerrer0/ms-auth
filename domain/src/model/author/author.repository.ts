import { AuthorEntity } from "./author.entity";

export interface IAuthorRepository {
  getAuthor(): Promise<AuthorEntity>
}
