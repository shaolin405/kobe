import React, { Component } from 'react'
import { TweenMax, Elastic, Expo } from 'gsap'

import withTransition from 'helpers/withTransition'

class ProjectSingle extends Component {
  transitionIn = $section => {
    return new Promise(resolve => {
      TweenMax.fromTo(
        $section.children[0],
        1,
        {
          autoAlpha: 0,
          scaleX: 2
        },
        {
          autoAlpha: 1,
          scaleX: 1,
          ease: Elastic.easeOut,
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
    const { slug } = this.props
    return (
      <section className="page">
        <h1>Project {slug}</h1>
      </section>
    )
  }
}

export default withTransition(ProjectSingle)
