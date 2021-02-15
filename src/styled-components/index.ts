import styled, { keyframes } from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Loop } from '@material-ui/icons'

export const K64 = styled.article`
  background: #293327;
  text-align: center;
`

export const K64Header = styled.header`
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  background: white;
`

const logoFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px)
  }
  100% {
    transform: translateY(0px)
  }
`

export const K64Logo = styled.img`
  height: 5vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${logoFloat} infinite 3s ease-in-out;
  }
`

export const K64Main = styled.main`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const K64ConnectionForm = styled.form`
  padding: .5rem;
`

export const K64TextField = styled(TextField)`
  &.MuiFormControl-root {
    margin: .5rem;
  }
  label.Mui-focused {
    color: #764abc;
  }
  .Mui-focused .MuiInput-underline:after {
    border-bottom-color: #764abc;
  }
`

export const K64Button = styled(Button)`
  &.MuiButtonBase-root {
    background: #764abc;
    color: white;
    margin: 1rem .5rem;
    &:hover {
      background-color: rgba(118,74,188,.8)
    }
  }
`

export const K64Link = styled(Link)`
  color: #764abc;
  margin: 0 .5rem;
`

const loopRotate = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`

export const K64Loop = styled(Loop)`
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${loopRotate} infinite 2s ease-in-out;
  }
  &.MuiSvgIcon-root {
    fill: #764abc;
    width: 3rem;
    height: 3rem;
  }
`
