class App {
    $parentList = null;
    $parentPaginate = null;

    constructor(settings){        
        const {parentList} =  settings;
        const {parentPaginate} = settings;

        if (!parentList) {
            return new Error('no parent!');
        }

        this.$parentList = parentList;
        this.$parentPaginate = parentPaginate;
        this.onInit();
    }

    _page = 1;
    get page(){
        return this._page;
    }
    set page(currentPage){
        this._page = currentPage;

        const $activeItem = this.$parentPaginate.querySelectorAll('a');
        if ($activeItem.length) {
            $activeItem.forEach(($item, index) => {
                $item.classList.toggle('active', index + 1 === currentPage);
            })
        }

        this.getPeople(currentPage);
    }

    _isLoading = true;
    get isLoading(){
        return this._isLoading;
    }
    set isLoading(value){
        this._isLoading = value;
        document.querySelector('.spinner-border').classList.toggle('d-none', !value);
    }

    onInit() {
    }

    async getPeople (page) {
        this.isLoading = true;
        const url = `https://swapi.dev/api/people/?page=${page}`;

        this.clearList();
        const result = await fetch(url);
        const data = await result.json();
        this.renderList(data.results);
        this.isLoading = false;
        
        return data;
    }

    clearList(){
        this.$parentList.innerHTML = '';
    }

    renderList(list) {
        list.forEach(person => {
            this.addPersonItem(person);
        });
    }

    addPersonItem(person){
        // <li class="list-group-item"> Name </li>
        const $li = document.createElement('li');
        $li.className = 'list-group-item';
        $li.innerText = `${person['name']} (birth year: ${person['birth_year']})`;
        this.$parentList.appendChild($li);
    }

    renderPaginate(count) {
        const itemLength = Math.ceil(count / 10);

        for(let i = 1; i <= itemLength; i++) {
            // <li class="page-item"><a class="page-link" href="#">1</a></li>
            const $li = document.createElement('li');
            $li.className = 'page-item';
            const $a = document.createElement('a');
            $a.className = 'page-link';
            $a.href = '#';

            if (i === 1) {
                $a.className += ' active';
            }


            $a.innerText = i;
            $a.addEventListener('click', (event) => {
                this.page = i;
                event.preventDefault();
            });


            $li.appendChild($a);

            this.$parentPaginate.appendChild($li);
        }
    }
};

const settings = {
    parentList: document.querySelector('#people_list'),
    parentPaginate: document.querySelector('.pagination'),
};

const app = new App(settings);

app.getPeople(1).then((res) => {
    app.renderPaginate(res.count);
});
