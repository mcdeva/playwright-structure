import { test, expect, request } from '@playwright/test';
import * as data from '../../config/QA.json';
import * as api from "../../asset/common-api";
import * as common from "../../asset/common";

const apiLogin = "/tmpauthentication-qa/api/login";

test('test', async ({ request }) => {
  const url = `${data.url}${apiLogin}`;
  const jsonBody = {
    email: "rukpong.r@arcadiaapm.com",
    password: "Tmp1234!"
  };

  const response = await api.postRequest(request, url, jsonBody);
  api.validateStatusCode(response, 200);
  const responseBody = await response.json();
  common.validateKeyContains(responseBody, "data.loginToken");
  api.validateKeyHasValue(response, "data.user.firstName", "Rukpong");
});