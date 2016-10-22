import React, {Component, PropTypes} from 'react';

import styles from './index.less';

export default class Post extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool
  };

  render () {
    return (
      <div className={styles.root}>
        Post
      </div>
    );
  }
}
