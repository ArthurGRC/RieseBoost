import { log } from '@logtail/next';

export const handleSuccess = async (data: unknown | object, status: number, message: string) => {
  log.info(message);
  return { error: undefined, data, status };
};

export const handleBadRequest = async (data: unknown, message: string) => {
  const result = {
    error: {
      message: 'Bad Request',
    },
    data,
    status: 400,
  };
  log.error(message, result);

  return result;
};

export const handleUnprocessableEntity = async (data: any, path: string, message: string) => {
  const { errors } = data;
  const result = { error: errors, data, status: 422, path };
  log.error(message, result);
  return result;
};

export const handleUnauthorized = (data: unknown | object, message: string) => {
  const result = {
    error: {
      message: 'Unauthorized',
      ...(data as object),
    },
    data: undefined,
    status: 401,
  };

  log.error(message, result);

  return result;
};

export const handleServerError = (
  data: NonNullable<unknown>,
  status: number,
  headers: string,
  params: any,
  message: string,
) => {
  const error = {
    message: `Internal Server Error`,
    errors: {
      message,
      body: params,
      data,
      status,
      contentType: headers,
    },
  };

  log.error(message, { error });

  return { error, data: undefined, status };
};

export const handleResponse = async (
  { data, status, contentType }: { data: NonNullable<unknown> | unknown | object; status: number; contentType: string },
  path: string,
  logMessages: {
    success: string;
    badRequest: string;
    unProcessableEntity: string;
    unauthorized: string;
    serverError: string;
  } | null,
  params: object | null | string,
) => {
  const defaultLogMessages = {
    success: `POST - ${path} SUCCESS`,
    badRequest: `POST - ${path} BAD REQUEST`,
    unProcessableEntity: `POST - ${path} UNPROCESSABLE ENTITY`,
    unauthorized: `POST - ${path} UNAUTHORIZED`,
    serverError: `POST - ${path} INTERNAL SERVER ERROR`,
  };

  const { success, badRequest, unProcessableEntity, unauthorized, serverError } = logMessages || defaultLogMessages;

  switch (status) {
    case 200:
      return handleSuccess(data, status, success);
    case 201:
      return handleSuccess(data, status, success);
    case 400:
      return handleBadRequest(data, badRequest);
    case 401:
      return handleUnauthorized(data, unauthorized);
    case 422:
      return handleUnprocessableEntity(data, path, unProcessableEntity);
    default:
      return handleServerError(data as object, status, contentType, params, serverError);
  }
};
