let my_collection = [];
const libraryDisplay = document.querySelector(".library");

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

function updateDisplay(game){
    const newdiv = document.createElement('div');
    newdiv.className = "game-container";

    const cover = document.createElement('img');
    cover.className = "cover";
    cover.src = "./test-img/eOtEAB7.jpg";
    
    const infoBox = document.createElement('div');
    infoBox.className = "game-info";

    const infoEle = [];

    //Find a way to refactor this portion of code.
    infoEle.push(document.createElement('h2'));
    infoEle[0].className = "game-title";
    infoEle[0].textContent = game.title;

    infoEle.push(document.createElement('h2'));
    infoEle[1].className = "misc-info";
    infoEle[1].textContent = `Developer: ${game.developer}`;
    
    infoEle.push(document.createElement('h2'));
    infoEle[2].className = "misc-info";
    infoEle[2].textContent = `Publisher: ${game.publisher}`;

    infoEle.push(document.createElement('h2'));
    infoEle[3].className = "misc-info";
    infoEle[3].textContent = `Date: ${game.year_released}`;

    for(let i = 0; i < infoEle.length; i++){
        infoBox.appendChild(infoEle[i]);
    }

    newdiv.appendChild(cover);
    newdiv.appendChild(infoBox);

    libraryDisplay.appendChild(newdiv);
    return;
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
    
    const newGame = new VideoGame(title.value, dev.value, publisher.value, release_date.value, status.value);

    my_collection.push(newGame);

    updateDisplay(newGame);

    return false;
}

gameSubmit.addEventListener('click', AddVideoGame);