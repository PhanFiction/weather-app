import React from 'react';
import './InputCity.css';

class InputCity extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="input-container">
        <label htmlFor="city" id="city" type="text" />
        <input type="text" id="city" value={this.props.value} onChange={this.props.handleInput} placeholder="London"/>
        <button className="search" type="submit" onClick={this.props.handleSubmit}>Search</button>
      </div>
    )
  }
}

export default InputCity;