// import data
import league from "../data/league.js";

// import function
import { getMatchAll, getClubAll } from "../function/fnDatabase.js";
import { dateFormat } from "../function/fnDate.js";

class FavoritesPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {

        this.innerHTML = `
            <div class="card card-content blue-grey lighten-4 padding-10">
                <span class="card-title">Favorites</span>
            </div>

            <ul class="tabs mb-3" id="home-tabs">
                <li class="tab col s3"><a href="#club" class="active data-tabs">Club</a></li>
                <li class="tab col s3"><a href="#fixtures" class="data-tabs">Fixtures</a></li>
            </ul>
            <div class="container">
                <div id="club">Club</div>
                <div id="fixtures">fixtures</div>
            </div>
        `;

        const tabClass = document.querySelectorAll('.tabs');
        M.Tabs.init(tabClass);

        getMatchAll().then((favmatch) => {
            const fixtures = document.getElementById("fixtures");
            let dataHtml = "";
            if (favmatch.length > 0) {
                league.forEach(res => {

                    let matchHtml = '';
                    let matchCount = 0;
                    favmatch.forEach(rest => {
                        if (res.id === rest.competition.id) {
                            ++matchCount;
                            const scoreHome = rest.score.fullTime.homeTeam === null ? '' : rest.score.fullTime.homeTeam
                            const scoreAway = rest.score.fullTime.awayTeam === null ? '' : rest.score.fullTime.awayTeam
                            const winHome = rest.score.winner === 'HOME_TEAM' ? 'bold' : ''
                            const winAway = rest.score.winner === 'AWAY_TEAM' ? 'bold' : ''
                            const statusMatch = rest.status === 'FINISHED' ? `<div class="row"><div class="col s5 center-align ${winHome}">${scoreHome}</div><div class="col s2 center-align"></div><div class="col s5 center-align ${winAway}">${scoreAway}</div></div>` : ` <div class="row">
                            <div class="col s12 center-align">${rest.status}</div></div>`
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
                                                ${dateFormat(3, 0, rest.utcDate)}
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
                                    <span class="card-title">${res.name}</span>
                                </div>
                            </div>
                            ${matchHtml}
                        `
                    }
                });
    
                fixtures.innerHTML = dataHtml
            } else {
                const resHtmlTable = `<div class="center-align"><h4>Data Not Found</h4></div>`
                fixtures.innerHTML = resHtmlTable;
            }
        })

        getClubAll().then((favclub) => {
            const club = document.getElementById("club");
            if (favclub.length > 0) {
                let clubHtml = ''
                favclub.forEach(res => {
                    clubHtml += `
                        <div class="col s12 m4">
                            <a href="#/club/${res.id}">
                                <div class="card card-content padding-10">
                                    <div class="row">
                                        <div class="col s4 m12 center-align"><img height="100px" src="${res.crestUrl}"></div>
                                        <div class="col s8 m12 center-align">
                                            <h5 class="font-club bold black-text">${res.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>`
                });
                const dataHtml = `<div class="row">${clubHtml}</div>`
                club.innerHTML = dataHtml
            } else {
                const resHtmlTable = `<div class="center-align"><h4>Data Not Found</h4></div>`
                club.innerHTML = resHtmlTable
            }
        })
    }
}

customElements.define("favorites-page", FavoritesPage);