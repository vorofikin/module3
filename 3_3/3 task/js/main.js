class Swapi {

    constructor(options) {
        this.$loader = options.loader;
        this.$ul = options.ul;
        this.maxElem = options.maximumElem;
        this.$ulForButtons = options.ulForButtons;
        this.currentPage = options.curPage;
    }

    async getData (currentPage){
        await this.showLoader();
        const data = await fetch('https://swapi.dev/api/people/?page=' + currentPage);
        const res = await data.json();
        this.pageNumber = Math.ceil( res.count / this.maxElem);
        return res;
    }

    async showLoader() {
        await this.$loader.classList.add('show');
    }

    async hideLoader() {
        await this.$loader.classList.remove('show');
    }

    async pageButtons () {
        const pages = this.pageNumber;

        const $prevLi = document.createElement('li');
        $prevLi.className = "page-item";
        this.$ulForButtons.appendChild($prevLi);

        const $prevA = document.createElement('a');
        $prevA.setAttribute('value', Number(this.currentPage - 1));
        $prevA.innerHTML = "Previous";
        $prevA.className = "page-link";
        $prevA.addEventListener('click', () => {
            this.currentPage = Number($prevA.getAttribute('value'));
            apiRequest(this.currentPage);
        });
        $prevLi.appendChild($prevA);

        for (let page = 1; page <= pages; page++){
            const $buttonPag = document.createElement('li');
            $buttonPag.className = "page-item";
            this.$ulForButtons.appendChild($buttonPag);

            const $a = document.createElement('a');
            $a.setAttribute('value', Number(page));
            $a.innerHTML = page;
            $a.className = "page-link";

            $a.addEventListener('click', () => {
                this.currentPage = Number($a.getAttribute('value'));
                apiRequest(this.currentPage);
            });

            $buttonPag.appendChild($a);
        }

        const $nextLi = document.createElement('li');
        $nextLi.className = "page-item";
        this.$ulForButtons.appendChild($nextLi);

        const $nextA = document.createElement('a');
        $nextA.setAttribute('value', Number(this.currentPage) + 1);
        $nextA.innerHTML = "Next";
        $nextA.className = "page-link";
        $nextA.addEventListener('click', () => {
            this.currentPage = Number($nextA.getAttribute('value'));
            apiRequest(this.currentPage);
        });
        $nextLi.appendChild($nextA);

        if (this.currentPage === 1){
            $prevLi.classList.add('disabled');
        } else {
            $prevLi.classList.remove(' disabled');
        }

        if (this.currentPage === 9){
            $nextLi.classList.add('disabled');
        } else {
            $nextLi.classList.remove(' disabled');
        }

    }

    async addPersonItem (person) {
        if (this.$ul.hasChildNodes() && this.$ulForButtons.hasChildNodes()) {
            this.$ul.innerHTML = '';
            this.$ulForButtons.innerHTML = '';
        }
        const secondFilm = _.get(person, '["films"][1]', 'Unknown');
        const $li = document.createElement('li');
        $li.className = 'list-group-item';

        $li.innerText = `
        ${person['name']}
        (birth year: ${person['birth_year']})
        - second film: ${secondFilm}
    `;
        this.$ul.appendChild($li);
    }

    renderList(res) {
        res.results.forEach((person) => {
            api.addPersonItem(person);
        });
    }
}

const $loader = document.getElementById('loader');
const $ul = document.querySelector('#people_list');
const maxElem = 10;
const $ulForButtons = document.getElementById('buttonspag');
const currentPage = 1;


const api = new Swapi({
    loader: $loader,
    ul: $ul,
    maximumElem: maxElem,
    ulForButtons: $ulForButtons,
    curPage: currentPage
});

const apiRequest = (currentPage) => {
    api
        .getData(currentPage)
        .then((res) => {api.renderList(res)})
        .then(() => {
            api.pageButtons();
        })
        .catch((err) => {
            err = new Error();
            console.log(err);
        })
        .finally(api.hideLoader());
}
apiRequest(1);
