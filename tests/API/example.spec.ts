import { test, expect, request } from '@playwright/test';
import * as data from '../../data/QA.json';
import * as api from "../../utils/common-api";
import * as common from "../../utils/common";

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