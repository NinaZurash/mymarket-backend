// src/errorCodes.ts
export const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  [ERROR_CODES.BAD_REQUEST]:
    "The request could not be understood or was missing required parameters.",
  [ERROR_CODES.UNAUTHORIZED]:
    "Authentication failed or user does not have permissions for the requested operation.",
  [ERROR_CODES.FORBIDDEN]: "Access denied.",
  [ERROR_CODES.NOT_FOUND]: "Resource not found.",
  [ERROR_CODES.INTERNAL_SERVER_ERROR]:
    "An unexpected error occurred on the server.",
};
