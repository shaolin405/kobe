// adapted from https://codesandbox.io/s/m5pjo29zrx

import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

export default function withTransition(WrappedComponent) {
  return class extends Component {
    handleTransitionIn(node, done) {
      this.wrappedComponent.transitionIn(node).then(done)
    }

    handleTransitionOut(node, done) {
      const next = () => {
        if (done) done()
      }
      this.wrappedComponent.transitionOut(node).then(next)
    }

    render() {
      return (
        <Transition
          {...this.props}
          addEndListener={(node, done) => {
            if (this.props.in) {
              this.handleTransitionIn(node, done)
            } else {
              this.handleTransitionOut(node, done)
            }
          }}
        >
          {status => (
            <WrappedComponent
              ref={el => (this.wrappedComponent = el)}
              {...this.props}
              transitionStatus={status}
            />
          )}
        </Transition>
      )
    }
  }
}
