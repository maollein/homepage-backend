/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ILoginInfo, INewBlog } from "../types";
import { isNumber, isString } from "./typeguards";
import { validationError } from "./utils";

export const parseLoginInfo = (object: any): ILoginInfo => {
  return {
    username: parseString(object.username),
    password: parseString(object.password)
  };
};

export const parseNewBlog = (object: any): INewBlog => {
  return {
    title: parseString(object.title),
    content: parseString(object.content)
  };
};

export const parseString = (object: unknown): string => {
  if (object && isString(object)) return object;
  else throw validationError();
};

export const parseNumber = (object: unknown): number => {
  if (object && isNumber(object)) return object;
  else throw validationError();
};