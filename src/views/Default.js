import React, { Component } from 'react'

import withTransition from 'helpers/withTransition'

class Page extends Component {
  transitionIn($section) {
    return new Promise(resolve => {
      // your tween animation
      setTimeout(resolve, 1000)
    })
  }
  transitionOut($section) {
    return new Promise(resolve => {
      // your tween animation
      setTimeout(resolve, 1000)
    })
  }
  render() {
    return (
      <section className="page">
        <h1>Default Page</h1>
      </section>
    )
  }
}

export default withTransition(Page)
