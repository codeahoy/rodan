import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NameValueFields from './components/NameValueFields';
import AuthorizationFields from './components/AuthorizationFields';
import { encode } from "base-64";

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            headers: [],
            errors: [],
            queryParams: [],
            showResult: false,
            auth: {}
        };
    }

    checkErrors = () => {

        let errors = [];

        this.state.headers.forEach((item) => {
            if (item.name.length === 0) {
                errors.push('Headers cannot be empty');
            }
        });

        return errors;
    }

    btnSubmitRestCall = event => {

        event.preventDefault();

        // This will show the results section
        this.setState({ showResult: true });

        // Clear previous errors and check for new ones
        this.setState({ errors: [] });

        let errorsArray = this.checkErrors();
        if (errorsArray.length > 0) {
            this.setState({ errors: errorsArray.slice() });
            return;
        }

        this.setState({ response: 'fetching...' });

        let queryParams = '';
        if (this.state.queryParams.length > 0) {
            queryParams = '?';
            this.state.queryParams.map((item) => {
                if (item.name.length > 0) {
                    queryParams = queryParams + item.name + '=' + item.value + '&';
                }

                return item; // To get rid of warning
            });
            queryParams = queryParams.slice(0, -1); // Delete last ampersand (&)
        }

        let url = this.state.url + queryParams;
        console.log(url);

        // Assign headers array from the state
        let headers = Object.assign({}, ...this.state.headers.map(item => ({ [item.name]: item.value })));

        // Assign authorization array from the state
        if (this.state.auth.type != null && this.state.auth.type === 'basic') {
            console.log('adding auth')
            headers = Object.assign(headers, {
                'Authorization': 'Basic ' + encode(this.state.auth.username + ":" + this.state.auth.password)
            });
        }

        fetch(url, {
            method: this.state.method,
            headers: headers,

        }
        )
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then((data) => {
                //console.log(data);
                this.setState({ response: JSON.stringify(data, undefined, 2) });
            }, reason => {
                this.setState({ response: 'error ' + reason });
            })
    }

    headersStateUpdated = (headersCopy) => {
        this.setState({ headers: headersCopy })
    }

    queryParamsStateUpdated = (paramsCopy) => {
        this.setState({ queryParams: paramsCopy })
    }

    addDemoGetWithQueryParams = () => {

        this.setState({
            headers: [],
            queryParams: [{ name: 'symbols', value: 'USD,GBP' }],
            url: 'https://api.exchangeratesapi.io/latest',
        });
    }

    authStateUpdated = (authCopy) => {
        console.log('authStateUpdated');
        this.setState({
            auth: authCopy
        });

    }

    render() {
        return (

            <div className="container-fluid mt-3">
                <div className="row content">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5">

                        <div class="input-group">
                            <select
                                className="custom-select flex-shrink w-auto"
                                value={this.state.method}
                                onChange={(e) => this.setState({ method: e.target.value })}>

                                <option value="POST">POST</option>
                                <option value="GET">GET</option>
                                <option value="PUT">PUT</option>
                            </select>

                            <input type="text" value={this.state.url} placeholder="HTTP URL" class="form-control" onChange={(e) => this.setState({ url: e.target.value })} />
                            <span class="input-group-btn ml-1"><input type="button" value="Call" class="btn btn-primary" onClick={this.btnSubmitRestCall} /></span>
                        </div>



                        <hr />

                        <AuthorizationFields
                            auth={this.state.auth}
                            authStateUpdatedCallback={this.authStateUpdated} />

                        <hr />

                        <NameValueFields
                            headingText='HTTP Header'
                            buttonText='Add Headers'
                            fieldsStateUpdatedCallback={this.headersStateUpdated}
                            initialValues={this.state.headers.slice()} />

                        <hr />

                        <NameValueFields
                            headingText='Query Parameters'
                            buttonText='Add Parameters'
                            fieldsStateUpdatedCallback={this.queryParamsStateUpdated}
                            initialValues={this.state.queryParams.slice()} />

                        <hr />

                        <h4 className="mt-4"> Examples </h4>

                        <a href="#" onClick={this.addDemoGetWithQueryParams}>Exchange Rate (Query Parameter)</a>


                    </div>
                    <div className="col-lg-5">
                        {/*
                        Check for errors and render the ResultsSection component with either error message
                        or the actual response depending on whether there are errors or not.
                        */}

                        {(this.state.errors.length > 0) ?
                            <ResultsSection
                                heading={`Error`}
                                message={this.state.errors}
                            />
                            :
                            <ResultsSection
                                heading={`${this.state.method} ${this.state.url}`}
                                message={this.state.response}
                            />
                        }



                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>
        );
    }
};

class ResultsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <h5> {`Result: ${this.props.heading}`}  </h5>
                <pre>{this.props.message}</pre>
            </>
        );
    }
}
ReactDOM.render(<Main />, document.getElementById('root'));