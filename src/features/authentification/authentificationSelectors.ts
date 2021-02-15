import { RootState } from '../../index'

export const selectConnection = (state: RootState) => state.authentification.connection
export const selectKnown = (state: RootState) => state.authentification.known
export const selectStatus = (state: RootState) => state.authentification.status
export const selectUser = (state: RootState) => state.authentification.user
export const selectErrors = (state: RootState) => state.authentification.errors
