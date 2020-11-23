/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ILoginInfo, INewBlogPost } from "../types";
import { isNumber, isObjectContainingLoginField, isString } from "./typeguards";
import { validationError } from "./utils";

export const parseLoginInfo = (object: any): ILoginInfo => {
  return {
    username: parseString(object.username),
    password: parseString(object.password)
  };
};

export const parseNewBlog = (object: any): INewBlogPost => {
  return {
    title: parseString(object.title),
    content: parseString(object.content)
  };
};

export const parseLoginCookie = (object: any): string | null => {
  if (isObjectContainingLoginField(object) && isString(object.login)) {
    return object.login;
  } else return null;
};

export const parseString = (object: unknown): string => {
  if (object && isString(object)) return object;
  else throw validationError();
};

export const parseNumber = (object: unknown): number => {
  if (object && isNumber(object)) return object;
  else throw validationError();
};