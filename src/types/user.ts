export type User = {
  name?: string,
  email?: string,
  password?: string,
  roles?: string[],
}

export type DataFiltered = {
  email?: {
    message: string;
  },
  password?: {
    message: string;
  },
};