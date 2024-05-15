
export interface User {
  _id?: string;
  firstName?: string, // TODO: remove ?
  lastName?: string,  // TODO: remove ?
  bio?: string,  // TODO: remove ?
  photoUrl?: string;
  username: string,
  email: string,
  password: string,
  confirmPassword?: string,

  isASL?: boolean,
  isTOFSAccepted?: boolean,

  friends?: string[],
  sentRequests?: string[],
  receivedRequests?: string[],
  notifications?: string[],

  mutualFriends?: number, // Frontend property
}

export interface Error {
  message: string;
  code: string;
}

export interface ContactData {
  name: string,
  email: string,
  subject: string,
  message: string

}