import React, { Component } from 'react'
import { TweenMax, Expo } from 'gsap'

import withTransition from 'helpers/withTransition'

class About extends Component {
  transitionIn($section) {
    return new Promise(resolve => {
      TweenMax.staggerFromTo(
        $section.children,
        1,
        {
          autoAlpha: 0,
          y: 100
        },
        {
          autoAlpha: 1,
          y: 0,
          ease: Expo.easeOut,
          onComplete: resolve
        },
        0.05
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
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>Some stuff about me</p>
      </div>
    )
  }
}

export default withTransition(About)
