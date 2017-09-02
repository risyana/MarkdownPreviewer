import React, { Component } from 'react';
import './App.css';

const API_URL = {recent : "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
                alltime : "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      url : API_URL.recent,
      result : null,
      ascending : false, 
    }

    this.setData = this.setData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onClickHeader = this.onClickHeader.bind(this);
    this.sortData = this.sortData.bind(this);

  }

  setData(data_i){
    this.setState({
      result : data_i,
    })
    this.sortData();
  }
  
  fetchData(){
    fetch(this.state.url)
    .then(response => response.json())
    .then(result => this.setData(result))  
  }

  componentDidMount(){
    this.fetchData();
  }
  
  onClickHeader(param){
    this.setState({
      url : param,
      ascending : !this.state.ascending,
    });
    this.fetchData();
  }

  sortData(){
    let newArr;
    if(this.state.url === API_URL.recent){
      newArr = this.state.result.sort((a,b)=>
        this.state.ascending 
        ? a.recent-b.recent
        : b.recent-a.recent)
    }else{
      newArr = this.state.result.sort((a,b)=>
        this.state.ascending 
        ? a.alltime-b.alltime
        : b.alltime-a.alltime)
    }
    this.setState({
      result : newArr,
    })
  }


  render(){

    return(
      <div className='container'>
        <div className='row'>
          <div className='col col-md-2'>
          </div>
          <div className='col col-md-8'>
            <h2 className='text-center'>
              {this.props.title}
            </h2>
          </div>
          <div className='col col-md-2'>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-1'>
          </div>
          <div className='col col-md-10'>
            {
              this.state.result
              ? <Table 
                result = {this.state.result}
                onClickHeader = {this.onClickHeader}
                ascending={this.state.ascending}
                url={this.state.url}/>
              : null
            }
          </div>
          <div className='col col-md-1'>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-2'>
          </div>
          <div className='col col-md-8'>
            <h4 className='text-center'>
              created by:  
              <a href='https://codepen.io/risyana/'>
               Eka Risyana
              </a>
            </h4>
          </div>
          <div className='col col-md-2'>
          </div>
        </div>
        
      </div>
    );
  }
}

const Table = ({result,onClickHeader,url,ascending}) =>
<table className="table table-hover table-bordered table-striped table-condensed">
    <thead className="thead-inverse">
      <tr>
        <th><h4>#</h4></th>
        <th><h4>Username</h4></th>
        <th>
          <h4>
          <Anchor onClick={()=>onClickHeader(API_URL.recent)}> 
            Point - last 30 days
            {
              url === API_URL.recent
              ? ascending
                ? ' (^)'
                : ' (v)'
              : null
            }
          </Anchor>
          </h4>
        </th>
        <th>
          <h4>
          <Anchor onClick={()=>onClickHeader(API_URL.alltime)}> 
            Point - All Time
            {
              url === API_URL.alltime
              ? ascending
                ? ' (^)'
                : ' (v)'
              : null
            }
          </Anchor>
          </h4>
        </th>
      </tr>
    </thead>
    <tbody>
      {
        result.map((item,index) =>
          <tr key = {index}>
            <td>{index+1}</td>
            <td>
              <a href={`https://www.freecodecamp.com/${item.username}`}
                  target='_blank'>
                <img src={item.img} className='img-circle' width='30' height='30'/>
                {' '}
                {item.username}
                </a>
            </td>
            <td>{item.recent}</td>
            <td>{item.alltime}</td>
          </tr>
        )
      }
    </tbody>
  </table>

  const Anchor = ({onClick,children}) =>
    <a href='#' onClick={onClick} className='customComponent'>
      {children}
    </a>

export default App;