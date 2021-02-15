import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IConfirmPayload,
  IEmailPayload,
  IErrorsPayload,
  IFirstnamePayload,
  IAuthentificationState,
  ILastnamePayload,
  ILogoutPayload,
  Mode,
  IPasswordPayload,
  Status,
  ISurnamePayload,
} from './authentificationDefinition'

/**
 * Initialisation
 */

const initialState: IAuthentificationState = {
  connection: false,
  known: true,
  mode: Mode.hybrid,
  status: Status.idle,
  user: {
    avatar: "",
    confirm: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    surname: "",
    token: ""
  },
  errors: []
}

/**
 * Slice
 */

const authentificationSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    failureLogin(state, payloadAction: IErrorsPayload): void {
      state.status = Status.failed

      payloadAction.payload.items.forEach(item => {

        if (!state.errors.find(error => error.label === item.label)) {
          state.errors = [...state.errors, {label: item.label, error: item.error}]

        } else {
          state.errors = state.errors.map(errorItem => {

            if (errorItem.label === item.label) {
              errorItem.error += ' ' + item.error
            }

            return errorItem
          })
        }
      })
    },
    failureLogout(state, payloadAction: IErrorsPayload): void {
      state.status = Status.failed
    },
    failureSignup(state, payloadAction: IErrorsPayload): void {
      state.status = Status.failed

      payloadAction.payload.items.forEach(item => {

        if (!state.errors.find(error => error.label === item.label)) {
          state.errors = [...state.errors, {label: item.label, error: item.error}]

        } else {
          state.errors = state.errors.map(errorItem => {

            if (errorItem.label === item.label) {
              errorItem.error += ' ' + item.error
            }

            return errorItem
          })
        }
      })
    },
    getLogin(state): void {
      state.known = true
      state.status = Status.idle
      state.errors = []
    },
    getSignup(state): void {
      state.known = false
      state.status = Status.idle
      state.errors = []
    },
    login(state): void {
      state.status = Status.loading
      state.errors = []
    },
    logout(state, payloadAction: ILogoutPayload): void {
      state.status = Status.loading
      state.errors = []
    },
    setConfirm(state, payloadAction: IConfirmPayload): void {
      const { confirm } = payloadAction.payload
      state.user.confirm = confirm
    },
    setEmail(state, payloadAction: IEmailPayload): void {
      const { email } = payloadAction.payload
      state.user.email = email
    },
    setFirstname(state, payloadAction: IFirstnamePayload): void {
      const { firstname } = payloadAction.payload
      state.user.firstname = firstname
    },
    setLastname(state, payloadAction: ILastnamePayload): void {
      const { lastname } = payloadAction.payload
      state.user.lastname = lastname
    },
    setPassword(state, payloadAction: IPasswordPayload): void {
      const { password } = payloadAction.payload
      state.user.password = password
    },
    setSurname(state, payloadAction: ISurnamePayload): void {
      const { surname } = payloadAction.payload
      state.user.surname = surname
    },
    signup(state): void {
      state.status = Status.loading
      state.errors = []
    },
    successLogin(state, payloadAction: PayloadAction): void {
      state.status = Status.success
      state.known = true
      state.connection = true
    },
    successLogout(state, payloadAction: ILogoutPayload): void {
      state.status = Status.idle
      state.known = true
      state.connection = false
    },
    successSignup(state, payloadAction: PayloadAction): void {
      state.status = Status.success
      state.known = true
      state.connection = true
    },
  }
})

export const { actions, name, reducer } = authentificationSlice

export default authentificationSlice.reducer
