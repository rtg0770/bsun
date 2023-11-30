// Constants related to authentication errors

// Section
export const ERROR_TYPE_AUTH = 'AUTH';

// Codes
export const ERROR_CODE_NO_REQUIRED_PERMISSION_SPECIFIED = '0001';
export const ERROR_CODE_NO_REQUIRED_PERMISSIONS = '0002';
export const ERROR_CODE_UNKNOWN_TOKEN_TYPE = '0003';
export const ERROR_CODE_MISSING_AUTH_HEADER = '0004';
export const ERROR_CODE_INVALID_AUTH_FORMAT = '0005';
export const ERROR_CODE_TOKEN_EXPIRED_OR_INVALID = '0006';
export const ERROR_CODE_ACCESS_FORBIDDEN = '0007';
export const ERROR_CODE_INVALID_TOKEN_FORMAT = '0008';
export const ERROR_CODE_UNKNOWN_ERROR = '0009';
export const ERROR_CODE_VALIDATION_FAILED = '0010';

// Messages associated with the error codes above
export const ERROR_MESSAGE_NO_REQUIRED_PERMISSION_SPECIFIED = 'No required permission specified.';
export const ERROR_MESSAGE_NO_REQUIRED_PERMISSIONS = 'You do not have the required permissions.';
export const ERROR_MESSAGE_MISSING_AUTH_HEADER = 'Authorization header is missing.';
export const ERROR_MESSAGE_INVALID_AUTH_FORMAT = 'Invalid authorization format. Expected "Bearer <TOKEN>".';
export const ERROR_MESSAGE_TOKEN_EXPIRED_OR_INVALID = 'Token is expired or invalid.';
export const ERROR_MESSAGE_ACCESS_FORBIDDEN = 'Access is forbidden with the provided token.';
export const ERROR_MESSAGE_UNKNOWN_ERROR = 'Unknown error occurred during token validation.';
export const ERROR_MESSAGE_VALIDATION_FAILED = 'Application token validation failed.';
export const ERROR_MESSAGE_INVALID_TOKEN_FORMAT = 'Invalid token format.';
export const ERROR_MESSAGE_UNKNOWN_TOKEN_TYPE = 'Unknown token type.';

// Auth module and authorization server constants
export const USER_VALIDATE_ENDPOINT = '/user/validate';
export const APP_VALIDATE_ENDPOINT = '/app/validate';
export const TOKEN_TYPE_USER = 'user';
export const TOKEN_TYPE_APPLICATION = 'application';
