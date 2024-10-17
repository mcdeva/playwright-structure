import { APIRequestContext, expect } from '@playwright/test';
import * as common from './common';

// send request
export async function getRequest(
  request: APIRequestContext,
  url: string,
  headers: Record<string, string> = {}
) {
  console.log('================ GET Request =================');
  console.log(`URL: ${url}`);
  console.log(`Headers: ${JSON.stringify(headers, null, 2)}`);
  console.log('------------------------------------------------');

  const response = await request.post(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  console.log(`Response Status: ${response.status()}`);
  const responseBody = await response.json();
  console.log(`Response Body: ${JSON.stringify(responseBody, null, 2)}`);
  console.log('================================================\n');
  return response;
}

export async function postRequest(
  request: APIRequestContext,
  url: string,
  data: any,
  headers: Record<string, string> = {}
) {
  console.log('================ POST Request =================');
  console.log(`URL: ${url}`);
  console.log(`Headers: ${JSON.stringify(headers, null, 2)}`);
  console.log(`Body: ${JSON.stringify(data, null, 2)}`);
  console.log('------------------------------------------------');

  const response = await request.post(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data,
  });

  console.log(`Response Status: ${response.status()}`);
  const responseBody = await response.json();
  console.log(`Response Body: ${JSON.stringify(responseBody, null, 2)}`);
  console.log('================================================\n');
  return response;
}

// validate
export function validateStatusCode(response: any, expectedStatus: number = 200) {
  expect(response.status()).toBe(expectedStatus);
}

export async function validateKeyHasValue(response: any, key: string, expectedValue: any) {
  const responseBody = await response.json();
  const actualValue = common.getValueFromKey(responseBody, key);
  if (actualValue !==  expectedValue) {
    throw new Error(`Validation failed: Expected value: \`${expectedValue}\`, but got: \`${actualValue}\`.`)
  }
}