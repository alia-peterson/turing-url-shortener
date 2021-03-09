import React, { Component } from 'react'
import './App.css'
import { getUrls, postUrls } from '../../apiCalls'
import UrlContainer from '../UrlContainer/UrlContainer'
import UrlForm from '../UrlForm/UrlForm'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urls: []
    }
  }

  submitUrls = (urlTitle, longUrl) => {
    const postFormat = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        long_url: longUrl,
        title: urlTitle
      })
    }
    
    const newUrl = postUrls(postFormat)
    newUrl.then(urls => {
      this.setState(prevState => {
        console.log(prevState);
        return { urls: [...prevState.urls, urls] }
      })
    })
  }

  componentDidMount() {
    const storedUrls = getUrls()
    storedUrls.then(urls => {
      this.setState({ urls: urls.urls })
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm submitUrls={this.submitUrls}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    )
  }
}

export default App
