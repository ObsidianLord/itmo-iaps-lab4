let canvas = document.getElementById('canvas');
let radius = canvas.width / 4;
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let scale = canvas.width / 12;

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius / 2, 90 * Math.PI / 180, 180 * Math.PI / 180, false);
    ctx.fillStyle = '#FFA520';
    ctx.fill();
    ctx.moveTo(width / 2, height / 2 + radius / 2);
    ctx.lineTo(width / 2 - radius / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - radius / 2);
    ctx.lineTo(width / 2 + radius / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - radius / 2);
    ctx.lineTo(width / 2 - radius, height / 2 - radius / 2);
    ctx.lineTo(width / 2 - radius, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.fillStyle = '#FFF';
}

function getMP(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function drawRect() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(width / 2 - scale * 5, height / 2 - scale * 5, 8*scale, 8*scale);
    ctx.fill();
}

function historyDots() {
    const x = document.querySelectorAll('td.x');
    const y = document.querySelectorAll('td.y');
    const c = document.querySelectorAll('td.c');
    for (let i = 0; i < x.length; i++) {
        ctx.beginPath();
        let valueOfX = parseFloat(x[i].innerText);
        let valueOfY = parseFloat(y[i].innerText);
        let isCorrect = c[i].innerText.toString();
        ctx.arc(valueOfX * scale + width / 2, height / 2 - valueOfY * scale, 3, 0, Math.PI * 2);
        isCorrect.startsWith("Попадание") ? ctx.fillStyle = '#0F0' : ctx.fillStyle = '#F00';
        ctx.fill();
    }
}

canvas.addEventListener('click', function (event) {
    const MP = getMP(canvas, event);
    if ((MP.x - width / 2)/scale >= -5 && (MP.x - width / 2)/scale <= 3 && (-MP.y + height / 2)/scale >= -3 && (-MP.y + height / 2)/scale <= 5) {
        document.getElementById('x-hidden').value = ((MP.x - width / 2) / scale).toFixed(2);
        document.getElementById('x-hidden').dispatchEvent(new Event('input'));
        document.getElementById('y-text').value = ((-MP.y + height / 2) / scale).toFixed(2);
        document.getElementById('y-text').dispatchEvent(new Event('input'));
        document.getElementById('x-select').value = 0;
        document.getElementById('result-button').click();
    } else {
        draw();
        drawRect();
        historyDots();
    }
    setTimeout("window.dispatchEvent(new Event('resize'))", 200);
    ctx.fillStyle= '#FFF';
    ctx.font = "12px Helvetica";
    ctx.fillText("(" + ((MP.x - width / 2) / scale).toFixed(2).toString()+"; "+((-MP.y + height / 2) / scale).toFixed(2).toString()+")", width / 60, height * 0.98);
});

canvas.addEventListener('mousemove', function (event) {
    const MP = getMP(canvas, event);
    draw();
    drawRect();
    historyDots();
    ctx.beginPath();
    ctx.fillStyle= '#FFF';
    ctx.font = "12px Helvetica";
    ctx.fillText("(" + ((MP.x - width / 2) / scale).toFixed(2).toString()+"; "+((-MP.y + height / 2) / scale).toFixed(2).toString()+")", width / 60, height * 0.98);
});

draw();
drawRect();
historyDots();