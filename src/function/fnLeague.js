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

const loadClub = (idLeague) => {
    const urlApi = `${api.url}competitions/${idLeague}/teams`

    if ('caches' in window) {
        caches.match(urlApi)
        .then(response => {
            if (response) {
                response.json().then(result => {
                    let clubHtml = ''
                    result.teams.forEach(res => {
                        clubHtml += `
                        <div class="col s12 m4">
                            <div class="card card-content padding-10">
                                <div class="row">
                                    <div class="col s4"><img width="100%" src="${res.crestUrl}"></div>
                                    <div class="col s8 center-align">
                                        <span class="font-6 bold">${res.name}</span>
                                        <div class="row">
                                            <div class="col s12 center-align mt-3">
                                                <a href="javascript:void(0)" data-idmatch="${res.id}" class="match-fav waves-effect waves-light btn-small blue-grey lighten-5 blue-grey-text text-darken-4 w-100"><i class="material-icons left ">favorite</i>Favorite</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    });
        
                    const mainHtml = `<div class="row">${clubHtml}</div>`
                    const clubPage = document.getElementById('club')
        
                    clubPage.innerHTML = mainHtml
                })
            }
        })
    }

    fetch(urlApi, {
        method: 'GET',
        headers: {
            'X-Auth-Token': api.token
        }
    })
    .then(response => response.json())
    .then(result => {
        let clubHtml = ''
        result.teams.forEach(res => {
            clubHtml += `
            <div class="col s12 m4">
                <div class="card card-content padding-10">
                    <div class="row">
                        <div class="col s4"><img width="100%" src="${res.crestUrl}"></div>
                        <div class="col s8 center-align">
                            <span class="font-6 bold">${res.name}</span>
                            <div class="row">
                                <div class="col s12 center-align mt-3">
                                    <a href="javascript:void(0)" data-idmatch="${res.id}" class="match-fav waves-effect waves-light btn-small blue-grey lighten-5 blue-grey-text text-darken-4 w-100"><i class="material-icons left ">favorite</i>Favorite</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        });

        const mainHtml = `<div class="row">${clubHtml}</div>`

        const clubPage = document.getElementById('club')
        clubPage.innerHTML = mainHtml
    })
}

const loadTable = (idLeague) => {
    const urlApi = `${api.url}competitions/${idLeague}/standings`

    if ('caches' in window) {
        caches.match(urlApi)
        .then(response => {
            if (response) {
                response.json().then(result => {
                    let resHtml = ""
                    resHtml += `<table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>TEAM</th>
                                <th>P</th>
                                <th>GD</th>
                                <th>PTS</th>
                            </tr>
                            </thead>
                            <tbody>`

                    result.standings[0].table.forEach(res => {
                        resHtml += `
                            <tr>
                                <td>${res.position}</td>
                                <td>${res.team.name}</td>
                                <td>${res.playedGames}</td>
                                <td>${res.goalDifference}</td>
                                <td>${res.points}</td>
                            </tr>
                        `
                    });
                    
                    resHtml += '</tbody></table>'

                    const tablePage = document.getElementById('table')
                    tablePage.innerHTML = resHtml
                })
            }
        })
    }

    fetch(urlApi, {
        method: 'GET',
        headers: {
            'X-Auth-Token': api.token
        }
    })
    .then(response => response.json())
    .then(result => {
        let resHtml = ""
        resHtml += `<table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>TEAM</th>
                    <th>P</th>
                    <th>GD</th>
                    <th>PTS</th>
                </tr>
                </thead>
                <tbody>`

        result.standings[0].table.forEach(res => {
            resHtml += `
                <tr>
                    <td>${res.position}</td>
                    <td>${res.team.name}</td>
                    <td>${res.playedGames}</td>
                    <td>${res.goalDifference}</td>
                    <td>${res.points}</td>
                </tr>
            `
        });
        
        resHtml += '</tbody></table>'

        const tablePage = document.getElementById('table')
        tablePage.innerHTML = resHtml
    })
}

const loadFixtures = (idLeague, dateFrom, dateTo) => {
    const urlApi = `${api.url}matches?competitions=${idLeague}&dateFrom=${dateFrom}&dateTo=${dateTo}`
}
export {getMatcheByID, loadClub, loadTable}