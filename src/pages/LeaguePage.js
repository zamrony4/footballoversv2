// import data
import league from "../data/league.js";

class LeaguePage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        let leageuHtml = `<div class="row">`
        league.forEach(result => {
            leageuHtml += `
            <a href="#/leagueid/${result.id}" class="league-det">
                <div class="col s6 m4">
                    <div class="card">
                        <div class="card-content">
                            <img class="responsive-img" src="./assets/images/logo/${result.logo}">
                        </div>
                    </div>
                </div>
                </a>
            `
        });

        this.innerHTML = `<div class="container mt-3"><div class="row">${leageuHtml}</div></div>`;

        // Detail Match
        document.querySelectorAll(".league-det").forEach(elm => {
            elm.addEventListener("click", event => {
                const mainPage = document.querySelector('main-page')

                const page = elm.getAttribute("href").split('/')[1];
                const idLeague = elm.getAttribute("href").split('/')[2];
                
                mainPage.id = idLeague
                mainPage.page = page
            })
        })
    }
}

customElements.define("league-page", LeaguePage);