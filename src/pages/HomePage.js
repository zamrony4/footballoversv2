import "../component/FixturesDateList.js";

import { dateFormat } from "../function/fnDate.js";

class HomePage extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `
            <ul class="tabs mb-3" id="home-tabs">
                <li class="tab col s3"><a href="#test1" class="data-tabs" data-date="${dateFormat(1, -2)}">${dateFormat(2, -2)}</a></li>
                <li class="tab col s3"><a href="#test4" class="data-tabs" data-date="${dateFormat(1, -1)}">${dateFormat(2, -1)}</a></li>
                <li class="tab col s3"><a class="active data-tabs" href="#test2" data-date="${dateFormat(1)}">${dateFormat(2)}</a></li>
                <li class="tab col s3"><a href="#test4" class="data-tabs" data-date="${dateFormat(1, 1)}">${dateFormat(2, 1)}</a></li>
                <li class="tab col s3"><a href="#test4" class="data-tabs" data-date="${dateFormat(1, 2)}">${dateFormat(2, 2)}</a></li>
            </ul>
        `;

        const listFixtures = document.createElement('fixtures-date-list')
        listFixtures.idLeague = 0;
        listFixtures.dateFrom = dateFormat(1);
        listFixtures.dateTo = dateFormat(1);
        this.append(listFixtures)

        const tabClass = document.querySelectorAll('.tabs');
        M.Tabs.init(tabClass);
    }
}

customElements.define("home-page", HomePage);