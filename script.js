const gameCollection = [];
const libraryDisplay = document.querySelector('.library');

class VideoGame {
    constructor(title, developer, publisher, releaseDate, playStatus, cover) {
        this.title = title;
        this.developer = developer;
        this.publisher = publisher;
        this.releaseDate = releaseDate;
        this.playStatus = playStatus;
        this.cover = cover;
    }

    get info() {
        return (`${this.title} was developed by ${this.developer} and published by ${this.publisher}. You have ${this.playStatus} this game.`);
    }
}

function clearFields(title, dev, publisher, releaseDate) {
    title.reset();
    dev.reset();
    publisher.reset();
    releaseDate.reset();
}

function makeCompletionElement() {
    const newSpan = document.createElement('span');
    const statusArr = ['not-played', 'started', 'completed'];
    const str = 'NSC';
    for (let i = 0; i < 3; i++) {
        const tempbutton = document.createElement('button');
        tempbutton.type = 'button';
        tempbutton.classList.add('change-status');
        tempbutton.classList.add(statusArr[i]);
        tempbutton.innerText = str[i];
        newSpan.appendChild(tempbutton);
    }
    return newSpan;
}

function changeGameStatus(e) {
    const parent = e.target.closest('.game-container');
    parent.classList.remove(parent.classList.item(1));
    parent.classList.add(e.target.classList[1]);
}

function updateDisplay(game) {
    const newdiv = document.createElement('div');
    newdiv.className = 'game-container';

    const cover = document.createElement('img');
    cover.className = 'cover';
    if (game.cover) {
        cover.src = URL.createObjectURL(game.cover);
    } else {
        cover.src = './images/no-cover.png';
    }

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

    const newSpan = makeCompletionElement();

    newdiv.appendChild(rmbtn);
    newdiv.appendChild(cover);
    newdiv.appendChild(newSpan);
    newdiv.appendChild(infoBox);

    if (game.playStatus === 'completed') {
        newdiv.classList.add('completed');
    } else if (game.playStatus === 'started') {
        newdiv.classList.add('started');
    } else {
        newdiv.classList.add('not-played');
    }

    newdiv.setAttribute('index', gameCollection.length - 1);

    libraryDisplay.appendChild(newdiv);
}

function removeGame(e) {
    gameCollection[(e.target.parentElement.getAttribute('index'))] = null;
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
    const cover = document.querySelector('#cover');

    // eslint-disable-next-line max-len
    const newGame = new VideoGame(title.value, dev.value, publisher.value, releaseDate.value, status.value, cover.files[0]);

    gameCollection.push(newGame);

    clearFields(title, dev, publisher, releaseDate);

    updateDisplay(newGame);

    return false;
}

function openFormMobile(e) {
    const dimmer = document.createElement('div');
    dimmer.className = 'dimmer';
    dimmer.append(document.getElementById('form-container'));
    document.querySelector('body').appendChild(dimmer);
}

function closeFormMobile(e) {
    const dimmer = document.querySelector('.dimmer');
    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('.side-footer');
    sidebar.insertBefore(dimmer.firstChild, footer);
    document.querySelector('body').removeChild(dimmer);
}

function closeSidebar(e) {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('collapse')) {
        sidebar.classList.remove('collapse');
        e.target.src = './images/svg/arrow-collapse-left.svg';
        return;
    }
    document.querySelector('.sidebar').classList.add('collapse');
    e.target.src = './images/svg/arrow-collapse-right.svg';
}

const submitGame = document.querySelector('#gameSubmit');

submitGame.addEventListener('click', AddVideoGame);

document.querySelector('body').addEventListener('click', (event) => {
    if (event.target.className === 'remove-button') {
        removeGame(event);
    }
});

document.querySelector('body').addEventListener('click', (event) => {
    if (event.target.classList.contains('change-status')) {
        changeGameStatus(event);
    }
});

/* Screen dependent function */
document.querySelector('body').addEventListener('pointerdown', (event) => {
    if (event.target.classList.contains('dimmer')) {
        closeFormMobile(event);
    }
});

document.querySelector('#close-sidebar').addEventListener('pointerdown', closeSidebar);

// document.querySelector('body').addEventListener('pointerdown', (event) => {
//     if (event.target.classList.contains('cover')) {
//         showGameInfo(event);
//     }
// });

document.querySelector('.form-trigger-mobile').addEventListener('pointerdown', openFormMobile);
