function CarName (name){
    this.name = name;
    
}

const car1 = new CarName('Nissan');
let car2 = new CarName('Porsche');
const car3 = new CarName('Cadillac');

console.log(car1);

const obj = Object.create(CarName, {
    car1: {
        value: 'Nissan',
        writable: false,
        configurable: true
    },
    car2: {
        value: 'Porsche',
        writable: false,
        configurable: true
    },
    car3: {
        value: 'Cadillac'
    }
});


class CarNameClass {
    constructor(name) {
        this.name = name;
    }
}

const carName1 = new CarNameClass('Volvo');
const carName2 = new CarNameClass('Lamborghini');
