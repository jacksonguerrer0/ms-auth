import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HandlerGetAuthor } from 'src/handler/author/get-author-handler';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@ApiTags('Author')
@Controller('v1/author')
export class AuthorController {
  constructor(private handlerGetAuthor: HandlerGetAuthor) {}

  @Get('/')
  @ApiOperation({ summary: 'Get author' })
  @HttpCode(200)
  async getAuthor(): Promise<HTTPResponse> {
    const result = await this.handlerGetAuthor.execute();

    return new HTTPResponse(
      HttpStatusMapper.OK.status,
      HttpStatusMapper.OK.message,
      result,
    );
  }
}
