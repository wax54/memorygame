
let height = window.innerHeight;
let width = window.innerWidth;
window.addEventListener("resize",function(){
    height = window.innerHeight;
    width = window.innerWidth;
});


function bodyColorFromMouse(e){
    let col = makeHSL(e.pageX,e.pageY);
    makeBody(col);
    document.addEventListener("click",function(e){
        console.log("CURRENT COLOR:");
        console.log(makeHSL(e.pageX,e.pageY));
    });
    
}

function makeBody(color){
    document.body.style.backgroundColor = color;
}

function makeHSL(x,y){
    y = Math.floor((y/height)*76);
    y = y+12;
    y = 100-y;
    const h = Math.floor((x/width)*255);    
    const s = 100;
    const l = y;
    return `hsl(${h},${s}%,${l}%)`;
}