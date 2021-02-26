var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
let ispress = false;
let x = undefined ;
let y = undefined;
canvas.addEventListener('mousedown',(e)=>{
    ispress = true;
    x = e.offsetX;
    y = e.offsetY;
});
canvas.addEventListener('mouseup',(e)=>{
    ispress = false;
});
canvas.addEventListener('mousemove',(e)=>{
    if(ispress){
        const x1 = e.offsetX;
        const y1 = e.offsetY;
        draw(x1,y1);
        drawline(x,y,x1,y1);
        x = x1;
        y = y1;
    }
});
function draw(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}
function drawline(mx,my,lx,ly){
    ctx.moveTo(mx,my);
    ctx.lineTo(lx,ly);
    ctx.lineWidth = 5 * 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}