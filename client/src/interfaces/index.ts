
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

export interface AudioInputToAPI {
  text: string,
  model_id?: string,
  voice_settings?: string,
  pronunciation_dictionary_locators?: string,
  seed?: string,
  previous_text?: string,
  next_text?: string,
  previous_request_ids?: string,
  next_request_ids?: string,
}