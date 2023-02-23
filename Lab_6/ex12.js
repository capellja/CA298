function add(x, y) {
    return x + y;
}

function printer(x, y) {
    let z = add(x, y);
    return z; 

}

let x = 1;
let y = 1;

let show = function() {
    console.log(printer(x,y))
}

show();