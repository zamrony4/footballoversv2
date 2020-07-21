// Import Data
import api from "../data/api.js";
// import league from "../data/league.js";

// Import Function
// import { dateDiff, dateFormat } from "./fnDateFormat.js";
// import { saveMatch } from "./database.js";

const getMatcheByID = (idMatch) => {
    const urlApi = `${api.url}matches/${idMatch}`

    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(urlApi).then(response => {
                if (response) {
                    response.json().then(data => {
                        resolve(data)
                    })
                }
            })
        }

        fetch(urlApi, {
            method: 'GET',
            headers: {
                'X-Auth-Token': api.token
            }
        }).then(response => {
            if (response) {
                response.json().then(data => {
                    resolve(data)
                })
            }
        })

    })
}

export {getMatcheByID}