const $ul = document.querySelector('#people_list');
const $loader = document.getElementById('loader');
const maxElem = 4;
let currentPage = 1;
const $ulForButtons = document.getElementById('buttonspag');

const showLoader = () => {
    $loader.classList.add('show');
}

const hideLoader = () => {
    $loader.classList.remove('show');
}

function getPeople() {
    showLoader();

    if ($ul.hasChildNodes() && $ulForButtons.hasChildNodes()) {
        $ul.innerHTML = '';
        $ulForButtons.innerHTML = '';
    }

    axios.get('https://swapi.dev/api/people/?page=3')
        .then((res) => {
            hideLoader();
            const pages = Math.ceil(res.data.results.length / maxElem);
            res.data.results.filter((row, index) => {
                const start = Math.ceil((currentPage - 1) * maxElem);
                const end = Math.ceil((currentPage * maxElem) - 1);
                if (index >= start && index <= end) return true;
            }).forEach(person => {
                addPersonItem(person, pages);
            });
            pageButtons(pages);
        });
}

const pageButtons = (pages) => {
    for (let page = 1; page <= pages; page++){
        const $buttonPag = document.createElement('li');
        $buttonPag.setAttribute('value', page);
        $buttonPag.className = "page-item";
        $ulForButtons.appendChild($buttonPag);

        const $a = document.createElement('a');
        $a.setAttribute('value', page);
        $a.innerHTML = page;
        $a.className = "page-link";

        $a.addEventListener('click', () => {
            currentPage = $a.getAttribute('value');
            getPeople();
        });
        $buttonPag.appendChild($a);
    }
};

const addPersonItem = (person, pages) => {
    const secondFilm = _.get(person, '["films"][1]', 'Unknown');
    const $li = document.createElement('li');
    $li.className = 'list-group-item';

    $li.innerText = `
        ${person['name']}
        (birth year: ${person['birth_year']})
        - second film: ${secondFilm}
    `;
    $ul.appendChild($li);
};

