import React from 'react';

const HeadersForm = props => (
    <div>
        <p>{props.headers.name}</p>
        <input type="text"/>
        <input type="text"/>
        <button>x</button>
    </div>
);

export default HeadersForm;