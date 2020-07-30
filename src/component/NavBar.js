// import data
import navData from "../data/navData.js";

// import Component & pages
import "../pages/MainPage.js";

class NavBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        let sideNav = '';
        let mainNav = '';
        
        navData.forEach(result => {
            sideNav += `<li><a class="waves-effect" href="${result.url}"><i class="material-icons">${result.icon}</i>${result.name}</a></li>`;
            mainNav += `<li><a class="waves-effect" href="${result.url}">${result.name}</a></li>`;
        });

        this.innerHTML = `
            <ul class="sidenav" id="nav-mobile">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <img src="../../assets/images/background.jpg">
                        </div>
                        <a href="#user"><img class="circle" src="../../assets/images/user.png"></a>
                        <a href="#name"><span class="white-text name">Muhammad Zamroni</span></a>
                        <a href="#email"><span class="white-text email">mzamrony4@gmail.com</span></a>
                    </div>
                </li>
                ${sideNav}
            </ul>
            <div class="navbar-fixed">
                <nav class="green accent-4">
                    <div class="nav-wrapper container">
                    <a href="#" class="brand-logo">Soccer Board</a>
                    <a href="#" class="sidenav-trigger" data-target="nav-mobile">☰</a>
                    
                    <ul class="mainnav right hide-on-med-and-down">${mainNav}</ul>
                    </div>
                </nav>
            </div>
        `;

        const sidenavElem = document.querySelectorAll(".sidenav");
        const option = {'isFixed': true}
        M.Sidenav.init(sidenavElem, option);

        document.querySelectorAll(".sidenav a, .mainnav a").forEach(elm => {
            elm.addEventListener("click", event => {
                const sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();

                const mainPage = document.querySelector('main-page')
    
                const page = event.target.getAttribute("href").split('/')[1];
                mainPage.page = page
            })
        })
    }
}

customElements.define("nav-bar", NavBar);