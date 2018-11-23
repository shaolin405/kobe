import React, { Component } from 'react'
import { TweenMax, Expo } from 'gsap'

import withTransition from 'helpers/withTransition'
import timeout from 'utils/timeout'

class Preloader extends Component {
  static defaultProps = {
    minDisplayTime: 0,
    preload: () => Promise.resolve()
  }
  transitionIn($section) {
    const { minDisplayTime, setReady } = this.props
    const tween = new Promise(resolve => {
      TweenMax.fromTo(
        $section,
        1,
        {
          xPercent: -100
        },
        {
          xPercent: 0,
          ease: Expo.easeOut,
          onComplete: resolve
        }
      )
    })
    return Promise.all([tween, timeout(minDisplayTime)]).then(setReady)
  }
  transitionOut($section) {
    return new Promise(resolve => {
      TweenMax.to($section, 0.3, {
        xPercent: 100,
        ease: Expo.easeOut,
        onComplete: resolve
      })
    })
  }
  render() {
    return (
      <section
        className="page"
        style={{ backgroundColor: 'black', zIndex: 9999 }}
      />
    )
  }
}

export default withTransition(Preloader)
