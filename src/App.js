import axios from 'axios';
import common from './common';
import config from './config';
import logo from './logo.svg';
import React, { Component } from 'react';
import Story from './Story';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: true,
      topStories: []
    };
  }

  componentDidMount() {
    this.fetchTopStories();
  }

  fetchTopStories() {
    const errorHandling = e => {
      this.setState({
        hasError: true,
        isLoading: false
      })
    };
    
    axios.get(config.urls.topstories)
      .then(response => {
        // make sure there's enough top stories returned by the API
        const nbTopStories = Math.min(config.nbTopStories, response.data.length);
        const topStoriesIds = response.data.slice(0, nbTopStories);
        
        common.fetchItems(topStoriesIds)
          .then(axios.spread((...args) => {
            let topStories = [];
            
            args.forEach(response => topStories.push(response.data));
            
            this.setState({
              isLoading: false,
              topStories: topStories
            });
          }))
          .catch(errorHandling);
      })
      .catch(errorHandling);
  }

  render() {
    const topStories = this.state.topStories.length === 0 ? (
      <p>No top stories</p>
    ) : this.state.topStories.map(topStory => {
      return (
        <Story key={topStory.id} story={topStory} />
      );
    });
    
    return (
      <div className="App">
        <header className="App-header">
          {this.state.isLoading ? (
            <div>
              <p className="center">Loading the top stories...</p>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          ) : (
            <div>
              {this.state.hasError ? (
                <p>Error loading the top stories</p>
              ) : (
                <div>{topStories}</div>
              )}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
