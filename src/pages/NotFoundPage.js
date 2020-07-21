class NotFoundPage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="container center-align">
                <h3>Page Not Found</h3>
            </div>
        `;
    }
}

customElements.define("not-found-page", NotFoundPage);