import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ApiCall extends React.Component {
    constructor(){  
        super();  
        this.state = {  
            url: 'http://jsonplaceholder.typicode.com/users',
            method: 'GET',
        };  
   }

   handleButtonClick = event => {
       this.setState({response: null });

       fetch(this.state.url)
       .then(res =>  { 
           console.log(res);
           return res.json() 
        })
       .then( (data) => {
           //console.log(data);
           this.setState({response: JSON.stringify(data, undefined, 2)});
       }, reason => {
           this.setState({response: 'error ' + reason });
       })

   }

   handleUrlChange = event => {
    this.setState({url: event.target.value});
  };

  handleHttpMethodChange = event => {
      this.setState({method: event.target.value});
  }

    render() {
        return (
        <div>
            <select value={this.state.method} onChange={this.handleHttpMethodChange}>
            <option value="POST">POST</option>
            <option value="GET">GET</option>
            <option value="PUT">PUT</option>
            </select>


            <input
            type="text"
            value={this.state.url}
            onChange={this.handleUrlChange}
            />
            <button onClick={this.handleButtonClick}>Call</button>

            <h3> {this.state.method}  {this.state.url} </h3>
            <pre>{this.state.response}</pre>
        </div>
        );
    }
};

 
ReactDOM.render(<ApiCall />, document.getElementById('root'));