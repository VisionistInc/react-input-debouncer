import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';

/**
 * Debounce Field
 * Higher Order Component that gives any controlled inputs a component state
 * and debounces onChange events by a specified delay amount
 * @param {number} delay
 */
const debounceField = ({ delay = 250 } = {}) => (Component) => class extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    onChange: () => undefined,
    onBlur: () => undefined,
    onKeyDown: () => undefined,
    value: ''
  };

  constructor(props) {
    super(props);
    const { value, onChange } = props;

    this.state = { value };
    this.onChange = debounce(onChange, delay);
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.state.value) {
      this.onChange.flush(); // flush the debounce before updating state from prop changes
      this.setState({ value });
    }
  }

  handleBlur(e) {
    this.onChange.flush();
    this.props.onBlur(e);
  }

  handleChange(e) {
    e.persist();

    this.setState({ value: e.target.value });
    this.onChange(e);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') this.onChange.flush();
    this.props.onKeyDown(e);
  }

  render() {
    return (
      <Component
        {...this.props}
        value={this.state.value}
        onBlur={::this.handleBlur}
        onKeyDown={::this.handleKeyDown}
        onChange={::this.handleChange}
      />
    );
  }
};

export default debounceField;
