class FavouritesPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `
            <h1>Favourites</h1>
        `;
    }
}

customElements.define("favourites-page", FavouritesPage);