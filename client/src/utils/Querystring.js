
export const get = (querystring) => {
    const object = {}
    querystring
                .replace("?", "")
                .split("&")
                .forEach(item => {
                    const value = item.split("=")
                    object[value[0]] = value[1]
                });

    return object;
}

export const getByKey = (key) => {
    return get()[key];
}