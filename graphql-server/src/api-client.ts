import { HOSTNAME, PORT, PROTOCOL } from './config/api.js';
import { TerraformerContext } from './middleware/context.js';

type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

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

class ApiClient extends ApiWrapper {
  protected req: TerraformerContext['req'];
  protected url: string;

  constructor(req: TerraformerContext['req']) {
    super();
    this.req = req;
    this.url = `${PROTOCOL}://${HOSTNAME}:${PORT}`; // This will not work outside of local development, which is probably as far as this project will ever go.
  }

  protected call(method: HttpMethods, path: string, body?: unknown) {
    const fullUrl = `${this.url}${path}`;

    const authHeader = this.req.headers['x-auth-token'];
    let authToken = '';
    if (Array.isArray(authHeader)) {
      authToken = authHeader[0];
    } else if (authHeader) {
      authToken = authHeader;
    }

    const includeBody = method !== 'GET';

    return fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authToken,
      },
      body: includeBody ? JSON.stringify(body) : undefined,
    })
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (!response.ok) {
          throw new ApiError(jsonResponse as ApiErrorResponse);
        }

        return jsonResponse;
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default ApiClient;
