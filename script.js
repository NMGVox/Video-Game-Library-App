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
    if (!addGameForm.checkValidity()) {
        addGameForm.reportValidity();
        return false;
    }
    const status = document.querySelector('input[name="completion_status"]:checked').value;
    const game1 = new VideoGame(title.value, dev.value, publisher.value, release_date.value, status);
    console.log(game1.printInfo());
    return false;
}

gameSubmit.addEventListener('click', AddVideoGame);