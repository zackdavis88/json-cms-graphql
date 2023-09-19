import { ApiError } from '../../api-client.js';

const handleError = (errorResponse: unknown) => {
  if (errorResponse instanceof ApiError && errorResponse.errorType) {
    return {
      error: {
        text: errorResponse.error,
        errorType: errorResponse.errorType,
      },
    };
  } else {
    return {
      error: { text: 'an unknown error occurred', errorType: 'FATAL' },
    };
  }
};

export default handleError;
