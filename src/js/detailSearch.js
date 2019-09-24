const endpoint1 = 'https://atom-bus-search-api.serveo.net/';
const endpoint2 = 'https://a03f115d.ap.ngrok.io/';

const getOnlyLocalBus = () => {
    return fetch(endpoint1 + 'searchBusRoute')
        .then(res => res.json())
        .catch(err => console.error(err))
};


export default getOnlyLocalBus;
