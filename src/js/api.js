const url = 'https://atom-bus-search-api.serveo.net';

const requestURL = (url, params = {}) => {
    return fetch(url, params)
        .then(res => res.json())
        // eslint-disable-next-line
        .catch(err => console.error(err))
};

const generateURL = (params) => {
    return url + params;
};

const getLocalBusRoute = (data, onSuccess, onError) => {
    // クライアント作成のなかで共通化できそう
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    // catchを複数しているけど一箇所で良さそう？
    return requestURL(generateURL("/searchBusRoute"), params)
        .then(res => onSuccess(res))
        .catch(err => onError(err));
};

const getLocalBusByGeo = (data, onSuccess, onError) => {
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    return requestURL(generateURL("/searchBusRouteGridFrom"), params)
        .then(res => onSuccess(res))
        .catch(err => onError(err));
};

export {getLocalBusRoute, getLocalBusByGeo};
