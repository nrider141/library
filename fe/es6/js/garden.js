class Garden {
    constructor(name) {
        this.name = name;
        this.plants = [];
    }

    set name(name) { this.name = name }
    get name() { return this.name }
    get area() { return function() {
        let sum = 0;
        this.plants.forEach(plant => sum + this.area());
        return sum;
    }}

    add(plant) {
        if (plant instanceof Plant) {
            this.plants.push(plant);
        }
    }
    water(liter) {
        this.plants.forEach(plant => plant.Height = (plant.Height + (liter * plant.growRate)));
    }
    render() {
        this.plants.forEach(plant => plant.render())
    }

}