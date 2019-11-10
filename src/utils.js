import iconvlite from 'iconv-lite';

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

export const rodanExtensionId = "bknfgfadffijnjekpinmhaohijbnchnn";

export const bufferToString =  (buffer, charset) => {
    if (!buffer) {
        console.log('not a buffer')
        return buffer || '';
    }

    if (buffer instanceof Buffer) {
        if (iconvlite.encodingExists(charset)) {
            return iconvlite.decode(buffer, charset);
        } else {
            return buffer.toString(); 
        }
    }

    return buffer;
}

export const base64ToBuffer = base64 => {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return new Buffer(bytes.buffer);
}