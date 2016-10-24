import React, {Component, PropTypes} from 'react';

import Button from 'components/button';
import Editor from 'components/editor';
import Typography from 'components/typography';
import bind from 'decorators/bind';
import cx from 'classnames';
import styles from './index.less';

export default class Post extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool,
    changeTitle: PropTypes.func.isRequired,
    changeContent: PropTypes.func.isRequired
  };

  @bind
  onChangeTitle (event) {
    this.props.changeTitle(event.target.value);
  }

  render () {
    const {isEdit, isNew, id} = this.props;

    return (
      <div className={cx(styles.root, isEdit && styles.editing)}>
        {this.renderContent()}
        <div className={styles.footer}>
          <Button cancel margins url={isNew ? '/' : `/${id}`}>
            {isNew ? 'Cancel new' : 'Cancel edit'}
          </Button>
          <Button primary margins>
            {isNew ? 'Create post' : 'Save post'}
          </Button>
        </div>
      </div>
    );
  }

  renderContent () {
    const {isEdit, post = {}} = this.props;
    let result;

    if (isEdit) {
      const {changeContent} = this.props;

      result = (
        <div>
          <input
            className={styles.input}
            value={post.title}
            onChange={this.onChangeTitle}
          />
          <Editor
            value={post.content}
            onChange={changeContent}
          />
        </div>
      );
    } else {
      result = (
        <Typography>
          <h1>{post.title}</h1>
          <div>{post.content}</div>
        </Typography>
      );
    }

    return result;
  }
}
