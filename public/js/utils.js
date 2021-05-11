export const elemIdPrefixMatches = (element, idPrefix) => {

    return element.id.startsWith(idPrefix)

}


export const elemIdPostfixMatches = (element, idPostfix) => {

    return element.id.startsWith(idPostfix)

}

export const getElemIdPostfix = element => element.id.split("_")[1]

export const getElemIdPrefix = element => element.id.split("_")[0]