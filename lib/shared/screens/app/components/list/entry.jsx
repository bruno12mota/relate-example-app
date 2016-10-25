import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import moment from 'moment';
import styles from './entry.less';

export default class Entry extends Component {
  static fragments = {
    post: {
      _id: 1,
      title: 1,
      date: 1
    }
  };

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render () {
    const {post} = this.props;
    const date = moment(post.date).fromNow();

    return (
      <Link className={styles.root} to={`/${post._id}`}>
        <div className={styles.title}>
          {post.title}
        </div>
        <div className={styles.date}>
          {date}
        </div>
      </Link>
    );
  }
}
