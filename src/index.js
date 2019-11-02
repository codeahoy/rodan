import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NameValueFields from './components/NameValueFields';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            headers: [],
            errors: [],
            showResult: false,
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

        fetch(this.state.url, {
            method: this.state.method,
            headers: Object.assign({}, ...this.state.headers.map(item => ({ [item.name]: item.value }))),

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

    render() {
        return (

            <div className="container-fluid mt-3">
                <div className="row content">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5">

                        <select value={this.state.method} onChange={(e) => this.setState({ method: e.target.value })}>
                            <option value="POST">POST</option>
                            <option value="GET">GET</option>
                            <option value="PUT">PUT</option>
                        </select>
                        <input
                            type="text"
                            value={this.state.url}
                            onChange={(e) => this.setState({ url: e.target.value })}
                        />
                        <button onClick={this.btnSubmitRestCall}>Call</button>

                        <br />

                        <NameValueFields headingText='HTTP Header' buttonText='Add Headers' fieldsStateUpdatedCallback={this.headersStateUpdated} />

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