import { useEffect } from 'react'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { actions, name, reducer } from './authentificationSlice'
import { saga } from './authentificationSagas'
import { IAuthentificationHook, IOptions } from './authentificationDefinition'
import { useDispatch, useSelector } from 'react-redux';
import { selectConnection, selectKnown, selectStatus, selectUser, selectErrors } from './authentificationSelectors';

export default function useAuthentification({ options }: IOptions): IAuthentificationHook {
  useInjectReducer({key: name, reducer})
  useInjectSaga({key: name, saga})
  const dispatch = useDispatch()
  const connected = useSelector(selectConnection)
  const known = useSelector(selectKnown)
  const status = useSelector(selectStatus)
  const user = useSelector(selectUser)
  const errors = useSelector(selectErrors)

  useEffect(() => {
    if (options && !options.known) {
      dispatch(actions.getSignup())
    } else {
      dispatch(actions.getLogin())
    }
  }, [dispatch, options])

  return { connected, known, status, user, errors }
}
