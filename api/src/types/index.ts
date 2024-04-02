import User from "../models/User";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type generateTokensPayload = {
  id: number;
  name: string;
  email: string;
  roles: string[];
};

export type createOrUpdateTokensPayload = {
  userId: number;
  token: string;
};

export type RegisteredUserData = {
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
  };
  token: string;
};

// rename to Authtrntificated user
export type RegisteredUser = {
  data: RegisteredUserData;
  token: string;
};

export type addRoleToUserPayload = {
  role: string;
  userId: number;
};
