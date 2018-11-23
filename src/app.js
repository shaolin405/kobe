import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { matchPath } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'

import theme from './theme/'
import Header from './components/Header'
import Preloader from './views/Preloader'

const Wrapper = styled.div`
  text-align: center;
  font-family: sans-serif;
`

class App extends Component {
  state = {
    ready: false,
    mounted: false
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  matchPath = path => {
    return matchPath(window.location.pathname, {
      ...path,
      path: this.props.basename + path.path.substr(1)
    })
  }

  preload = () => Promise.resolve()

  setReady = () => this.setState({ ready: true })

  renderPreloader = () => {
    return (
      <Preloader
        key="preloader"
        preload={this.preload}
        setReady={this.setReady}
        minDisplayTime={500}
      />
    )
  }

  renderRoute = () => {
    const { routes, basename } = this.props
    return routes
      .filter(({ path }) => this.matchPath(path))
      .map(({ Component, key, name, multiple = false }) => {
        const slug = multiple
          ? window.location.pathname.slice(`${basename}${key}/`.length)
          : key
        document.title = `Mambaout ⎯ ${name}`
        return <Component key={key} slug={slug} />
      })
  }

  render() {
    const { ready, mounted } = this.state
    const renderContent = this[ready ? 'renderRoute' : 'renderPreloader']

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <TransitionGroup>
            {ready && <Header />}
            {mounted ? renderContent() : null}
          </TransitionGroup>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App
