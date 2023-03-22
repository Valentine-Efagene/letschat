interface IUser {
  id: string,
  avatar: string,
  firstName: string,
  lastName: string,
  email: string,
  contacts: string[]
}

interface IAuthCredentials {
  email: string,
  password: string
}

export type { IUser, IAuthCredentials };
