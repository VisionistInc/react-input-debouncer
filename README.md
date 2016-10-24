# react-input-debouncer

A higher-order component for debouncing inputs in react. Works with any component that takes
`value` and `onChange` props.

## Installation

```
npm install --save react-input-debouncer
```

## Usage

Wrap the component you want to debounce with the `debounceInput` function. A delay of 250ms will be applied by default
if one isn't provided.

```
import React, { Component } from 'react';
import debounceInput from 'react-input-debouncer';

class Input extends Component {
  render() {
    return (
      <input type="text" {...this.props} />
    )
  }
}

export default debounceInput({ delay: 250 })(Input);
```

Then simply use the composed component like you would the original.

```
import Input from './Input.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    console.log('debounced input changed!', e.target.value);

    this.setState({
      value: e.target.value
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Input
          type="text"
          value={value}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
```