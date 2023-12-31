export type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface HttpOptions {
  params?: {
    [key: string]: string | number;
  };
  headers?: {
    [key: string]: string;
  };
}

interface User {
  username: string;
  displayName: string;
  createdOn: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export interface GenerateTokenResponse {
  message: string;
  user: User;
  authToken: string;
}

export interface AuthenticateTokenResponse {
  message: string;
  user: User;
}

export interface ApiErrorResponse {
  error: string;
  errorType: string;
}

export class ApiError extends Error {
  error: string;
  errorType: string;

  constructor(err: ApiErrorResponse) {
    super();
    this.error = err.error;
    this.errorType = err.errorType;
  }
}

abstract class ApiWrapper {
  protected abstract call(
    method: HttpMethods,
    path: string,
    options?: HttpOptions,
    body?: unknown, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any>;

  createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.call('POST', '/users', {}, request)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  generateToken(authorizationHeader: string): Promise<GenerateTokenResponse> {
    const options = {
      headers: {
        'x-auth-basic': authorizationHeader,
      },
    };
    return this.call('GET', '/auth', options)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  authenticateToken(authToken: string): Promise<AuthenticateTokenResponse> {
    const options = {
      headers: {
        'x-auth-token': authToken,
      },
    };
    return this.call('GET', '/auth/token', options)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}

export default ApiWrapper;
