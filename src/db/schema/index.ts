import * as usersSchema from "./users";
import * as sessionsSchema from "./sessions";
import * as reportsSchema from "./reports";


export const schema = {
  ...usersSchema,
  ...sessionsSchema,
  ...reportsSchema,
};


export * from './users';
export * from './sessions';
export * from './reports';