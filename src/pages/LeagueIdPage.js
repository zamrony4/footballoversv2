// import Data
import league from "../data/league.js";

// import function
import { loadClub, loadTable, loadFixtures } from "../function/fnLeague.js";
import { dateFormat } from "../function/fnDate.js";

class LeagueIdPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set idleague(idleague)  {
        this._idleague = idleague;
    }

    render() {
        const dateFrom = dateFormat(1, -2);
        const dateTo = dateFormat(1, 2)

        const idLeague = window.location.hash.split('/')[2];
        let idLeagueTemp = this._idleague

        if (idLeague) {
            idLeagueTemp = idLeague            
        }

        const dataLeague = league.filter( res => {
            return res.id == idLeagueTemp
        })
        
        this.innerHTML = `
            <div class="container mt-3">
                <div class="card card-content blue-grey lighten-4 padding-10">
                    <span class="card-title">${dataLeague[0].name}</span>
                </div>

                <ul class="tabs mb-3" id="home-tabs">
                    <li class="tab col s3"><a href="#club" class="active data-tabs">Club</a></li>
                    <li class="tab col s3"><a href="#table" class="data-tabs">Table</a></li>
                    <li class="tab col s3"><a href="#fixtures" class="data-tabs">Fixtures</a></li>
                </ul>

                <div id="club" class="col s12">
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
                </div>
                <div id="table" class="col s12">
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
                </div>
                <div id="fixtures" class="col s12">
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
                </div>
            </div>
        `;

        const tabClass = document.querySelectorAll('.tabs');
        M.Tabs.init(tabClass);
        loadClub(idLeagueTemp)
        loadTable(idLeagueTemp)
        loadFixtures(idLeagueTemp, dateFrom, dateTo)
    }
}

customElements.define("league-id-page", LeagueIdPage);