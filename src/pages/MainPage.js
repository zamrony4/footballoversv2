import "./NotFoundPage.js";
import "./LeaguePage.js";
import "./HomePage.js";
import "./FavouritesPage.js";
import "./LeagueIdPage.js";

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
        const favouritesHome = document.createElement("favourites-page")
        const matchHome = document.createElement("match-page")
        const leagueIdHome = document.createElement("league-id-page")

        let pageDefault = notFoundHome
        if (this._page === 'home') {
            pageDefault = pageHome
        } else if (this._page === 'league') {
            pageDefault = leagueHome
        } else if (this._page === 'favourites') {
            pageDefault = favouritesHome
        } else if (this._page === 'leagueid') {
            leagueIdHome.idleague = this._id
            pageDefault = leagueIdHome
        } 
        
        this.appendChild(pageDefault)
    }
}

customElements.define("main-page", MainPage);