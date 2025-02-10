export const UNAUTHORIZED_ERROR = {
  message: 'Usuário não autorizado',
  path: 'unauthorized',
};

export const INCORRECT_PASSWORD = {
  message: 'Senha incorreta, tente novamente',
  path: 'password',
};

export const NOT_FOUND_USER = {
  message: 'Usuário não encontrado ou inexistente',
  path: 'email',
};

export const JWT_TOKEN_ERRORS: any = {
  ['TokenExpiredError']: {
    message: 'Token expirado',
    path: 'token',
  },
  ['JsonWebTokenError']: {
    message: 'Token inválido',
    path: 'token',
  }
}

export const NOT_FOUND_TOKEN = {
  message: 'Token não encontrado',
  path: 'token',
};

export const UNEXPECTED_ERROR = {
  path: 'unknown', 
  message: 'Um erro inesperado aconteceu. Contate o suporte'
}

export const PASSWORD_NOT_EQUAL = {
  path: 'confirmPassword',
  message: 'A senha preeenchida não é igual'
}