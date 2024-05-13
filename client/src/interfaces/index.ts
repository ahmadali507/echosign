
export interface User {
  id?: string;
  username: string,
  email: string,
  photoUrl?: string;
  password: string,
  confirmPassword?: string,
  isASL?: boolean,
  isTOFSAccepted?: boolean,
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