export type Customer = {
  name?: string,
  email?: string,
  password?: string,
  roles?: string[],
  rememberMe?: string,
}

export type DataFiltered = {
  email?: {
    message: string;
  },
  password?: {
    message: string;
  },
  confirmPassword?: {
    message: string
  },
  token?: {
    message: string;
  }
};