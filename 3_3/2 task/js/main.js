const $ul = document.querySelector('#people_list');
const $loader = document.getElementById('loader');
const maxElem = 10;
let currentPage = 1;
const $ulForButtons = document.getElementById('buttonspag');

const showLoader = () => {
    $loader.classList.add('show');
}

const hideLoader = () => {
    $loader.classList.remove('show');
}

async function getData (currentPage) {
    await showLoader();
    const data = await fetch('https://swapi.dev/api/people/?page=' + currentPage);
    const peoples = await data.json();
    const pages = Math.ceil(peoples.count / maxElem);
    await pageButtons(pages);
    await peoples.results.forEach((person) => {addPersonItem(person);})
    await hideLoader();
}
getData(1);

const pageButtons = (pages) => {
    if ($ul.hasChildNodes() && $ulForButtons.hasChildNodes()) {
                $ul.innerHTML = '';
                $ulForButtons.innerHTML = '';
    }
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
            getData(currentPage);
        });

        $buttonPag.appendChild($a);
    }
};

const addPersonItem = (person) => {
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
