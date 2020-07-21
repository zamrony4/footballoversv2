// import Data
import api from "../data/api.js";

class ClubList extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set idleague(idleague) {
        this._idleague = idleague
    }

    render() {
        const urlApi = `${api.url}competitions/${this._idleague}/teams`

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
                                        <a href="#/match/${res.id}" class="match-det waves-effect waves-light btn-small blue lighten-1 w-100"><i class="material-icons left">info</i>Detail</a>
                                    </div>
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

            const mainHtml = `<div class="container"><div class="row">${clubHtml}</div></div>`
            console.log(result);

            this.innerHTML = mainHtml
        })
    }
}

customElements.define("club-list", ClubList);