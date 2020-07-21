// import Data
import api from "../data/api.js";

class MatchPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set idmatch(idmatch)  {
        this._idmatch = idmatch;
    }

    render() {
        const idMatch = window.location.hash.split('/')[2];
        let idMatchTemp = this._idmatch
        if (idMatch) {
            idMatchTemp = idMatch            
        }
        const urlApi = `${api.url}matches/${idMatchTemp}`
        
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
        .then(result => {
            console.log(result);
            const dataMatch = result.match
            const scoreHome = dataMatch.score.fullTime.homeTeam === null ? '' : dataMatch.score.fullTime.homeTeam
            const scoreAway = dataMatch.score.fullTime.awayTeam === null ? '' : dataMatch.score.fullTime.awayTeam
            const winHome = dataMatch.score.winner === 'HOME_TEAM' ? 'bold' : ''
            const winAway = dataMatch.score.winner === 'AWAY_TEAM' ? 'bold' : ''
            const statusMatch = dataMatch.status === 'FINISHED' ? `<div class="row"><div class="col s5 center-align ${winHome}">${scoreHome}</div><div class="col s2 center-align"></div><div class="col s5 center-align ${winAway}">${scoreAway}</div></div>` : ` <div class="row">
            <div class="col s12 center-align">${dataMatch.status}</div></div>`
            this.innerHTML = `
                <div class="container mt-3">
                    <div class="card card-content padding-10">
                        <div class="row">
                            <div class="col s5 center-align ${winHome}">${dataMatch.homeTeam.name}</div>
                            <div class="col s2 center-align">VS</div>
                            <div class="col s5 center-align ${winAway}">${dataMatch.awayTeam.name}</div>
                        </div>
                        ${statusMatch}
                    </div>
                </div>
            `;
        })
    }
}

customElements.define("match-page", MatchPage);