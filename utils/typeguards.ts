/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ILoginToken, IObjectContainingLoginField } from '../types';

export const isString = (object: unknown): object is string => {
  return (typeof object === 'string' || object instanceof String);
};

export const isNumber = (object: unknown): object is number => {
  return (typeof object === 'number' || object instanceof Number);
};

export const isLoginToken = (object: any): object is ILoginToken => {
  return (isString(object.username) && isString(object.name) && isNumber(object.id));
};

export const isObjectContainingLoginField = (object: any): object is IObjectContainingLoginField => {
  return Boolean(object && object.login);
};