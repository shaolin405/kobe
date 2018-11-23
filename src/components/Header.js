import React from 'react'
import { Transition } from 'react-transition-group'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  color,
  space,
  flexDirection,
  justifyContent,
  alignItems
} from 'styled-system'

import routes from 'routes'
import easings from 'theme/easings'

const Nav = styled.nav`
  ${[space, flexDirection, justifyContent, alignItems]};
  display: flex;
  position: absolute;
  width: 100vw;
  top: 0;
  right: 0;
  z-index: 2;
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.6s ${easings.easeOutExpo},
    transform 0.6s ${easings.easeOutExpo};

  &.is-entered {
    opacity: 1;
    transform: translateY(0);
  }
`

const NavLink = styled(Link)`
  ${[color, space]};
  position: relative;
  text-decoration: none;

  &.is-home {
    text-transform: uppercase;
    font-family: 'Druk-Wide-Super', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
  }

  &.is-active:after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -3px;
    bottom: 20%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.black};
  }
`

const Header = ({ pathname, in: inProp }) => {
  return (
    <Transition in={inProp} timeout={300}>
      {state => (
        <Nav
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'space-between'}
          px={4}
          className={state === 'entered' ? 'is-entered' : ''}
        >
          {routes
            .filter(route => !route.multiple)
            .map(({ key, name, path }) => {
              let isActive
              // only show isActive state when not on Home
              if (key !== 'home')
                if (path.exact) isActive = pathname === path.path
                else isActive = pathname.indexOf(path.path) > -1

              return (
                <NavLink
                  className={`${isActive ? 'is-active' : ''} ${key === 'home' &&
                    'is-home'}`}
                  color={'black'}
                  px={[2, 3]}
                  py={4}
                  to={path.path}
                  key={key}
                >
                  {name}
                </NavLink>
              )
            })}
        </Nav>
      )}
    </Transition>
  )
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(Header)
