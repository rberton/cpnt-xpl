export enum Mode {
  form = "FORM",
  hybrid = "HYBRID",
  info = "INFO",
}

export enum Status {
  idle = "IDLE",
  loading = "LOADING",
  success = "SUCCESS",
  failed = "FAILED",
}

export interface IEmailPayload {
  payload: {
    email: string
  }
}

export interface IFirstnamePayload {
  payload: {
    firstname: string
  }
}

export interface ILastnamePayload {
  payload: {
    lastname: string
  }
}

export interface ILogoutPayload {
  payload: {
    user: any
  }
}

export interface ISurnamePayload {
  payload: {
    surname: string
  }
}

export interface IPasswordPayload {
  payload: {
    password: string
  }
}

export interface IConfirmPayload {
  payload: {
    confirm: string
  }
}

export type Errors = {
  label: string,
  error: string
}

export interface IErrorsPayload {
  payload: {
    items: Errors[]
  }
}

export type User = {
  avatar?: string,
  confirm?: string,
  email?: string,
  firstname?: string,
  lastname?: string,
  password?: string,
  surname?: string,
  token?: string,
}

export interface IAuthentificationState {
  connection: boolean
  known: boolean
  mode: Mode
  status: Status
  user: User
  errors: Errors[]
}

export interface IAuthentificationHook {
  connected: any
  known: any
  status: any
  user: any
  errors: any
}

export interface IOptions {
  options?: {
    known?: boolean
  }
}
