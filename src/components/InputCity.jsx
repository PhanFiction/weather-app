import React from 'react';

class InputCity extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="input-container">
        <label htmlFor="city" id="city" type="text" />
        <input id="city" input={this.props.value} onChange={this.props.handleInput} placeholder="London"/>
        <button type="submit" onClick={this.props.handleSubmit}>Search</button>
      </div>
    )
  }
}

export default InputCity;