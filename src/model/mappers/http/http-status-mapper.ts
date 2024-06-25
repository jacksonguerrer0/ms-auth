import { HttpStatus } from '@nestjs/common';

export const HttpSuccesMapper = {
  OK: {
    status: HttpStatus.OK,
    message: 'The request has succeeded.',
  },
  CREATED: {
    status: HttpStatus.CREATED,
    message:
      'The request has been fulfilled and resulted in a new resource being created.',
  },
};

export const HttpFailureMapper = {
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    message: 'The request could not be understood by the server.',
  },
  UNAUTHORIZED: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'The request requires user authentication.',
  },
  FORBIDDEN: {
    status: HttpStatus.FORBIDDEN,
    message:
      'The server understood the request, but is refusing to fulfill it.',
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: 'The server has not found anything matching the Request-URI.',
  },
  INTERNAL_SERVER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message:
      'The server encountered an unexpected condition which prevented it from fulfilling the request.',
  },
};

export const HttpStatusMapper = { ...HttpFailureMapper, ...HttpSuccesMapper };
