import { HOSTNAME, PORT, PROTOCOL } from '../config/api.js';
import { ApolloContext } from '../middleware/context.js';
import ApiWrapper, {
  HttpMethods,
  HttpOptions,
  ApiError,
  ApiErrorResponse,
} from './types.js';
import fetch from 'node-fetch';

class ApiClient extends ApiWrapper {
  protected req: ApolloContext['req'];
  protected url: string;

  constructor(req: ApolloContext['req']) {
    super();
    this.req = req;
    this.url = `${PROTOCOL}://${HOSTNAME}:${PORT}`; // This will not work outside of local development, which is probably as far as this project will ever go.
  }

  protected call(
    method: HttpMethods,
    path: string,
    options?: HttpOptions,
    body?: unknown,
  ) {
    const fullUrl = `${this.url}${path}`;

    const authHeader = this.req.headers['x-auth-token'];
    let authToken = '';
    if (Array.isArray(authHeader)) {
      authToken = authHeader[0];
    } else if (authHeader) {
      authToken = authHeader;
    }

    const includeBody = method !== 'GET' && body;

    const authBasicHeader = options && options.headers && options.headers['x-auth-basic'];
    return fetch(fullUrl, {
      method,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': authToken,
        'x-auth-basic': authBasicHeader || '',
      },
      body: includeBody ? JSON.stringify(body) : undefined,
    })
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (!response.ok) {
          throw new ApiError(jsonResponse as ApiErrorResponse);
        }

        const authToken = response.headers.get('x-auth-token');
        if (authToken) {
          return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(jsonResponse as any),
            authToken: authToken,
          };
        }
        return jsonResponse;
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default ApiClient;
