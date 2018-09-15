const socket = io('https://holinhedxyz-multipaint.herokuapp.com/');
let clientColor;
let px,py,size;
let con = false;

function setup(){
    createCanvas(800,800);
    background(0);
    noStroke();

    size = 25;

    clientColor = {
        r:random(255),
        g:random(255),
        b:random(255)
    };

    socket.on("mouse", (data)=>{
        fill(data.c.r,data.c.g,data.c.b);
        ellipse(data.x,data.y,data.s,data.s);
    });
    socket.on("id", (idData)=>document.getElementById("client_id").innerHTML = "id: " + idData.id);
}

function mouseDragged(){
    fill(255);
    ellipse(mouseX,mouseY,size,size);


    let data = {
        x: mouseX,
        y: mouseY,
        s:size,
        c: clientColor
    };

    socket.emit("mouse",data);
}

function keyPressed(){
    document.getElementById("client_size").innerHTML = "size: " + size;
    switch(keyCode){
        case 38: 
            if (size < 75){
                size++;
            };
        break;
        case 40: 
            if (size > 10){
                size--;
            };
        break;
    }
}