import { type IncomingMessage, type ServerResponse } from 'http';
import { type BaseContext } from '@apollo/server';
import ApiClient from '../api-client.js';

export interface ApolloContext extends BaseContext {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  apiClient: ApiClient;
}

export const createContext = async ({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse;
}) => {
  const apiClient = new ApiClient(req);
  return {
    req,
    res,
    apiClient,
  };
};
