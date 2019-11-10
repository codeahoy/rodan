import React from 'react';

class ExampleRestCalls extends React.Component {



    render() {
        return (
            <>
            <h5>Examples</h5>
            <button onClick={() => {
                var newState = {
                    headers: [],
                    queryParams: [{ name: 'symbols', value: 'USD,GBP' }],
                    url: 'https://api.exchangeratesapi.io/latest',
                    method: 'GET'
                };
        
                this.props.stateUpdatedCallback(Object.assign({}, newState));  

            }}>Exchange Rate (Query Params)</button> 

            <br/>
           
            <button onClick={() => {
                var newState = {
                    headers: [],
                    queryParams: [{ name: 'hand', value: 'wave' }],
                    url: 'https://postman-echo.com/post',
                    method: 'POST'
                };
        
                this.props.stateUpdatedCallback(Object.assign({}, newState));  

            }}>Postman POST Echo (Query Params)</button>
           
            </>
            );
        }
}

export default ExampleRestCalls;


