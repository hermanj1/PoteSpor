import * as usersSchema from "./users";
import * as sessionsSchema from "./sessions";

export const schema = {
  ...usersSchema,
  ...sessionsSchema,
};


export * from './users';
export * from './sessions';