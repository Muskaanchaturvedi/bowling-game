arrow = document.getElementsByClassName('arrow')[0]
ball = document.getElementsByClassName('ball')[0]
let pos = ball.getBoundingClientRect();

let tries = 5;
let angle = -90
check = true;
V_res = 10;

function doit() {
    if (angle > 90) {
        check = false;
    } else if (angle < -90) {
        check = true;
    }
    if (check) {
        angle += 3.2;
    } else {
        angle -= 3.2;
    }
    arrow.style.transform = `rotate(${angle}deg)`;
}
myInterval = setInterval(doit, 25);

let main = document.getElementById('main');

let X_pos = pos.left - main.getBoundingClientRect().left + 40;
let Y_pos = pos.top;
X_save = X_pos + main.getBoundingClientRect().left;
Y_save = Y_pos;


function abs(a) {
    if (a >= 0) {
        return a;
    } else {
        return -1 * a;
    }
}
pins = document.getElementsByClassName('pin')
var arr = [1, 1, 1, 1, 1, 1, 1, 1]
let dist = main.getBoundingClientRect().left;
balls = 0;
function collide() {
    balla = ball.getBoundingClientRect();
    T = balla.top;
    L = balla.left+80;
    W = balla.height;
    H = balla.width;
    for (let i = 0; i < pins.length; i++) {
        t = pins[i].getBoundingClientRect().top;
        l = pins[i].getBoundingClientRect().left;
        w = pins[i].getBoundingClientRect().height;
        h = pins[i].getBoundingClientRect().width;
        
        if (arr[i] && t + h > T && t < T + H && l < L + W && l + w > L) {
            arr[i] = 0;
            pins[i].style.opacity = '0';
            balls++;
}
    }
    return 0;
}
document.addEventListener('keypress', () => {
    clearInterval(myInterval);
    if (tries) {

        const ball_move = setInterval(() => {
            X_pos += V_res * Math.sin(Math.PI * angle / 180);
            Y_pos -= V_res * abs(Math.cos(Math.PI * angle / 180));
            collide();
            console.log(arr);
            if(balls == 8){
                clearInterval(ball_move);
                document.getElementsByClassName('won')[0].style.display = 'block';
            }
            if (Y_pos < -80) {
                X_pos = X_save - main.getBoundingClientRect().left;
                Y_pos = Y_save;
                clearInterval(ball_move);
                if(tries){
                    myInterval = setInterval(doit, 25);
myInterval = setInterval(doit, 25);

                }
                tries--;
                document.getElementsByClassName('bal')[tries].style.opacity = '0';
            }
            ball.style.top = `${Y_pos}px`;
            ball.style.left = `${X_pos}px`;
        }, 25);
    }else{
        document.getElementsByClassName('won')[1].style.display = 'block';
        // document.addEventListener('keypress',()=>{
        //     tries = 5;
        //     for(let i=0;i<5;i++){
        //         if(i<2){
        //     document.getElementsByClassName('won')[i].style.display = 'none';
        //         }
        //         document.getElementsByClassName('bal')[i].style.opacity = '1';
        //     }
        //     for (let i = 0; i < pins.length; i++){
        //         pins[i].style.opacity = '1';
        //         arr[i] = 1;
        //     }
        //     myInterval = setInterval(doit, 25);
        // })
    }
});
