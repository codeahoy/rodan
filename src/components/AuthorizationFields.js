import React from 'react';

class AuthorizationFields extends React.Component {
    constructor(props) {
        super(props);
        this.auth = this.props.auth;

    }

    handleAuthTypeChange = event => {

        event.preventDefault();

        let authType = event.target.value
        let auth = {};

        if (authType === 'basic') {
            auth = {
                type: 'basic',
                username: '',
                password: ''
            }

        } else if (authType === 'bearer') {
            auth = {
                type: 'bearer',
            }

        } else {
            auth = {
                type: 'no',
            }
        }

        this.auth = auth;
        this.updateParentByCallback();
    }

    updateParentByCallback = () => {
        this.props.authStateUpdatedCallback(Object.assign({}, this.auth));
    }

    handleBasicAuthInputChange = (event) => {

        console.log(event.target.name);

        if (event.target.name === 'username') {
            this.auth.username = event.target.value;
            console.log(this.auth)
        } else if (event.target.name === 'password') {

            this.auth.password = event.target.value;

        }
        this.updateParentByCallback();
        //this.auth[event.name] = event.value;

    }

    // Overriding this method to receive adhoc updates from parent component. 
    // Usually, this happens when a user clicks on an Example call (or History) 
    // which might update the state in parent. In that case, we want to assign
    // local variable to the new value passed in props to this method.
    shouldComponentUpdate(nextProps, nextState) {
        this.auth = nextProps.auth;
        console.log(`shouldComponentUpdate : ${JSON.stringify(this.auth)} next: ${JSON.stringify(nextProps.auth)}`);
        return true;
    }


    render() {
        return (
            <>
            <h5>Authorization</h5>
                <select
                    value={this.auth.type}
                    onChange={this.handleAuthTypeChange}>

                    <option value="no">No Authentication</option>
                    <option value="basic">Basic</option>
                </select>
                <br/>

                {
                    this.auth.type === 'basic' ?
                    <div className="mt-1">
                        <input
                            type="text"
                            className="mx-1"
                            name="username"
                            value={this.auth.username}
                            placeholder="Username"
                            onChange={this.handleBasicAuthInputChange}

                        /> 
                        <input
                            type="text"
                            className="mt-1"
                            name="password"
                            value={this.auth.password}
                            placeholder="Password"
                            onChange={this.handleBasicAuthInputChange}

                        /> 

                    </div>
                        
                        :
                        <div></div>}



            </>
        )


    }
}


export default AuthorizationFields;