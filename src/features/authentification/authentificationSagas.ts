import { takeLatest, call, put, all, select, delay } from 'redux-saga/effects'
// import Client from '../api/client'
import { IErrorsPayload, User } from './authentificationDefinition'
import { selectUser } from './authentificationSelectors'
import { actions } from './authentificationSlice'
import _ from 'lodash'

function* validateLogin(user: User) {
  return [
    yield call(isNotEmpty, user.surname),
    yield call(isNotEmpty, user.password),
  ].every(test => !!test)
}

function* sendLoginErrors(user: User) {
  const loginErrors: IErrorsPayload = { payload: { items: [
    {label: 'surname', error: !isNotEmpty(user.surname) ? 'This field is required' : ''},
    {label: 'email', error: !isNotEmpty(user.password) ? 'This field is required' : ''},
  ].filter(item => item.error !== '') } }
  yield put(actions.failureLogin(loginErrors.payload))
}

function* login() {
  try {
    const user = yield select(selectUser)
    const isValid: boolean = yield validateLogin(user)
    yield delay(1000)
    isValid ? yield put(actions.successLogin()) : yield* sendLoginErrors(user)
  } catch(e) {
    yield put(actions.failureLogin(e))
  }
}

function* logout() {
  try {
    const user = yield select(selectUser)
    delay(1000)
    yield put(actions.successLogout(user))
  } catch(e) {
    yield put(actions.failureLogout(e))
  }
}

function isEmail(value?: string): boolean {
  return !!value && /(.)*@(.)*\.(.)*/.test(value)
}

function isNotEmpty(value?: string): boolean {
  return !!value && _.trim(value) !== ""
}

function isNotEmptyAndEqual(pair?: [string|undefined, string|undefined]): boolean {
  return !!pair && !!pair[0] && !!pair[1] && _.trim(pair[0]) !== "" && _.trim(pair[1]) !== "" && pair[0] === pair[1]
}

function* validateSignup(user: User) {
  return [
    yield call(isNotEmpty, user.firstname),
    yield call(isNotEmpty, user.lastname),
    yield call(isNotEmpty, user.surname),
    yield call(isNotEmpty, user.email),
    yield call(isEmail, user.email),
    yield call(isNotEmptyAndEqual, [user.password, user.confirm])
  ].every(test => !!test)
}

function* sendSignupErrors(user: User) {
  const signupErrors: IErrorsPayload = { payload: { items: [
    {label: 'firstname', error: !isNotEmpty(user.firstname) ? 'This field is required' : ''},
    {label: 'lastname', error: !isNotEmpty(user.lastname) ? 'This field is required' : ''},
    {label: 'surname', error: !isNotEmpty(user.surname) ? 'This field is required' : ''},
    {label: 'email', error: !isNotEmpty(user.email) ? 'This field is required' : ''},
    {label: 'email', error: !isEmail(user.email) ? 'This field need to be a valid email' : ''},
    {label: 'password', error: !isNotEmptyAndEqual([user.password, user.confirm]) ? 'Email and Confirm fields need to be equals' : ''},
  ].filter(item => item.error !== '') } }
  yield put(actions.failureSignup(signupErrors.payload))
}

function* signup() {
  try {
    const user: any = yield select(selectUser)
    const isValid: boolean = yield validateSignup(user)
    yield delay(1000)
    isValid ? yield put(actions.successSignup()) : yield* sendSignupErrors(user)
  } catch(e) {
    yield put(actions.failureSignup(e))
  }
}

export function* saga() {
  yield all([
    yield takeLatest(actions.login.type, login),
    yield takeLatest(actions.logout.type, logout),
    yield takeLatest(actions.signup.type, signup),
  ])

}
