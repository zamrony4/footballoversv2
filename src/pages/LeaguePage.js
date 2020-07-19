class LeaguePage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `
            <h1>League</h1>
        `;
    }
}

customElements.define("league-page", LeaguePage);