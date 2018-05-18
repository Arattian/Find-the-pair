let colors = {
    1: {
        counter: 0,
        color: '#814374',
    },
    2: {
        counter: 0,
        color: '#52a39d',
    },
    3: {
        counter: 0,
        color: '#b7695d',
    },
    4: {
        counter: 0,
        color: '#cebb79',
    },
    5: {
        counter: 0,
        color: '#05425e',
    },
    6: {
        counter: 0,
        color: '#dcdedb',
    },
    7: {
        counter: 0,
        color: '#7cc8a4',
    },
    8: {
        counter: 0,
        color: '#d3e398',
    },
    // main color
    custom: '#0698cf',
}

let registry = {
    0: {
        num: 0,
    },
    1: {
        num: 0,
    },
    2: {
        num: 0,
    },
    3: {
        num: 0,
    },
    4: {
        num: 0,
    },
    5: {
        num: 0,
    },
    6: {
        num: 0,
    },
    7: {
        num: 0,
    },
    8: {
        num: 0,
    },
    9: {
        num: 0,
    },
    10: {
        num: 0,
    },
    11: {
        num: 0,
    },
    12: {
        num: 0,
    },
    13: {
        num: 0,
    },
    14: {
        num: 0,
    },
    15: {
        num: 0,
    },
}

//creating and 
for (key in registry) {
    let r = Math.ceil(Math.random() * 8);
    let x = 0;
    while (colors[r].counter === 2 && x <= 100) {
        r = Math.ceil(Math.random() * 8);
        x++;
    }
    registry[key].num = r;
    colors[r].counter++;
}

let tales = document.getElementsByClassName('tale');
let previous = 0;
let current = 0;
let prevTale = 0;
let status = false;
let score = 0;
let z = 15;

document.body.onresize = birds;
birds();

document.getElementById('res').addEventListener('click', function() {
    location.reload();
})

function birds() {
    let rect = tales[0].getBoundingClientRect();
    let bigBird = document.getElementsByClassName('bird')[0];
    let littleBird = document.getElementsByClassName('bird')[1];
    bigBird.style.top = rect.top - 73 + 'px';
    bigBird.style.left = rect.left - 10 + 'px';
    littleBird.style.top = rect.top - 33 + 'px';
    littleBird.style.left = rect.left + 100 + 'px';
}


for (let i = 0; i < tales.length; i++) {
    tales[i].addEventListener('click', function act() {
        current = registry[i].num;
        if (current === previous) {
            tales[i].style.backgroundColor = colors[registry[i].num].color;
            tales[i].innerHTML = registry[i].num;
            tales[i].style.pointerEvents = 'none';
            tales[prevTale].style.pointerEvents = 'none';
            prevTale = 0;
            current = 0;
            previous = 0;
            score += 100;
        } else if (previous != 0 && status) {
            tales[i].style.backgroundColor = colors[registry[i].num].color;
            tales[i].innerHTML = registry[i].num;
            previous = 0;
            // disable click event
            document.getElementById('game').style.pointerEvents = 'none';
            setTimeout(function () {
                tales[i].style.backgroundColor = colors.custom;
                tales[i].innerHTML = '';
                tales[prevTale].style.backgroundColor = colors.custom;
                tales[prevTale].innerHTML = '';
                status = false;
                prevTale = 0;
                //enable click event
                document.getElementById('game').style.pointerEvents = 'auto';
            }, 800);
        } else {
            tales[i].style.backgroundColor = colors[registry[i].num].color;
            tales[i].innerHTML = registry[i].num;
            previous = registry[i].num;
            prevTale = i;
            status = true;
        }
        if (score === 800) {
            let x = setInterval(function () {
                tales[z].style.marginTop = '1000px';
                tales[z].style.border = '0%';
                z--;
                if (z < 0) {
                    clearInterval(x);
                }
            }, 150);
            setTimeout(function () {
                let bigBird = document.getElementsByClassName('bird')[0];
                let littleBird = document.getElementsByClassName('bird')[1];
                setTimeout(function () {
                    document.getElementById('game').innerHTML = 'Congratulation';
                    document.getElementById('res').style.display = 'block';
                    setInterval(function () {
                        let r = Math.ceil(Math.random() * 8);
                        while (colors[r].color === document.getElementById('res').style.backgroundColor || r === 6) {
                            r = Math.ceil(Math.random() * 8);
                        }
                        document.getElementById('res').style.backgroundColor = colors[r].color;
                    }, 1000);
                }, 3200);
                bigBird.src = 'img/bird.gif';
                bigBird.style.transition = 'all 4s ease-in';
                bigBird.style.top = bigBird.offsetTop - 180 + 'px';
                bigBird.style.left = '4000px';
                littleBird.src = 'img/bird.gif';
                littleBird.style.transition = 'all 5s ease-in';
                littleBird.style.top = littleBird.offsetTop - 15 + 'px';
                littleBird.style.left = '6000px';
            }, 1500);
        }
    })
}
