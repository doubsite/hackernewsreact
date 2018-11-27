import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Story from './Story';

describe('App component', () => {
  const error = <p>Error loading the top stories</p>;
  const loading = <p className="center">Loading the top stories...</p>;
  const noTopStories = <p>No top stories</p>;
  
  it('renders the error', () => {
    const wrapper = shallow(<App />);
    
    wrapper.setState({
      hasError: true,
      isLoading: false
    });
    
    expect(wrapper.contains(error)).toEqual(true);
    expect(wrapper.contains(loading)).toEqual(false);
    expect(wrapper.contains(noTopStories)).toEqual(false);
  });
  
  it('renders the loading', () => {
    const wrapper = shallow(<App />);
    
    expect(wrapper.contains(error)).toEqual(false);
    expect(wrapper.contains(loading)).toEqual(true);
    expect(wrapper.contains(noTopStories)).toEqual(false);
  });
  
  it('renders the no top stories', () => {
    const wrapper = shallow(<App />);
    
    wrapper.setState({
      isLoading: false
    });
    
    expect(wrapper.contains(error)).toEqual(false);
    expect(wrapper.contains(loading)).toEqual(false);
    expect(wrapper.contains(noTopStories)).toEqual(true);
  });
  
  it('renders the top stories', () => {
    const story = {id: 1};
    const stories = <div className="App-stories"><Story key={story.id} story={story} /></div>;
    const wrapper = shallow(<App />);
    
    wrapper.setState({
      isLoading: false,
      topStories: [story]
    });
    
    expect(wrapper.contains(error)).toEqual(false);
    expect(wrapper.contains(loading)).toEqual(false);
    expect(wrapper.contains(noTopStories)).toEqual(false);
    
    expect(wrapper.contains(stories)).toEqual(true);
    expect(wrapper.find(Story)).toHaveLength(1);
  });
});
