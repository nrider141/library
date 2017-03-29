class Plant {

    constructor(height, imgSrc, growRate) {
        this.height = height;
        this.img = imgSrc;
        this.growRate = growRate;
        this.area();
        this.render();
    }

    area() { width * this.height; }

    set Height(height) { this.height = height; }

    get Height() { return this.height; }

    get growRate() { return this.growRate; }

    render() {
        let div = $('<div class="plant"></div>');
        let img = $('<img>',{ 'src': this.img, 'height': this.height,'width': width });
        $('#farm').append(div);
        div.append(img);
        let eggPlantBtn = $('<button>').attr("id","addEggPlant");
        eggPlantBtn.click(garden.add(Plant));
        div.append(eggPlantBtn);
    }
}