
export interface User {
  id?: string;
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  isASL: boolean,
  isTOFSAccepted: boolean,
}

export interface Error {
  message: string;
  code: string;
} 