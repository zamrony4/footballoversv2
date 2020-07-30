import "./NotFoundPage.js";
import "./LeaguePage.js";
import "./HomePage.js";
import "./FavoritesPage.js";
import "./LeagueIdPage.js";
import "./ClubPage.js";

class MainPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set page(page)  {
        this._page = page;
        this.render();
    }

    set id(id)  {
        this._id = id;
        this.render();
    }

    render() {
        this.innerHTML = "";

        const notFoundHome = document.createElement("not-found-page")
        const pageHome = document.createElement("home-page")
        const leagueHome = document.createElement("league-page")
        const favoritesHome = document.createElement("favorites-page")
        const leagueIdHome = document.createElement("league-id-page")
        const clubHome = document.createElement("club-page")

        let pageDefault = notFoundHome
        if (this._page === 'home') {
            pageDefault = pageHome
        } else if (this._page === 'league') {
            pageDefault = leagueHome
        } else if (this._page === 'favorites') {
            pageDefault = favoritesHome
        } else if (this._page === 'leagueid') {
            leagueIdHome.idleague = this._id
            pageDefault = leagueIdHome
        } else if (this._page === 'club') {
            clubHome.idclub = this._id
            pageDefault = clubHome
        } 
        
        this.appendChild(pageDefault)
    }
}

customElements.define("main-page", MainPage);