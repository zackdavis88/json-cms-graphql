export type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  message: string;
  user: {
    username: string;
    displayName: string;
    createdOn: string;
  };
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
    body?: unknown, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any>;

  createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.call('POST', '/users', request)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}

export default ApiWrapper;
