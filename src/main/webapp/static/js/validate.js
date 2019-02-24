let addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

function validate() {
    let str, check = true;

    document.getElementById('y-text').onkeydown = function() {
        if (check) str = document.getElementById('y-text').value;
        check = false;
    };

    document.getElementById('y-text').onkeyup = function() {
        if ((!/^-?\d*[.,]?\d{0,3}$/.test(document.getElementById('y-text').value))||
            ((parseFloat(document.getElementById('y-text').value.replace(/,/,'.'))<-3)||
                (parseFloat(document.getElementById('y-text').value.replace(/,/,'.'))>5))) {
            document.getElementById('y-text').value = str;
        }
        check = true;
    };

    document.getElementById('r-select').onchange = function() {
        if (this.value >= 0) radius = this.value * scale
        else radius = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        drawRect()
        historyDots();
    };

    addEvent(window, "resize", function(event) {
        if (window.innerWidth > 792) {
            canvas.width = window.innerWidth * 0.4;
            canvas.height = window.innerWidth * 0.4;
            width = canvas.width;
            height = canvas.height;
            scale = canvas.width / 12;
        } else {
            canvas.width = window.innerWidth * 0.9;
            canvas.height = window.innerWidth * 0.9;
            width = canvas.width;
            height = canvas.height;
            scale = canvas.width / 12;
        }

        if (document.getElementById('r-select').value >= 0) radius = scale * document.getElementById('r-select').value;
        else radius = 0;
        draw();
        drawRect()
        historyDots();
        const x = document.querySelectorAll('td.x');
        const y = document.querySelectorAll('td.y');
        if (x.length > 0) {
            ctx.beginPath();
            let valueOfX = parseFloat(x[0].innerText);
            let valueOfY = parseFloat(y[0].innerText);
            ctx.fillStyle= '#FFF';
            ctx.font = "12px Helvetica";
            ctx.fillText("(" + valueOfX.toFixed(2).toString()+"; "+ valueOfY.toFixed(2).toString()+")", width / 60, height * 0.98);
        }

    });



    addEvent(document, "fullscreenchange", function(event) {
        window.dispatchEvent(new Event('resize'));
    });

    window.dispatchEvent(new Event('resize'));
}

validate();
