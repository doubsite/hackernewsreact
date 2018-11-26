import axios from 'axios';
import Comment from './Comment';
import common from './common';
import config from './config';
import moment from 'moment'
import React, { Component } from 'react';
import './Story.css';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: false,
      nbTopComments: Math.min(config.nbTopComments, this.props.story.kids ? this.props.story.kids.length : 0),
      showTopCommentsLink: true,
      topComments: []
    };
  }

  viewTopComments = () => {
    this.setState({
      isLoading: true,
      showTopCommentsLink: false
    });
    
    // make sure there's enough top comments returned by the API
    const topCommentsIds = this.props.story.kids.slice(0, this.state.nbTopComments);
    
    common.fetchItems(topCommentsIds)
      .then(axios.spread((...args) => {
        let topComments = [];
        
        args.forEach(response => topComments.push(response.data));
        
        this.setState({
          isLoading: false,
          topComments: topComments
        });
      }))
      .catch(e => {
        this.setState({
          hasError: true,
          isLoading: false
        });
      });
  }

  render() {
    const nbTopComments = this.state.nbTopComments;
    const pluralize = number => number !== 1 ? 's' : '';
    const story = this.props.story;
    
    const info = (
      <p className="info">
        {story.score} point{pluralize(story.score) + ' '}
        by {story.by} {moment.unix(story.time).fromNow() + ' | '}
        {story.descendants} comment{pluralize(story.descendants)}
      </p>
    );
    const title = story.url ? (
      <a href={story.url} target="_blank" rel="noopener noreferrer">
        {story.title}
      </a>
    ) : (
      story.title
    );
    const topComments = (
      <div>
        <h3>Showing {nbTopComments} top comment{pluralize(nbTopComments)}</h3>
        {this.state.topComments.map(topComment => {
          return (
            <Comment key={topComment.id} comment={topComment} />
          );
        })}
      </div>
    );
    const topCommentsLink = nbTopComments > 0 ? (
      <button onClick={this.viewTopComments}>
        View {nbTopComments} top comment{pluralize(nbTopComments)}
      </button>
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
          topCommentsLink
        ) : (
          this.state.isLoading ? (
            <span>Loading the top comments...</span>
          ) : (
            this.state.hasError ? (
              <span>Error loading the top comments</span>
            ) : (
              topComments
            )
          )
        )}
      </div>
    );
  }
}

export default Story;
