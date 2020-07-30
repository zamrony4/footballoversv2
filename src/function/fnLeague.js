// Import Data
import api from "../data/api.js";

// Import Function
import { dateDiff, dateFormat } from "./fnDate.js";
import { saveMatch, deleteMatch, getMatchAll, saveClub, deleteClub, getClubAll } from "./fnDatabase.js";

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

const getClubByID = (idClub) => {
    const urlApi = `${api.url}teams/${idClub}`

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
                    getClubAll().then((favclub) => {
                        let clubHtml = ''
                        result.teams.forEach(res => {
                            let classFav = 'blue-grey lighten-5 blue-grey-text text-darken-4'
                            
                            const checkDb = favclub.filter((club) => {
                                return club.id === res.id
                            })

                            if (checkDb.length > 0) {
                                classFav = 'yellow darken-3 select'
                            }

                            clubHtml += `
                            <div class="col s12 m6">
                                <a href="#/club/${res.id}">
                                    <div class="card card-content padding-10">
                                        <div class="row">
                                            <div class="col s4 m4 center-align"><img height="100px" src="${res.crestUrl}"></div>
                                            <div class="col s8 m8 center-align">
                                                <h5 class="font-club bold black-text">${res.name}</h5>
                                                <div class="row">
                                                    <div class="col s12 center-align mt-3">
                                                        <a href="javascript:void(0)" data-idclub="${res.id}" class="club-fav waves-effect waves-light btn-small ${classFav} w-100"><i class="material-icons left ">favorite</i>Favorite</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            `
                        });
            
                        const mainHtml = `<div class="row">${clubHtml}</div>`
                        const clubPage = document.getElementById('club')
            
                        clubPage.innerHTML = mainHtml
    
                        // Fav Club
                        document.querySelectorAll(".club-fav").forEach(elm => {
                            elm.addEventListener("click", event => {
                                const idClub = elm.getAttribute("data-idclub");
                                
                                if (elm.classList.contains("select")) {
                                    elm.classList.remove('yellow', 'darken-3', 'select')
                                    elm.classList.add('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                                    deleteClub(idClub)
                                } else {
                                    elm.classList.remove('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                                    elm.classList.add('yellow', 'darken-3', 'select')
    
                                    const dataClub = getClubByID(idClub)
                                    dataClub.then(result => {
                                        saveClub(idClub, result)
                                    })
                                }
                            })
                        })
                    })
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
        getClubAll().then((favclub) => {
            let clubHtml = ''
            result.teams.forEach(res => {
                let classFav = 'blue-grey lighten-5 blue-grey-text text-darken-4'
                            
                const checkDb = favclub.filter((club) => {
                    return club.id === res.id
                })

                if (checkDb.length > 0) {
                    classFav = 'yellow darken-3 select'
                }

                clubHtml += `
                <div class="col s12 m6">
                    <a href="#/club/${res.id}">
                        <div class="card card-content padding-10">
                            <div class="row">
                                <div class="col s4 center-align"><img height="100px" src="${res.crestUrl}"></div>
                                <div class="col s8 center-align">
                                    <h5 class="font-club bold black-text">${res.name}</h5>
                                    <div class="row">
                                        <div class="col s12 center-align mt-3">
                                            <a href="javascript:void(0)" data-idclub="${res.id}" class="club-fav waves-effect waves-light btn-small ${classFav} w-100"><i class="material-icons left ">favorite</i>Favorite</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                `
            });
    
            const mainHtml = `<div class="row">${clubHtml}</div>`
    
            const clubPage = document.getElementById('club')
            clubPage.innerHTML = mainHtml
    
            // Fav Club
            document.querySelectorAll(".club-fav").forEach(elm => {
                elm.addEventListener("click", event => {
                    const idClub = elm.getAttribute("data-idclub");
                    
                    if (elm.classList.contains("select")) {
                        elm.classList.remove('yellow', 'darken-3', 'select')
                        elm.classList.add('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                        deleteClub(idClub)
                    } else {
                        elm.classList.remove('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                        elm.classList.add('yellow', 'darken-3', 'select')
    
                        const dataClub = getClubByID(idClub)
                        dataClub.then(result => {
                            saveClub(idClub, result)
                        })
                    }
                })
            }) 
        })
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

    if ('caches' in window) {
        caches.match(urlApi)
        .then(response => {
            if (response) {
                response.json().then(result => {
                    getMatchAll().then((favmatch) => {

                        let dataHtml = '';
                        let countLeague = 0;
                        
                        for (let i = 0; i < dateDiff(dateFrom,dateTo); i++) {
                            const dateFull    = dateFormat(3, i, dateFrom)
                            const dateDefault = dateFormat(1, i, dateFrom)
                            
                            let matchHtml = '';
                            let matchCount = 0;
                            result.matches.forEach(rest => {
                                if (dateDefault === dateFormat(1, 0, rest.utcDate)) {
                                    ++matchCount;
                                    const scoreHome = rest.score.fullTime.homeTeam === null ? '' : rest.score.fullTime.homeTeam
                                    const scoreAway = rest.score.fullTime.awayTeam === null ? '' : rest.score.fullTime.awayTeam
                                    const winHome = rest.score.winner === 'HOME_TEAM' ? 'bold' : ''
                                    const winAway = rest.score.winner === 'AWAY_TEAM' ? 'bold' : ''
                                    const statusMatch = rest.status === 'FINISHED' ? `<div class="row"><div class="col s5 center-align ${winHome}">${scoreHome}</div><div class="col s2 center-align"></div><div class="col s5 center-align ${winAway}">${scoreAway}</div></div>` : ` <div class="row">
                                    <div class="col s12 center-align">${rest.status}</div></div>`

                                    let classFav = 'blue-grey lighten-5 blue-grey-text text-darken-4'
                                    const checkDb = favmatch.filter((match) => {
                                        return match.id === rest.id
                                    })

                                    if (checkDb.length > 0) {
                                        classFav = 'yellow darken-3 select'
                                    }

                                    matchHtml += `
                                        <div class="col s12 m6">
                                            <div class="card card-content padding-10">
                                                <div class="row">
                                                    <div class="col s5 center-align ${winHome}">${rest.homeTeam.name}</div>
                                                    <div class="col s2 center-align">VS</div>
                                                    <div class="col s5 center-align ${winAway}">${rest.awayTeam.name}</div>
                                                </div>
                                                ${statusMatch}
                                                <div class="row">
                                                    <div class="col s12 center-align">
                                                        <a href="javascript:void(0)" data-idmatch="${rest.id}" class="match-fav waves-effect waves-light btn-small ${classFav}"><i class="material-icons left ">favorite</i>Favorite</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }
                            });
    
                            if (matchCount > 0) {
                                dataHtml += `
                                    <div class="col s12">
                                        <div class="card card-content blue-grey lighten-4 padding-10">
                                            <span class="card-title">${dateFull}</span>
                                        </div>
                                    </div>
                                    ${matchHtml}
                                `
                            }
    
                            countLeague = countLeague + matchCount
                        }
    
                        if (countLeague === 0) {
                            dataHtml = `<div class="center-align"><h1>Data Not Found</h1></div>`
                        }
    
                        const mainHtml = `
                                <div class="row">${dataHtml}</div>
                        `
                        const fixturesPage = document.getElementById('fixtures')
                        fixturesPage.innerHTML = mainHtml
    
                        // Fav Match
                        document.querySelectorAll(".match-fav").forEach(elm => {
                            elm.addEventListener("click", event => {
                                const idMatch = elm.getAttribute("data-idmatch");
                                
                                if (elm.classList.contains("select")) {
                                    elm.classList.remove('yellow', 'darken-3', 'select')
                                    elm.classList.add('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                                    deleteMatch(idMatch)
                                } else {
                                    elm.classList.remove('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                                    elm.classList.add('yellow', 'darken-3', 'select')
    
                                    const dataMatch = getMatcheByID(idMatch)
                                    dataMatch.then(result => {
                                        saveMatch(idMatch, result.match)
                                    })
                                }
                            })
                        }) 
                    })
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
    .then(result =>  {
        getMatchAll().then((favmatch) => {
            let dataHtml = '';
            let countLeague = 0;
            
            for (let i = 0; i < dateDiff(dateFrom,dateTo); i++) {
                const dateFull    = dateFormat(3, i, dateFrom)
                const dateDefault = dateFormat(1, i, dateFrom)
                
                let matchHtml = '';
                let matchCount = 0;
                result.matches.forEach(rest => {
                    if (dateDefault === dateFormat(1, 0, rest.utcDate)) {
                        ++matchCount;
                        const scoreHome = rest.score.fullTime.homeTeam === null ? '' : rest.score.fullTime.homeTeam
                        const scoreAway = rest.score.fullTime.awayTeam === null ? '' : rest.score.fullTime.awayTeam
                        const winHome = rest.score.winner === 'HOME_TEAM' ? 'bold' : ''
                        const winAway = rest.score.winner === 'AWAY_TEAM' ? 'bold' : ''
                        const statusMatch = rest.status === 'FINISHED' ? `<div class="row"><div class="col s5 center-align ${winHome}">${scoreHome}</div><div class="col s2 center-align"></div><div class="col s5 center-align ${winAway}">${scoreAway}</div></div>` : ` <div class="row">
                        <div class="col s12 center-align">${rest.status}</div></div>`

                        let classFav = 'blue-grey lighten-5 blue-grey-text text-darken-4'
                        const checkDb = favmatch.filter((match) => {
                            return match.id === rest.id
                        })

                        if (checkDb.length > 0) {
                            classFav = 'yellow darken-3 select'
                        }

                        matchHtml += `
                            <div class="col s12 m6">
                                <div class="card card-content padding-10">
                                    <div class="row">
                                        <div class="col s5 center-align ${winHome}">${rest.homeTeam.name}</div>
                                        <div class="col s2 center-align">VS</div>
                                        <div class="col s5 center-align ${winAway}">${rest.awayTeam.name}</div>
                                    </div>
                                    ${statusMatch}
                                    <div class="row">
                                        <div class="col s12 center-align">
                                            <a href="javascript:void(0)" data-idmatch="${rest.id}" class="match-fav waves-effect waves-light btn-small ${classFav}"><i class="material-icons left ">favorite</i>Favorite</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                });
    
                if (matchCount > 0) {
                    dataHtml += `
                        <div class="col s12">
                            <div class="card card-content blue-grey lighten-4 padding-10">
                                <span class="card-title">${dateFull}</span>
                            </div>
                        </div>
                        ${matchHtml}
                    `
                }
                countLeague = countLeague + matchCount
            }
    
            if (countLeague === 0) {
                dataHtml = `<div class="center-align"><h1>Data Not Found</h1></div>`
            }
    
            const mainHtml = `
                    <div class="row">${dataHtml}</div>
            `
            const fixturesPage = document.getElementById('fixtures')
            fixturesPage.innerHTML = mainHtml
    
            // Fav Match
            document.querySelectorAll(".match-fav").forEach(elm => {
                elm.addEventListener("click", event => {
                    const idMatch = elm.getAttribute("data-idmatch");
                    
                    if (elm.classList.contains("select")) {
                        elm.classList.remove('yellow', 'darken-3', 'select')
                        elm.classList.add('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                        deleteMatch(idMatch)
                    } else {
                        elm.classList.remove('blue-grey', 'lighten-5', 'blue-grey-text', 'text-darken-4')
                        elm.classList.add('yellow', 'darken-3', 'select')
    
                        const dataMatch = getMatcheByID(idMatch)
                        dataMatch.then(result => {
                            saveMatch(idMatch, result.match)
                        })
                    }
                })
            })            
        })
    })
}

export {getMatcheByID, loadClub, loadTable, loadFixtures}