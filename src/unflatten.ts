import { place } from "./place.ts";

export const unflatten = (values: { [key: string]: any }): any => {
  let response: any = {};
  for (const [key, value] of Object.entries(values)) {
    place(value, response, key);
  }
  return response;
};
