import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { TweenMax, Expo } from 'gsap'
import styled from 'styled-components'
import { color, space } from 'styled-system'

import withTransition from 'helpers/withTransition'

const NavLink = styled(Link)`
  ${[color, space]};
  display: block;
  text-decoration: none;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
`

const ListItem = styled.li`
  display: block;
`

class Projects extends Component {
  transitionIn = $section => {
    return new Promise(resolve => {
      TweenMax.fromTo(
        $section,
        1,
        {
          autoAlpha: 0,
          rotationX: -40
        },
        {
          autoAlpha: 1,
          rotationX: 0,
          ease: Expo.easeOut,
          onComplete: resolve
        }
      )
    })
  }
  transitionOut($section) {
    return new Promise(resolve => {
      TweenMax.to($section, 0.3, {
        autoAlpha: 0,
        ease: Expo.easeOut,
        onComplete: resolve
      })
    })
  }
  renderList() {
    const list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        <ListItem key={`season-link-${i}`}>
          <NavLink color={'white'} py={[2, 3]} to={`/season/${i}`}>
            Project {i}
          </NavLink>
        </ListItem>
      )
    }
    return list
  }
  render() {
    const projectsList = this.renderList()
    return (
      <section className="page ">
        <h1>Projects</h1>
        <List ref={el => (this.$list = el)}>{projectsList}</List>
      </section>
    )
  }
}

export default withTransition(Projects)
