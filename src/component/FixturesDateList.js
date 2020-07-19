// Import Data
import api from "../data/api.js";
import league from "../data/league.js";


class FixturesDateList extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set idLeague(idLeague) {
        this._idLeague = idLeague
    }

    set dateFrom(dateFrom) {
        this._dateFrom = dateFrom
    }

    set dateTo(dateTo) {
        this._dateTo = dateTo
    }

    render() {
        let idLeaguePar = this._idLeague === 0 ? '2021,2014,2002,2019,2015' : this._idLeague
        const urlApi = `${api.url}matches?competitions=${idLeaguePar}&dateFrom=${this._dateFrom}&dateTo=${this._dateTo}`
        
        this.innerHTML = `
            <div class="center-align">
                <div class="preloader-wrapper big active mt-5">
                    <div class="spinner-layer spinner-green-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        fetch(urlApi, {
            method: 'GET',
            headers: {
                'X-Auth-Token': api.token
            }
        })
        .then(response => response.json())
        .then(result =>  {
            let dataHtml = '';
            let countLeague = 0;
            
            league.forEach(res => {

                let matchHtml = '';
                let matchCount = 0;
                result.matches.forEach(rest => {
                    if (res.id === rest.competition.id) {
                        ++matchCount;
                        const scoreHome = rest.score.fullTime.homeTeam === null ? '' : rest.score.fullTime.homeTeam
                        const scoreAway = rest.score.fullTime.awayTeam === null ? '' : rest.score.fullTime.awayTeam
                        const statusMatch = rest.status === 'FINISHED' ? `<div class="row"><div class="col s5 center-align">${scoreHome}</div><div class="col s2 center-align"></div><div class="col s5 center-align">${scoreAway}</div></div>` : ` <div class="row">
                        <div class="col s12 center-align">${rest.status}</div></div>`
                        matchHtml += `
                            <div class="col s12 m6">
                                <div class="card card-content padding-10">
                                    <div class="row">
                                        <div class="col s5 center-align bold">${rest.homeTeam.name}</div>
                                        <div class="col s2 center-align">VS</div>
                                        <div class="col s5 center-align">${rest.awayTeam.name}</div>
                                    </div>
                                    ${statusMatch}
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

            const mainHtml = `
                <div class="container">
                    <div class="row">${dataHtml}</div>
                </div>
            `
            this.innerHTML = mainHtml
            
        })
    }
}

customElements.define("fixtures-date-list", FixturesDateList);