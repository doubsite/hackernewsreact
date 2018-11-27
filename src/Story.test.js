import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';
import Story from './Story';

describe('Story component', () => {
  const error = <span>Error loading the top comments</span>;
  const loading = <span>Loading the top comments...</span>;
  const noTopComments = <span>No top comments</span>;
  
  it('renders the error', () => {
    const story = {
      by: 'bob',
      descendants: 90,
      kids: [1],
      score: 5,
      text: 'some text',
      time: Math.floor(Date.now() / 1000),
      title: 'not a link'
    };
    
    const wrapper = shallow(<Story story={story} />);
    
    wrapper.setState({
      hasError: true,
      showTopCommentsLink: false
    });
    
    expect(wrapper.contains(error)).toEqual(true);
    expect(wrapper.contains(loading)).toEqual(false);
    expect(wrapper.contains(noTopComments)).toEqual(false);
    expect(wrapper.contains('button')).toEqual(false);
  });
  
  it('renders the loading of the comments', () => {
    const story = {
      by: 'bob',
      descendants: 90,
      kids: [1],
      score: 5,
      text: 'some text',
      time: Math.floor(Date.now() / 1000),
      title: 'not a link'
    };
    
    const wrapper = shallow(<Story story={story} />);
    
    wrapper.setState({
      isLoading: true,
      showTopCommentsLink: false
    });
    
    expect(wrapper.contains(error)).toEqual(false);
    expect(wrapper.contains(loading)).toEqual(true);
    expect(wrapper.contains(noTopComments)).toEqual(false);
    expect(wrapper.contains('button')).toEqual(false);
  });
  
  it('renders the story (with view comments button and story title as a link)', () => {
    const story = {
      by: 'bob',
      descendants: 90,
      kids: [1],
      score: 5,
      text: 'some text',
      time: Math.floor(Date.now() / 1000),
      title: 'a link',
      url: 'http://www.example.com'
    };
    
    const info = <p className="info">{story.score} points by {story.by} a few seconds ago | 90 comments</p>;
    const text = <p dangerouslySetInnerHTML={{__html: story.text}}></p>;
    const title = <h2><a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a></h2>;
    const viewTopComments = '<button>View 1 top comment</button>';
    
    const wrapper = shallow(<Story story={story} />);
    
    expect(wrapper.contains(error)).toEqual(false);
    expect(wrapper.contains(loading)).toEqual(false);
    expect(wrapper.contains(noTopComments)).toEqual(false);
    
    expect(wrapper.contains(info)).toEqual(true);
    expect(wrapper.contains(text)).toEqual(true);
    expect(wrapper.contains(title)).toEqual(true);
    expect(wrapper.find('button').html()).toEqual(viewTopComments);
  });
  
  it('renders the story (without view comments button and story title not as a link)', () => {
    const story = {
      by: 'bob',
      descendants: 90,
      kids: [],
      score: 5,
      text: 'some text',
      time: Math.floor(Date.now() / 1000),
      title: 'not a link'
    };
    
    const info = <p className="info">{story.score} points by {story.by} a few seconds ago | 90 comments</p>;
    const text = <p dangerouslySetInnerHTML={{__html: story.text}}></p>;
    const title = <h2>{story.title}</h2>;
    
    const wrapper = shallow(<Story story={story} />);
    
    expect(wrapper.contains(error)).toEqual(false);
    expect(wrapper.contains(loading)).toEqual(false);
    expect(wrapper.contains(noTopComments)).toEqual(true);
    
    expect(wrapper.contains(info)).toEqual(true);
    expect(wrapper.contains(text)).toEqual(true);
    expect(wrapper.contains(title)).toEqual(true);
    expect(wrapper.contains('button')).toEqual(false);
  });
  
  it('renders the top comments', () => {
    const comment1 = {id: 1};
    const comment2 = {id: 2};
    const comments = (
    <div>
      <h3>Showing 2 top comments</h3>
      <Comment key={comment1.id} comment={comment1} />
      <Comment key={comment2.id} comment={comment2} />
    </div>
    );
    const story = {
      by: 'bob',
      descendants: 90,
      kids: [1, 2],
      score: 5,
      text: 'some text',
      time: Math.floor(Date.now() / 1000),
      title: 'not a link'
    };
    
    const wrapper = shallow(<Story story={story} />);
    
    wrapper.setState({
      showTopCommentsLink: false,
      topComments: [comment1, comment2]
    });
    
    expect(wrapper.contains(error)).toEqual(false);
    expect(wrapper.contains(loading)).toEqual(false);
    expect(wrapper.contains(noTopComments)).toEqual(false);
    expect(wrapper.contains('button')).toEqual(false);
    
    expect(wrapper.contains(comments)).toEqual(true);
    expect(wrapper.find(Comment)).toHaveLength(2);
  });
});
