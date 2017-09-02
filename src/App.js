import React, { Component } from 'react';
import './App.css';
var marked = require('marked');

class App extends Component {
  constructor(props){
    super(props);
    this.convertText = this.convertText.bind(this);
  }

  convertText(){
    this.refs.AppResult.refs.result.innerHTML = marked(this.refs.AppSource.refs.source.value);
  }

  render(){
    return(
      <div>
        <TextArea ref='AppSource' onChange = {this.convertText} />
        <MarkedText ref='AppResult' />
      </div>
    );
  }
}

class TextArea extends Component {
  render(){
    return(
      <div className='form-group' style={{width:"500px"}}>
         <textarea onChange = {this.props.onChange} ref='source' className='form-control' rows='10' id='sourcetext'>
        </textarea>
      </div>
    );
  }
}

class MarkedText extends Component {
  render(){
    return(
      <div ref='result'>
        ...
      </div>
    );
  }
}

export default App;