const canvas = document.getElementById("can");
const ctx = canvas.getContext('2d');
ctx.fillStyle = "#111111";
ctx.fillRect(0,0,canvas.width,canvas.height);
const tslider = document.getElementById("thetaSlider");
const leslider = document.getElementById("leSlider");
const islider = document.getElementById("iSlider");
const thetaOut = document.getElementById("t");
const leOut = document.getElementById("le");
const iOut = document.getElementById("i");
const altOut = document.getElementById("alt");
const altSlider = document.getElementById("altSlider");


//alternation int
var alt = 0;


//segment length
var length = 20;

//rotation angle in radians
var theta = Math.PI*(1/2);

//array to hold points for construction
var points = [
    {x: canvas.width/20, y: 19*canvas.height/20},  //p1
    {x: canvas.width/20 + length, y: 19*canvas.height/20}   //p2
];

function iterate(num) {
    var ptsCopy = deepCopy(points);
    var dir = false;
    for (var i = 0; i<num; i++) {
        let lastPtIndex = points.length-1;
        for (var j = points.length-2; j>=0; j--) {

            let translatedX = points[j].x - points[lastPtIndex].x;
            let translatedY = points[j].y - points[lastPtIndex].y;
            
            if (alt == 1) {
                switch (dir) {
                    case false:
                        if (theta == Math.PI*(1/2)) {
                            var x = -translatedY + points[lastPtIndex].x;
                            var y = translatedX + points[lastPtIndex].y;
                        } else {
                            var x = ((translatedX)*Math.cos(theta))-((translatedY)*Math.sin(theta)) + points[lastPtIndex].x;
                            var y = ((translatedX)*Math.sin(theta))+((translatedY)*Math.cos(theta)) + points[lastPtIndex].y;
                        }
                        break;
                    case true:
                        if (theta == Math.PI*(1/2)) {
                            var x = translatedY + points[lastPtIndex].x;
                            var y = -translatedX + points[lastPtIndex].y;
                        } else {
                            var x = ((translatedX)*Math.cos(-theta))-((translatedY)*Math.sin(-theta)) + points[lastPtIndex].x;
                            var y = ((translatedX)*Math.sin(-theta))+((translatedY)*Math.cos(-theta)) + points[lastPtIndex].y;
                        }
                        break;
                }
                dir = !dir;
            }
            else if (alt == 2) {
                switch (i%2) {
                    case 0:
                        if (theta == Math.PI*(1/2)) {
                            var x = -translatedY + points[lastPtIndex].x;
                            var y = translatedX + points[lastPtIndex].y;
                        } else {
                            var x = ((translatedX)*Math.cos(theta))-((translatedY)*Math.sin(theta)) + points[lastPtIndex].x;
                            var y = ((translatedX)*Math.sin(theta))+((translatedY)*Math.cos(theta)) + points[lastPtIndex].y;
                        }
                        break;
                    case 1:
                        if (theta == Math.PI*(1/2)) {
                            var x = translatedY + points[lastPtIndex].x;
                            var y = -translatedX + points[lastPtIndex].y;
                        } else {
                            var x = ((translatedX)*Math.cos(2*(Math.PI)-theta))-((translatedY)*Math.sin(2*(Math.PI)-theta)) + points[lastPtIndex].x;
                            var y = ((translatedX)*Math.sin(2*(Math.PI)-theta))+((translatedY)*Math.cos(2*(Math.PI)-theta)) + points[lastPtIndex].y;
                        }
                        break;
                }
            } else {
                if (theta == Math.PI*(1/2)) {
                    var x = -translatedY + points[lastPtIndex].x;
                    var y = translatedX + points[lastPtIndex].y;
                } else {
                    var x = ((translatedX)*Math.cos(theta))-((translatedY)*Math.sin(theta)) + points[lastPtIndex].x;
                    var y = ((translatedX)*Math.sin(theta))+((translatedY)*Math.cos(theta)) + points[lastPtIndex].y;
                }
            }
            points.push({x:x,y:y});
        }
    }
}

function deepCopy(ptArray) {
    let copy = [];
    for (var i = 0; i < ptArray.length; i++) {
        copy[i] = {x:0,y:0};
        copy[i].x = ptArray[i].x;
        copy[i].y = ptArray[i].y;
    }
    return copy;
}

async function render() {

    //resent canvas
    ctx.fillStyle = "#111111";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if (!iterate<document.getElementById("i").value) {
        //clear previous
        points = [
            {x: canvas.width/20, y: 19*canvas.height/20},  //p1
            {x: canvas.width/20 + length, y: 19*canvas.height/20}   //p2
        ];
    }


    alt = parseInt(altOut.value);
    length = parseInt(document.getElementById("le").value);
    theta = document.getElementById("t").value*(Math.PI/180);
    
    
    
    iterate(document.getElementById("i").value);

    
    for (var i = 1; i < points.length; i++) {
        ctx.strokeWidth = Math.ceil(length/10);
        ctx.strokeStyle = 'hsl(' + Math.floor(360*i/points.length) + ',50%, 70%)';
        ctx.beginPath();
        ctx.moveTo(points[i-1].x,points[i-1].y);
        ctx.lineTo(points[i].x,points[i].y);
        ctx.stroke();
    }
    
}


tslider.addEventListener('input', function() {
    thetaOut.value = this.value;
    render();
});
thetaOut.addEventListener('input', function() {
    tslider.value = this.value;
    render();
});
leslider.addEventListener('input', function() {
    leOut.value = this.value;
    render();
});
leOut.addEventListener('input', function() {
    leslider.value = this.value;
    render();
});
islider.addEventListener('input', function() {
    iOut.value = this.value;
    render();
});
iOut.addEventListener('input', function() {
    islider.value = this.value;
    render();
});
altSlider.addEventListener('input', function() {
    altOut.value = this.value;
    render();
});
altOut.addEventListener('input', function() {
    altSlider.value = this.value;
    render();
});


