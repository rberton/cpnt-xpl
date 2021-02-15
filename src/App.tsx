import React from 'react'
import logo from './logo.svg'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Authentification from './features/authentification/Authentification'
import {
  K64,
  K64Header,
  K64Logo,
  K64Main,
} from './styled-components'

function App() {
  return (
    <K64>
      <K64Header>
        <K64Logo src={logo} alt="logo" />
      </K64Header>
      <K64Main>
        <Router>
          <Switch>
              <Route exact path="/">
                <Authentification options={{known: true}}/>
              </Route>
              <Route exact path="/signup">
                <Authentification options={{known: false}}/>
              </Route>
          </Switch>
        </Router>
      </K64Main>
    </K64>
  )
}

export default App
