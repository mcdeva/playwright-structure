import { expect } from '@playwright/test';

export function getValueFromKey(obj: Record<string, any>, keyPath: string): any {
  const keys = keyPath.split('.');
  let currentValue = obj;

  for (const key of keys) {
    if (currentValue && key in currentValue) {
      currentValue = currentValue[key];
    } else {
      return null;
    }
  }
  return currentValue;
}

export function logToJson(obj: Record<string, any>) {
  console.log(JSON.stringify(obj, null, 2));
}

// validate
export function validateKeyContains(obj: Record<string, any>, key: string) {
  expect(obj).toHaveProperty(key);
}

export function validateJsonEqual(obj: Record<string, any>, expectedJson: Record<string, any>) {
  expect(obj).toEqual(expectedJson);
}