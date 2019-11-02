import React from 'react';

class NameValueFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [],
        }
    }
    addfields = event => {
        this.setState((prevState) => ({
            fields: [...prevState.fields, { name: '', value: '' }]
        })
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.fields !== this.state.fields) {
            this.props.fieldsStateUpdatedCallback(this.state.fields.slice());
        }

    }

    btnRemoveFields = event => {
        let indexToRemove = event.target.id;

        if (indexToRemove >= 0) {
            let newArray = [];

            for (let i = 0; i < this.state.fields.length; i++) {
                if (i != indexToRemove) {
                    newArray.push(this.state.fields[i]);
                }
            }

            this.setState({ fields: newArray.slice() })
        }
    }

    inputNameChange = event => {
        let arr = this.state.fields.slice();
        let index = event.target.id;

        arr[index].name = event.target.value;

        this.setState({ fields: arr });
    }

    inputValueChange = event => {
        let arr = this.state.fields.slice();
        let index = event.target.id;

        arr[index].value = event.target.value;

        this.setState({ fields: arr });
    }

    render() {

        return (
            <div className="mt-3">
                <h5>{this.props.headingText}</h5>
                {
                    this.state.fields.map((val, key) => {
                        return (
                            <div className="mt-1" key={key}>
                                <input
                                    type="text"
                                    id={key}
                                    onChange={this.inputNameChange}
                                    value={this.state.fields[key].name}

                                />

                                <input
                                    type="text"
                                    id={key}
                                    onChange={this.inputValueChange}
                                    value={this.state.fields[key].value}
                                />
                                <button id={key} onClick={this.btnRemoveFields}>x</button>
                            </div>
                        );
                    })
                }
                <button className="mt-1" onClick={this.addfields}>{this.props.buttonText}</button>
            </div>
        )
    }
}

export default NameValueFields;