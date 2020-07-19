import "./LeaguePage.js";
import "./HomePage.js";
import "./FavouritesPage.js";

class MainPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    set page(page)  {
        this._page = page;
        this.render();
    }

    render() {
        this.innerHTML = "";

        const pageHome = document.createElement("home-page")
        const leagueHome = document.createElement("league-page")
        const favouritesHome = document.createElement("favourites-page")

        let pageDefault = pageHome
        if (this._page === 'home') {
            pageDefault = pageHome
        } else if (this._page === 'league') {
            pageDefault = leagueHome
        } else if (this._page === 'favourites') {
            pageDefault = favouritesHome
        } 

        this.appendChild(pageDefault)
    }
}

customElements.define("main-page", MainPage);