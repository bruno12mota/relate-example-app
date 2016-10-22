import {Editor, RichUtils} from 'draft-js';
import React, {Component, PropTypes} from 'react';

import BlockStyles from './block-styles';
import InlineStyles from './inline-styles';
import bind from 'decorators/bind';

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

  render () {
    const {value, onChange} = this.props;

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
        <Editor
          editorState={value}
          onChange={onChange}
          placeholder='Tell a story...'
          spellCheck
        />
      </div>
    );
  }
}
