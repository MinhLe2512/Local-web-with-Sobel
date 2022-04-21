const sobel_x = [
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
];

const sobel_y = [
    -1.0, -2.0, -1.0,
    0.0,  0.0,  0.0,
    1.0, 2.0, 1.0
]

document.addEventListener('DOMContentLoaded', function() {
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var background = document.createElement('canvas');
    var backgroundContext = background.getContext('2d');

    var clientWidth, clientHeight;

    v.addEventListener('play', function(){
        clientHeight = v.clientHeight;
        clientWidth = v.clientWidth;

        canvas.width = clientWidth;
        canvas.height = clientHeight;

        background.width = clientWidth;
        background.height = clientHeight;

        draw(v, context, backgroundContext, clientWidth, clientHeight);
    }, false);

}, false);

function draw(video, canvas, backgroundContext, width, height) {
    if (video.paused || video.ended) return false;
    //Draw frame to canvas
    backgroundContext.drawImage(video, 0, 0, width, height);
    //Get pixel from canvas
    var idata = backgroundContext.getImageData(0, 0, width, height);

    var data = idata.data;
    var limit = data.length;
    var pixelArr = [];

    for(var i = 0; i < limit; i++) {
		if( i % 4 == 3 ) continue;
		pixelArr[i] = -4 * data[i] + (data[i + 4] + data[i - 4] 
            + data[i + width * 4] + data[i - width * 4]);
	}

    for (var i = 0; i < limit; i++) {
        if (i % 4 == 3) continue;
        data[i] = pixelArr[i];
    }

    idata.data = data;
    canvas.putImageData(idata, 0, 0);
    //Restart
    setTimeout(draw, 30, video, canvas, backgroundContext, width, height);
}