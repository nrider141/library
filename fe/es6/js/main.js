const width = 100;

let garden = new Garden('farm');
let eggPlant=new EggPlant(300, 'img/eggplant.jpg', 50)

garden.add(eggPlant);
garden.water(20);
garden.render();