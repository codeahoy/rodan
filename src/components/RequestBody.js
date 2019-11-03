import React from 'react';
import { logObject, defaultRawBodyObject } from '../utils';

class RequestBody extends React.Component {
    constructor(props) {
        super(props);

        this.body = this.props.body;
        this.updateParentOnChange = this.props.onComponentParamsUpdate;
        // Store the contents of the text area so it is not lost when users 
        // are switching between body types
        this.rawBodyContentsTextArea = '';
    }

    handleBodyTypeChange = (event) => {

        let bodyType = event.target.value;

        if (bodyType === 'no') {
            this.body = {
                type: 'no'
            };
        } else if (bodyType === 'raw') {
            this.body = defaultRawBodyObject;
        }

        // Restore the contents area of the text box
        this.body.content = this.rawBodyContentsTextArea;
        console.log('rawBodyContentsTextArea ' + this.rawBodyContentsTextArea);

        this.updateParentOnChange(this.body);

    }

    handleRawBodyTypeChange = (event) => {
        this.body.contentType = event.target.id;   
        this.updateParentOnChange(this.body);
        console.log('f ' + JSON.stringify(this.body));
    }

    handleRawBodyContentChange = (event) => {
        this.rawBodyContentsTextArea = event.target.value;
        this.body.content = this.rawBodyContentsTextArea;
        this.updateParentOnChange(this.body);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.body = nextProps.body;
        return true;
    }



    render() {
        return (<>
         <h5>Request Body</h5>
         <select
            value={this.body.type}
            onChange={this.handleBodyTypeChange}>

            <option value="no">None</option>
            <option value="raw">Raw</option>
            <option value="file">File</option>
        </select>

        {
            this.body.type === 'raw' ? 
            <div>
                <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" checked={this.body.contentType === 'raw-text'} className="custom-control-input" id="raw-text" name="raw-type" onChange={this.handleRawBodyTypeChange}/>
                <label className="custom-control-label" htmlFor="raw-text">Text</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" checked={this.body.contentType  === 'raw-json'} className="custom-control-input" id="raw-json" name="raw-type" onChange={this.handleRawBodyTypeChange}/>
                    <label className="custom-control-label" htmlFor="raw-json">JSON</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" checked={this.body.contentType  === 'raw-xml'} className="custom-control-input" id="raw-xml" name="raw-type" onChange={this.handleRawBodyTypeChange}/>
                    <label className="custom-control-label" htmlFor="raw-xml">XML</label>
                </div>
            
        
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" checked={this.body.contentType  === 'raw-javascript'} className="custom-control-input" id="raw-javascript" name="raw-type" onChange={this.handleRawBodyTypeChange}/>
                    <label className="custom-control-label" htmlFor="raw-javascript">JavaScript</label>
                </div>

                <div className="form-group">
                    <label htmlFor="rawBodyContent">Large textarea</label>
                    <textarea className="form-control rounded-0" id="rawBodyContent" value={this.body.content}rows="8" onChange={this.handleRawBodyContentChange}></textarea>
                </div>

            </div>
            :

            <div></div>
        } 

        </>);
    }

   
}


export default RequestBody;