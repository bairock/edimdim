const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs";
const token = "bc56c96509f42e0116f2deb3affc3e0d7cf721d8";
// const query = { lat: 55.878, lon: 37.653 };

export const pointToAddress = ({ longitude, latitude }) => {
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ lat: latitude, lon: longitude })
    }

    return fetch(url + '/geolocate/address', options)
}

export const getSuggest = (query) => {

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            query,
            count: 5,
            locations: [
                { "kladr_id": "14" }
            ]
        })
    }

    return fetch(url + '/suggest/address', options)
}