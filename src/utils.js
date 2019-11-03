export const logObject = (o) => {
    console.log(JSON.stringify(o));
}

export const defaultBodyObject = {
    type: 'no',
    contentType: '',
    content: ''
}

export const defaultRawBodyObject = {
    type: 'raw',
    contentType: 'raw-text',
    content: ''
}