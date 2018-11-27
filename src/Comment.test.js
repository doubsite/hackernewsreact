import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('Comment component', () => {
  it('renders the comment', () => {
    const comment = {by: 'bob', text: 'some text', time: Math.floor(Date.now() / 1000)};
    const info = <p className="info">by {comment.by} a few seconds ago</p>;
    const text = <p dangerouslySetInnerHTML={{__html: comment.text}}></p>;
    
    const wrapper = shallow(<Comment comment={comment} />);
    
    expect(wrapper.contains(info)).toEqual(true);
    expect(wrapper.contains(text)).toEqual(true);
  });
});
