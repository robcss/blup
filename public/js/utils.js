export const elemIdPrefixMatches = (element, idPrefix) => {

    return element.id.startsWith(idPrefix)

}


export const elemIdPostfixMatches = (element, idPostfix) => {

    return element.id.startsWith(idPostfix)

}

export const getElemIdPostfix = element => element.id.split("_")[1]

export const getElemIdPrefix = element => element.id.split("_")[0]


export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
} // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript