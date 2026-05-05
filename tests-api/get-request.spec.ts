import  { test, expect } from '@playwright/test';
import { APIHelper } from '../utils/apiHelper';

test.describe('API testing with common function', () => {
  let api: APIHelper;

  test.beforeAll(async ({ playwright }) => {
    const requestContext = await playwright.request.newContext();
    api = new APIHelper(requestContext);
  });

  test('API001 GET - Retrieve user data success', async () => {
    const response = await test.step(`Send GET Request`, async () => {
      return await api.get('https://jsonplaceholder.typicode.com/users/1');
    });

    await test.step(`Verify API Response`, async () => {
      expect(response.status()).toBe(200);
      const responseBody = await response.json();;
      expect(responseBody.id).toBe(1);
      expect(responseBody).toHaveProperty('username');
      expect(responseBody.name).toBe('Leanne Graham');
      expect(responseBody.email).toBe('Sincere@april.biz');
    });
  });

  test('API002 POST - Create new user success', async () => {
    const payload = {
      name: 'Mac',
      job: 'QA Leader',
    };

    const response = await test.step(`Send POST Reqeust`, async () => {
      return await api.post('https://jsonplaceholder.typicode.com/users', payload);
    });

    await test.step(`Verify API Response`, async () => {
      expect(response.status()).toBe(201);
      const responseBody = await response.json();
      expect(responseBody.name).toBe('Mac');
      expect(responseBody).toHaveProperty('id');
      expect(responseBody).toHaveProperty('job');
    });
  });

  test('API003 PUT - Update user success', async () => {
    const updatePayload = {
      name: 'Mac',
      job: 'Senior QA Manager',
    };

    const response = await test.step(`Send PUT Reqeust`, async () => {
      return await api.put('https://jsonplaceholder.typicode.com/users/2', updatePayload);
    });

    await test.step(`Verify API Response`, async () => {
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody.job).toBe('Senior QA Manager');
    });
  });

  test('API004 DELETE - Remove user success', async () => {
    const response = await test.step(`Send DELETE Request`, async () => {
      return await api.delete('https://jsonplaceholder.typicode.com/users/2');
    });

    await test.step(`Verify API Response`, async () => {
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toEqual({});
    });
  });
});