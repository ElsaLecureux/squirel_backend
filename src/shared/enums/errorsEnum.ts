export enum Errors {
  INVALID_EMAIL = 'Invalid email address. Please enter a valid email.',
  INVALID_PASSWORD = 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character.',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  USER_NOT_FOUND = 'User not found',
  INVALID_CREDENTIALS = 'Invalid credentials',
  USERNAME_ALREADY_EXIST = 'This username is already used, please choose a different one',
  EMAIL_ALREADY_EXIST = 'This email is already used, please enter a different one or ask for a password reset',
  MISSING_REQUIRED_FIELD = 'Missing required field(s).',
  DATA_NOT_FOUND = 'No Data found',
}
