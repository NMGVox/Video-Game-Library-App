const gameCollection = [];
const libraryDisplay = document.querySelector('.library');

function VideoGame(title, developer, publisher, releaseDate, playStatus) {
    this.title = title;
    this.developer = developer;
    this.publisher = publisher;
    this.releaseDate = releaseDate;
    this.playStatus = playStatus;
}

VideoGame.prototype.printInfo = function () {
    return (`${this.title} was developed by ${this.developer} and published by ${this.publisher}. You have ${this.playStatus} this game.`);
};

function clearFields(title, dev, publisher, releaseDate) {
    title.value = '';
    dev.value = '';
    publisher.value = '';
    releaseDate.value = '';
}

function updateDisplay(game) {
    const newdiv = document.createElement('div');
    newdiv.className = 'game-container';

    const cover = document.createElement('img');
    cover.className = 'cover';
    cover.src = './test-img/eOtEAB7.jpg';

    const infoBox = document.createElement('div');
    infoBox.className = 'game-info';

    const rmbtn = document.createElement('button');
    rmbtn.type = 'button';
    rmbtn.textContent = '✖';
    rmbtn.className = 'remove-button';

    const infoEle = [];

    // Find a way to refactor this portion of code.
    infoEle.push(document.createElement('h2'));
    infoEle[0].className = 'game-title';
    infoEle[0].textContent = game.title;

    infoEle.push(document.createElement('h2'));
    infoEle[1].className = 'misc-info';
    infoEle[1].textContent = `Developer: ${game.developer}`;

    infoEle.push(document.createElement('h2'));
    infoEle[2].className = 'misc-info';
    infoEle[2].textContent = `Publisher: ${game.publisher}`;

    infoEle.push(document.createElement('h2'));
    infoEle[3].className = 'misc-info';
    infoEle[3].textContent = `Date: ${game.releaseDate}`;

    for (let i = 0; i < infoEle.length; i++) {
        infoBox.appendChild(infoEle[i]);
    }

    newdiv.appendChild(rmbtn);
    newdiv.appendChild(cover);
    newdiv.appendChild(infoBox);

    newdiv.setAttribute('index', gameCollection.length - 1);

    libraryDisplay.appendChild(newdiv);
}

function removeGame(e) {
    gameCollection.splice(e.target.parentElement.getAttribute('index'), 1);
    e.target.parentElement.remove();
}

function AddVideoGame(e) {
    e.preventDefault();
    const form = document.querySelector('#addGameForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    const title = document.querySelector('#title');
    const dev = document.querySelector('#dev');
    const publisher = document.querySelector('#publisher');
    const releaseDate = document.querySelector('#release-date');
    const status = document.querySelector('input[name="completion_status"]:checked');

    // eslint-disable-next-line max-len
    const newGame = new VideoGame(title.value, dev.value, publisher.value, releaseDate.value, status.value);

    gameCollection.push(newGame);

    clearFields(title, dev, publisher, releaseDate);

    updateDisplay(newGame);

    return false;
}

const submitGame = document.querySelector('#gameSubmit');

submitGame.addEventListener('click', AddVideoGame);

document.querySelector('body').addEventListener('click', (event) => {
    if (event.target.className === 'remove-button') {
        removeGame(event);
    }
});
