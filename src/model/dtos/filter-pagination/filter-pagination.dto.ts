import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  IFilterOptions,
  IPaginationOptions,
} from 'domain/src/common/commands/pagination.command';
import { PaginationOrderEnum } from 'domain/src/common/enum/pagination-order.enum';

export class FilterPaginationDTO implements IFilterOptions, IPaginationOptions {
  @IsOptional()
  @IsString({ each: true })
  filters?: string[];

  @IsOptional()
  @IsString({ each: true })
  values?: any[];

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsEnum(PaginationOrderEnum)
  order?: PaginationOrderEnum;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pageSize?: number;
}
