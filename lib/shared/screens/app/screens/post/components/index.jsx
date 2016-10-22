import React, {Component, PropTypes} from 'react';

import Button from 'components/button';
import Editor from 'components/editor';
import cx from 'classnames';
import styles from './index.less';

export default class Post extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool,
    editorState: PropTypes.any,
    onContentChange: PropTypes.func.isRequired
  };

  render () {
    const {isEdit, isNew, id} = this.props;

    return (
      <div className={cx(styles.root, isEdit && styles.editing)}>
        {this.renderContent()}
        <div className={styles.footer}>
          <Button cancel margins url={isNew ? '/' : `/${id}`}>
            Cancel edit
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
      const {editorState, onContentChange} = this.props;

      result = (
        <div>
          <input value={post.title} />
          <Editor
            value={editorState}
            onChange={onContentChange}
          />
        </div>
      );
    } else {
      result = (
        <div>
          <h1>{post.title}</h1>
          <div>{post.content}</div>
        </div>
      );
    }

    return result;
  }
}
