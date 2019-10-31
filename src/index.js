import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HeadersForm from './components/HeadersForm';

class ApiCall extends React.Component {
    constructor(){  
        super();  
        this.state = {  
            url: 'http://jsonplaceholder.typicode.com/users',
            method: 'GET',
            headers: [{name: '', value: ''}]
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

  addHeaders = event => {
      this.setState( (prevState) => ({
          headers: [...prevState.headers, {name:'', value: ''}]
            })
       );
  }

  removeHeader = event => {

    let indexToRemove = event.target.id;
    console.log('del =>' + indexToRemove);
    if (indexToRemove > 0) {
        let newArray = [];

        console.log('length:' + this.state.headers.length);
        for (let i=0; i<this.state.headers.length; i++) {
            if (i != indexToRemove) {
                console.log('pushing: ' + this.state.headers[i]);
                newArray[i] = this.state.headers[i];
                //newArray.push(this.state.headers[i]);
                
            }
        }

        console.log(newArray)

        this.setState({headers: newArray});
    } 

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
            <br/>
            <button onClick={this.addHeaders}>Add Header</button>
            {
                this.state.headers.map( (val, key) => {

                    let headerNameId = `headerNameId-${key}`, headerValueId = `headerValueId-${key}`;

                    return (
                        <div>
                            <input 
                            type="text"
                            name={headerNameId}
                            data-id={key}
                            id={headerNameId}
                            
                            />

                            <input 
                            type="text"
                            name={headerValueId}
                            data-id={key}
                            id={headerValueId}
                 
                            />
                            <button id={key} onClick={this.removeHeader}>x</button>
                        </div>

                        
                    )

                })
            }
            
            

            <h3> {this.state.method}  {this.state.url} </h3>
            <pre>{this.state.response}</pre>
        </div>
        );
    }
};

 
ReactDOM.render(<ApiCall />, document.getElementById('root'));