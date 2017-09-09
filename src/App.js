import React, { Component } from 'react';
import './App.css';
var marked = require('marked');
const PLACEHOLDER = `
Heading
=======
Sub-heading
-----------
### Another deeper heading
Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a  
line break

Text attributes *italic*, **bold**, 
\`monospace\`, ~~strikethrough~~ .

Shopping list:
  * apples
  * oranges
  * pears

Numbered list:
  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.


 *[Eka Risyana](https://www.freecodecamp.org/risyana)*`;


class App extends React.Component {
  constructor(props){
    super(props);
    this.convertText = this.convertText.bind(this);
  }

  convertText(){
    this.refs.AppResult.refs.result.innerHTML = marked(this.refs.AppSource.refs.source.value);
  }
  
  componentDidMount(){
    this.refs.AppSource.refs.source.value = PLACEHOLDER;
    this.convertText();
  }

  render(){
    return(
      <div className='container'>
        <div className='row'>
          <div className='col col-md-12'>
            <h3 className='text-center'>{this.props.title}</h3>
            <hr/>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-6'>
            <h4>Markdown Text</h4>
            <TextArea ref='AppSource' onChange = {this.convertText} />
          </div>
          <div className='col col-md-6'>
            <h4>Preview</h4>
            <MarkedText ref='AppResult' />
          </div>
        </div>
      </div>
    );
  }
}

class TextArea extends React.Component {
  render(){
    return(
      <div className='form-group' >
        <textarea 
          onChange = {this.props.onChange} 
          ref='source' 
          className='form-control' 
          rows='20' 
          id='sourcetext'>
        </textarea>
      </div>
    );
  }
}


class MarkedText extends React.Component {
  render(){
    return(
      <div ref='result'>
      </div>
    );
  }
}

export default App;