import React, {Component, PropTypes} from 'react';

import Button from 'components/button';
import Entry from './entry';
import styles from './list.less';

export default class List extends Component {
  static fragments = {
    posts: Entry.fragments.post
  };

  static propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {loading, posts} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!posts) {
      result = this.renderError();
    } else {
      result = this.renderContent();
    }

    return (
      <div className={styles.root}>
        {result}
        <div className={styles.footer}>
          <Button url='/new' primary block>
            Create new post
          </Button>
        </div>
      </div>
    );
  }

  renderLoading () {
    return (
      <div>Loading</div>
    );
  }

  renderError () {
    return (
      <div>Error loading posts</div>
    );
  }

  renderContent () {
    const {posts} = this.props;

    return (
      <div>
        {posts.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (post) {
    return (
      <Entry key={post._id} post={post} />
    );
  }
}
