//import axios from 'axios';
import moment from 'moment'
import React, { Component } from 'react';
import config from './config';
import './Story.css';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: false,
      showTopCommentsLink: true,
      topComments: []
    };
  }

  render() {
    const pluralize = number => number !== 1 ? 's' : '';
    const story = this.props.story;
    
    const info = (
      <p className="Story-info">
        {story.score} point{pluralize(story.score) + ' '}
        by {story.by} {moment.unix(story.time).fromNow() + ' | '}
        {story.descendants} comment{pluralize(story.descendants)}
      </p>
    );
    const nbTopComments = Math.min(config.nbTopComments, story.kids ? story.kids.length : 0);
    const title = story.url ? (
      <a className="App-link" href={story.url} target="_blank" rel="noopener noreferrer">
        {story.title}
      </a>
    ) : (
      story.title
    );
    const topCommentsLink = nbTopComments > 0 ? (
      <a className="App-link" href={story.url} target="_blank" rel="noopener noreferrer">
        View {nbTopComments} top comment{pluralize(nbTopComments)}
      </a>
    ) : (
      <span>No top comments</span>
    );
    
    return (
      <div className="Story">
        <h2>{title}</h2>
        {info}
        {story.text &&
          <p dangerouslySetInnerHTML={{__html: story.text}}></p>
        }
        {this.state.showTopCommentsLink ? (
          <div>{topCommentsLink}</div>
        ) : (
          <p>comments loading / loaded</p>
        )}
      </div>
    );
  }
}

export default Story;
