import React, {PropTypes, Component} from 'react';

export default class Entry extends Component {
  static fragments = {
    post: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render () {
    const {post} = this.props;

    return (
      <div>
        <div>{post.title}</div>
      </div>
    );
  }
}
