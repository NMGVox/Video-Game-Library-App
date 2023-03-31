let my_collection = [];

function VideoGame(title, developer, publisher, year_released, play_status) {
    this.title = title;
    this.developer = developer;
    this.publisher = publisher;
    this.year_released = year_released;
    this.play_status = play_status;
}

VideoGame.prototype.printInfo = function(){
    return(`${this.title} was developed by ${this.developer} and published by ${this.publisher}. You have ${this.play_status} this game.`)
}

function AddVideoGame(e) {
    e.preventDefault();
    form = document.querySelector("#addGameForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    const title = document.querySelector("#title");
    const dev = document.querySelector("#dev");
    const publisher = document.querySelector("#publisher");
    const release_date = document.querySelector("#release-date");
    const status = document.querySelector('input[name="completion_status"]:checked');
    
    const game1 = new VideoGame(title.value, dev.value, publisher.value, release_date.value, status.value);
    console.log(game1.printInfo());
    return false;
}

gameSubmit.addEventListener('click', AddVideoGame);