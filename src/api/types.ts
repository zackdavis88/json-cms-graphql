export type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface HttpOptions {
  params?: {
    [key: string]: string;
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

interface PaginationData {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export interface GetUserRequest {
  username: string;
}

export interface GetUserResponse {
  message: string;
  user: User;
}

export interface GetUserListRequest {
  page?: number;
  itemsPerPage?: number;
}

export interface GetUserListResponse extends PaginationData {
  message: string;
  users: User[];
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

  getUser(request: GetUserRequest): Promise<GetUserResponse> {
    return this.call('GET', `/users/${request.username}`)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  getUserList({ page, itemsPerPage }: GetUserListRequest): Promise<GetUserListResponse> {
    const options: HttpOptions = {
      params: {
        page: typeof page === 'number' ? String(page) : '1',
        itemsPerPage: typeof itemsPerPage === 'number' ? String(itemsPerPage) : '10',
      },
    };

    return this.call('GET', '/users', options)
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
