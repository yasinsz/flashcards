import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <NavigationStyled>
      <LinkStyled exact to="/">
        Home
      </LinkStyled>
      <LinkStyled to="/create">Create</LinkStyled>
      <LinkStyled to="/bookmarks">Bookmarks</LinkStyled>
      <LinkStyled to="/practice">Practice</LinkStyled>
    </NavigationStyled>
  )
}

const LinkStyled = styled(NavLink)`
  flex-grow: 1;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;

  &.active {
    background: hotpink;
  }
`

const NavigationStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: 1px;
`
