import React, {Component, PropTypes} from 'react';

import bind from 'decorators/bind';
import cx from 'classnames';

export default class StyleButton extends Component {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    style: PropTypes.string,
    active: PropTypes.bool,
    label: PropTypes.any
  };

  @bind
  onToggle (e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render () {
    const {active, label} = this.props;
    const className = cx('RichEditor-styleButton', active && ' RichEditor-activeButton');

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {label}
      </span>
    );
  }
}
