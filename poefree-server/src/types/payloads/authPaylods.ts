export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};
