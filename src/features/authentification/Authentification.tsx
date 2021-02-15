import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import useAuthentification from './useAuthentification';
import { Status, Errors, IOptions } from './authentificationDefinition'
import { actions } from './authentificationSlice'
import { Grid, Paper, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import {
  K64ConnectionForm,
  K64TextField,
  K64Button,
  K64Link,
  K64Loop,
} from '../../styled-components'

const Authentification: React.FC<IOptions> = ({ options }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { connected, known, status, user, errors } = useAuthentification({ options })

  return (
    <Paper elevation={3}>

      {/* Écran de login */}
      
      {((status === Status.idle || status === Status.failed) && known && connected === false) &&
      <K64ConnectionForm
        noValidate
        autoComplete="off"
        onSubmit={(event) => dispatch(actions.login())}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <K64TextField
              name="surname"
              label={"Surname"}
              value={user.surname}
              onChange={(event) => dispatch(actions.setSurname({ surname: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "surname")}
              helperText={errors.find((error: Errors) => error.label === "surname")?.error}
            />
          </Grid>
          <Grid item>
            <K64TextField
              type="password"
              name="password"
              label={"Password"}
              value={user.password}
              onChange={(event) => dispatch(actions.setPassword({ password: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "password")}
              helperText={errors.find((error: Errors) => error.label === "password")?.error}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <K64Button type="submit">Login</K64Button>
            or
            <K64Link to={"/signup"}>Signup</K64Link>
          </Grid>
        </Grid>
      </K64ConnectionForm>
      }

      {/* Écran d'inscription */}
      
      {((status === Status.idle || status === Status.failed) && (!known && !connected)) &&
      <K64ConnectionForm
        noValidate
        autoComplete="off"
        onSubmit={(event) => dispatch(actions.signup())}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <K64TextField
              name="firstname"
              label={"Firstname"}
              value={user.firstname}
              onChange={(event) => dispatch(actions.setFirstname({ firstname: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "firstname")}
              helperText={errors.find((error: Errors) => error.label === "firstname")?.error}
            />
          </Grid>
          <Grid item>
            <K64TextField
              name="lastname"
              label={"Lastname"}
              value={user.lastname}
              onChange={(event) => dispatch(actions.setLastname({ lastname: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "lastname")}
              helperText={errors.find((error: Errors) => error.label === "lastname")?.error}
            />
          </Grid>
          <Grid item>
            <K64TextField
              name="surname"
              label={"Surname"}
              value={user.surname}
              onChange={(event) => dispatch(actions.setSurname({ surname: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "surname")}
              helperText={errors.find((error: Errors) => error.label === "surname")?.error}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <K64TextField
              type="email"
              name="email"
              label={"Email"}
              value={user.email}
              onChange={(event) => dispatch(actions.setEmail({ email: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "email")}
              helperText={errors.find((error: Errors) => error.label === "email")?.error}
            />
          </Grid>
          <Grid item>
            <K64TextField
              type="password"
              name="password"
              label={"Password"}
              value={user.password}
              onChange={(event) => dispatch(actions.setPassword({ password: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "password")}
              helperText={errors.find((error: Errors) => error.label === "password")?.error}
            />
          </Grid>
          <Grid item>
            <K64TextField
              type="password"
              name="confirm"
              label={"Confirm"}
              value={user.confirm}
              onChange={(event) => dispatch(actions.setConfirm({ confirm: event.target.value }))}
              error={!!errors.find((error: Errors) => error.label === "password")}
              helperText={errors.find((error: Errors) => error.label === "password")?.error}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <K64Button type="submit">Sign up</K64Button>
            or
            <K64Link to={"/"}>Login</K64Link>
          </Grid>
        </Grid>
      </K64ConnectionForm>
      }

      {/* Écran de déconnexion */}
      
      {status === Status.success && known && connected &&
      <K64ConnectionForm autoComplete="off" onSubmit={(event) => { dispatch(actions.logout(user)); history.push('/') }}>
        <Grid container>
          <Grid item>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <Typography variant="body1">User connected !</Typography>
            </Alert>
          </Grid>
          <Grid item>
            <K64Button type="submit">Logout</K64Button>
          </Grid>
        </Grid>
      </K64ConnectionForm>
      }

      {/* Chargement */}
      
      {status === Status.loading &&
      <K64Loop />
      }
    </Paper>
  )
}

export default Authentification
