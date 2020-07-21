// import Data
import league from "../data/league.js";

// import component
import "../component/ClubList.js";

class LeagueIdPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set idleague(idleague)  {
        this._idleague = idleague;
    }

    render() {
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
                    <li class="tab col s3"><a href="#test1" class="active data-tabs">Club</a></li>
                    <li class="tab col s3"><a href="#test2" class="data-tabs">Table</a></li>
                    <li class="tab col s3"><a href="#test3" class="data-tabs">Fixtures</a></li>
                </ul>
            </div>
        `;

        const tabClass = document.querySelectorAll('.tabs');
        M.Tabs.init(tabClass);

        const listClub = document.createElement('club-list')
        listClub.idleague = idLeagueTemp
        this.append(listClub)
    }
}

customElements.define("league-id-page", LeagueIdPage);