// Import Pages
import "../pages/MainPage.js";

// Import Data
import navData from "../data/navData.js";

class NavBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        let sideNav = ""
        let mainNav = ""

        navData.forEach(result => {
            sideNav += `<li><a class="waves-effect" href="${result.url}"><i class="material-icons">${result.icon}</i>${result.name}</a></li>`
            mainNav += `<li><a class="waves-effect" href="${result.url}">${result.name}</a></li>`
        });

        this.innerHTML = `
            <ul class="sidenav" id="nav-mobile">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <img src="../../assets/images/background.jpg">
                        </div>
                        <a href="#user"><img class="circle" src="../../assets/images/user.png"></a>
                        <a href="#name"><span class="white-text name">John Doe</span></a>
                        <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
                    </div>
                </li>
                ${sideNav}
            </ul>
            <div class="navbar-fixed">
                <nav class="green accent-4">
                <div class="nav-wrapper container">
                    <a href="#" class="brand-logo font-5 hide-on-med-and-up">FOOTBALL LOVERS</a>
                    <a href="#" class="brand-logo hide-on-med-and-down">FOOTBALL LOVERS</a>
                    <a href="#" class="sidenav-trigger" data-target="nav-mobile">☰</a>
                    
                    <ul class="mainnav right hide-on-med-and-down">${mainNav}</ul>
                </div>
                </nav>
            </div>
        `;

        // Activate sidebar nav
        const sidenavElem = document.querySelectorAll(".sidenav");
        const option = {'isFixed': true}
        M.Sidenav.init(sidenavElem, option);

        document.querySelectorAll(".sidenav a, .mainnav a").forEach(elm => {
            elm.addEventListener("click", event => {
                const sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();

                const page = event.target.getAttribute("href").split('/')[1];

                const mainPage = document.querySelector("main-page");
                mainPage.page = page
            })
        })
    }
}

customElements.define("nav-bar", NavBar);