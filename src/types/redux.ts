export type DataErrorFiltered = {
  path: string;
  message: string;
};

export type DataErrorAPI = {
  errors: DataErrorFiltered[];
};

export type DataError = {
  status: 'FETCH_ERROR';
  data: {
    errors: DataErrorFiltered[];
  };
};