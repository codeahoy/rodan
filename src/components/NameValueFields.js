import React from 'react';

class NameValueFields extends React.Component {
    constructor(props) {
        super(props);
        this.fields = this.props.initialValues;
    }

  
    addfields = event => {
        this.fields.push({ name: '', value: '' });

        this.props.fieldsStateUpdatedCallback(this.fields);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.fields = nextProps.initialValues;
        //console.log('call ' + JSON.stringify(nextProps.initialValues));
        return true;
    }


    btnRemoveFields = event => {
        let indexToRemove = event.target.id;

        if (indexToRemove >= 0) {
            let newArray = [];

            for (let i = 0; i <  this.fields.length; i++) {
                if (i != indexToRemove) {
                    newArray.push( this.fields[i]);
                }
            }

            this.fields = newArray;
        }

        this.props.fieldsStateUpdatedCallback(this.fields);
    }

   

    inputNameChange = event => {
        let arr =  this.fields.slice();
        let index = event.target.id;

        arr[index].name = event.target.value;

        this.fields = arr;
        this.props.fieldsStateUpdatedCallback(this.fields);
    }

    inputValueChange = event => {
        let arr = this.fields.slice();
        let index = event.target.id;

        arr[index].value = event.target.value;

        this.fields = arr;
        this.props.fieldsStateUpdatedCallback(this.fields);
    }

    render() {

        return (
            <div className="mt-3" key={this.props.initialValues}>
                <h5>{this.props.headingText}</h5>
                {
                    this.fields.map((val, key) => {
                        return (
                            <div className="mt-1" key={key}>
                                <input
                                    className="mx-1"
                                    type="text"
                                    id={key}
                                    onChange={this.inputNameChange}
                                    value={this.fields[key].name}

                                />

                                <input
                                    type="text"
                                    id={key}
                                    onChange={this.inputValueChange}
                                    value={this.fields[key].value}
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