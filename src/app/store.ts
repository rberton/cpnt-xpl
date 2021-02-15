import createSagaMiddleware from 'redux-saga'
import { createInjectorsEnhancer/*, forceReducerReload*/ } from 'redux-injectors'
import { configureStore/*, ThunkAction, Action*/, Store } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'

import createReducer from './reducers'

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// })

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >

export default function configureAppStore() {
  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const { run: runSaga } = sagaMiddleware

  const store: Store = configureStore({
    reducer: createReducer(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: [
      createInjectorsEnhancer({
        createReducer,
        runSaga
      })
    ]
  })

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     forceReducerReload(store);
  //   })
  // }

  return store
}
