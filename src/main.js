var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var clearBtn = document.getElementById('clear-btn');
var increaseBtn = document.getElementById('inc-btn');
var decreaseBtn = document.getElementById('dec-btn');
var colorBtn = document.getElementById('color-btn');
var undoBtn = document.getElementById('undo-btn');
var redoBtn = document.getElementById('redo-btn');
let ispress = false;
let x = undefined ;
let y = undefined;
let color = "#000";
let size = 5;
let undoList = [];
let redoList = [];
//color event
colorBtn.addEventListener('click',()=>{
    colorBtn.addEventListener('change',()=>{
        color = colorBtn.value;
        colorBtn.style.backgroundColor = color;
    })
})
//Clear Canvas Event
clearBtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})
//Pencil Size Increase event
increaseBtn.addEventListener('click',()=>{
    size = size + 2;
})
//Pencil Size decrease event
decreaseBtn.addEventListener('click',()=>{
    if(size < 0){
        size = 5;
    }
    size = size - 2;
})
//draw events mouse down,mouse up and mouse move
canvas.addEventListener('mousedown',(e)=>{
    ispress = true;
    x = e.offsetX;
    y = e.offsetY;
    //current Image put in undo list
    undoList.push(ctx.getImageData(0,0,canvas.width,canvas.height));
});
canvas.addEventListener('mouseup',()=>{
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
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}
function drawline(mx,my,lx,ly){
    ctx.moveTo(mx,my);
    ctx.lineTo(lx,ly);
    ctx.lineWidth = size * 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}
//undo event
undoBtn.addEventListener('click',()=>{
    if(undoList.length > 0){
        let img = undoList.pop();
        redoList.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.putImageData(img,0,0);
    }
})
//redo event
redoBtn.addEventListener('click',()=>{
    if(redoList.length > 0){
        let img = redoList.pop();
        undoList.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.putImageData(img,0,0);
    }
})