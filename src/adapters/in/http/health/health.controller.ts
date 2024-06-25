import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HandlerGetServerHealth } from 'src/handler/health/get-server-health.handler';
import { HTTPResponse } from 'src/model/http/response';
import { HttpStatusMapper } from 'src/model/mappers/http/http-status-mapper';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private handlerGetServerHealth: HandlerGetServerHealth) {}

  @Get('/')
  @ApiOperation({ summary: 'Get server health' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Server is running' })
  @ApiResponse({ status: 500, description: 'Server is down' })
  async getServerHealth(): Promise<HTTPResponse<string>> {
    const result = this.handlerGetServerHealth.execute();
    if (!result) throw new Error('Server is down');

    return new HTTPResponse(HttpStatusMapper.OK.status, 'Server is running');
  }
}
