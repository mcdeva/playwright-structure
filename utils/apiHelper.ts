import { APIRequestContext, APIResponse } from '@playwright/test';

export class APIHelper {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async sendRequest(method: string, endpoint: string, data?: any, customHeaders?: Record<string, string>): Promise<APIResponse> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...customHeaders,
    };

    const startTime = Date.now();
    logRequest(method.toUpperCase(), endpoint, headers, data);

    const response = await this.request.fetch(endpoint, {
      method: method,
      headers,
      data,
    });
    let responseBody = await response.text();
    try {
      responseBody = responseBody ? JSON.parse(responseBody) : {};
    } catch (e) { }

    const duration = Date.now() - startTime;
    logResponse(response, duration, responseBody);

    if (!response.ok()) {
      console.warn(`⚠️ [WARNING] API returned an error status: ${response.status()}`);
    }

    return response;
  }

  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.sendRequest('get', endpoint, undefined, headers);
  }

  async post(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.sendRequest('post', endpoint, data, headers);
  }

  async put(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.sendRequest('put', endpoint, data, headers);
  }

  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.sendRequest('delete', endpoint, undefined, headers);
  }
}

function logRequest(method: string, endpoint: string, headers: Record<string, string>, data? :any) {
  console.log('\n========== API REQUEST ==========');
  console.log(`${method} ${endpoint}`);
  console.log(`Headers:`, JSON.stringify(headers, null, 2));
  if (data) {
    console.log(`Body:`, JSON.stringify(data, null, 2));
  }
  console.log('==================================\n');
}

function logResponse(response: any, duration: number, responseBody: string) {
  console.log(`\n========== API RESPONSE ==========`);
  console.log(`Status: ${response.status()} ${response.statusText()} (${duration}ms)`);
  console.log(`Headers:`, JSON.stringify(response.headers(), null, 2));
  console.log(`Body:`, JSON.stringify(responseBody, null, 2));
  console.log('==================================\n');
}