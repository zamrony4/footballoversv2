import "./pages/MainPage.js";

const main = () => {
    const mainPage = document.querySelector("main-page");

    let page = window.location.hash.split('/')[1];
    let id   = window.location.hash.split('/')[2];

    if (page == undefined) page = "home";
    if (id == undefined) id = 0;

    mainPage.page = page

    window.onhashchange = () => {
        let page = window.location.hash.split('/')[1];
        let id   = window.location.hash.split('/')[2];

        if (page == undefined) page = "home";
        if (id == undefined) id = 0;

        mainPage.page = page
    }
}

export default main;