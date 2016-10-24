import {Editor, RichUtils} from 'draft-js';
import React, {Component, PropTypes} from 'react';

import BlockStyles from './block-styles';
import InlineStyles from './inline-styles';
import Typography from 'components/typography';
import bind from 'decorators/bind';
import cx from 'classnames';
import styles from './index.less';

export default class EditorComponent extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };

  @bind
  toggleBlockType (blockType) {
    const {onChange, value} = this.props;
    onChange(
      RichUtils.toggleBlockType(
        value,
        blockType
      )
    );
  }

  @bind
  toggleInlineStyle (inlineStyle) {
    const {onChange, value} = this.props;
    onChange(
      RichUtils.toggleInlineStyle(
        value,
        inlineStyle
      )
    );
  }

  @bind
  focus () {
    if (this.editor) {
      this.editor.focus();
    }
  }

  render () {
    const {value, onChange} = this.props;
    const hasFocus = value.getSelection().getHasFocus();
    const contentState = value.getCurrentContent();

    let className = cx(styles.editor, hasFocus && styles.focused);

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className = cx(className, styles.hidePlaceholder);
      }
    }

    return (
      <div>
        <BlockStyles
          editorState={value}
          onToggle={this.toggleBlockType}
        />
        <InlineStyles
          editorState={value}
          onToggle={this.toggleInlineStyle}
        />
        <Typography className={className} onClick={this.focus}>
          <Editor
            editorState={value}
            onChange={onChange}
            placeholder='Tell a story...'
            ref={(ref) => {
              this.editor = ref;
            }}
            spellCheck
          />
        </Typography>
      </div>
    );
  }
}
