import moment from 'moment'
import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
  render() {
    const comment = this.props.comment;
    
    const info = (
      <p className="info">
        by {comment.by} {moment.unix(comment.time).fromNow()}
      </p>
    );
    
    return (
      <div className="Comment">
        {info}
        <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
      </div>
    );
  }
}

export default Comment;
