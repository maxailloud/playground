window.onload = function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var light1 = new window.illuminated.Lamp({
        position: new window.illuminated.Vec2(100, 250),
        distance: 200,
        radius: 10,
        samples: 50
    });
    var light2 = new window.illuminated.Lamp({
        position: new window.illuminated.Vec2(300, 50),
        color: '#CCF',
        distance: 200,
        radius: 10,
        samples: 50
    });
    var disc = new window.illuminated.DiscObject({ center: new window.illuminated.Vec2(100, 100), radius: 30 });
    var rect = new window.illuminated.RectangleObject({ topleft: new window.illuminated.Vec2(250, 200), bottomright: new window.illuminated.Vec2(350, 250) });

    var objects = [ disc, rect ];

    var lighting1 = new window.illuminated.Lighting({
        light: light1,
        objects: objects
    });
    var lighting2 = new window.illuminated.Lighting({
        light: light2,
        objects: [ disc, rect ]
    });

    var darkmask = new window.illuminated.DarkMask({ lights: [light1, light2] });

    lighting1.compute(canvas.width, canvas.height);
    lighting2.compute(canvas.width, canvas.height);
    darkmask.compute(canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.beginPath();
    disc.path(ctx);
    ctx.fill();
    ctx.beginPath();
    rect.path(ctx);
    ctx.fill();

    ctx.globalCompositeOperation = "lighter";
    lighting1.render(ctx);
    lighting2.render(ctx);

    ctx.globalCompositeOperation = "source-over";
    darkmask.render(ctx);

    var startAt = +new Date();
    var lastd;

    function render () {
        var t = +new Date() - startAt;
        var d = Math.round(100*Math.cos(t/1000));
        if (d == lastd) return; // nothing has changed
        lastd = d;

        light1.position = new window.illuminated.Vec2(200-d, 150+d);
        light2.position = new window.illuminated.Vec2(200+d, 150-d);

        lighting1.compute(canvas.width, canvas.height);
        lighting2.compute(canvas.width, canvas.height);
        darkmask.compute(canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.beginPath();
        disc.path(ctx);
        ctx.fill();
        ctx.beginPath();
        rect.path(ctx);
        ctx.fill();

        ctx.globalCompositeOperation = "lighter";
        lighting1.render(ctx);
        lighting2.render(ctx);

        ctx.globalCompositeOperation = "source-over";
        darkmask.render(ctx);
    }

    requestAnimFrame(function loop(){
        requestAnimFrame(loop, canvas);
        render();
    }, canvas);
};