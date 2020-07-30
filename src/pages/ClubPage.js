// import data
import api from "../data/api.js";
import league from "../data/league.js";

// import function
import { getMatchAll, getClubAll } from "../function/fnDatabase.js";
import { dateFormat } from "../function/fnDate.js";

class ClubPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set idclub(idclub){
        this._idclub = idclub
    }

    render() {
        const idClub = window.location.hash.split('/')[2];
        let idClubTemp = this._idclub

        if (idClub) {
            idClubTemp = idClub            
        }

        const urlApi = `${api.url}teams/${idClubTemp}`
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
        `

        if ('caches' in window) {
            caches.match(urlApi)
            .then(response => {
                if (response) {
                    response.json().then(result => {
                        let squadHtml = '';
                        result.squad.forEach(res => {
                            squadHtml += `
                                <div class="col s12">
                                    <div class="card card-content padding-10">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>${res.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Position</td>
                                                    <td>${res.position}</td>
                                                </tr>
                                                <tr>
                                                    <td>Nationality</td>
                                                    <td>${res.nationality}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            `
                        });

                        this.innerHTML = `
                            <div class="center-align mt-3 mb-3">
                                <img height="200px" src="${result.crestUrl}">
                            </div>
                            <ul class="tabs mb-3" id="home-tabs">
                                <li class="tab col s3"><a href="#profil" class="active data-tabs">Profil</a></li>
                                <li class="tab col s3"><a href="#squad" class="active data-tabs">Squad</a></li>
                            </ul>
                            <div class="container">
                                <div id="profil">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>${result.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Stadium</td>
                                                <td>${result.venue}</td>
                                            </tr>
                                            <tr>
                                                <td>Founded</td>
                                                <td>${result.founded}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="squad">
                                    <div class="row">
                                        ${squadHtml}
                                    </div>
                                </div>
                            </div>
                        `;
                
                        const tabClass = document.querySelectorAll('.tabs');
                        M.Tabs.init(tabClass);
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
            let squadHtml = '';
            result.squad.forEach(res => {
                squadHtml += `
                    <div class="col s12">
                        <div class="card card-content padding-10">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>${res.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Position</td>
                                        <td>${res.position}</td>
                                    </tr>
                                    <tr>
                                        <td>Nationality</td>
                                        <td>${res.nationality}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `
            });

            this.innerHTML = `
                <div class="center-align mt-3 mb-3">
                    <img height="200px" src="${result.crestUrl}">
                </div>
                <ul class="tabs mb-3" id="home-tabs">
                    <li class="tab col s3"><a href="#profil" class="active data-tabs">Profil</a></li>
                    <li class="tab col s3"><a href="#squad" class="active data-tabs">Squad</a></li>
                </ul>
                <div class="container">
                    <div id="profil">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>${result.name}</td>
                                </tr>
                                <tr>
                                    <td>Stadium</td>
                                    <td>${result.venue}</td>
                                </tr>
                                <tr>
                                    <td>Founded</td>
                                    <td>${result.founded}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="squad">
                        <div class="row">
                            ${squadHtml}
                        </div>
                    </div>
                </div>
            `;
    
            const tabClass = document.querySelectorAll('.tabs');
            M.Tabs.init(tabClass);
        })
    }
}

customElements.define("club-page", ClubPage);