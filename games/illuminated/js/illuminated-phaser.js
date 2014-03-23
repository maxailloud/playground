window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvas-container', { preload: preload, create: create, render: render });

    function preload () {
    }

    var illuminated;

    var light1;
    var light2;
    var disc;
    var rect;
    var lighting1;
    var lighting2;
    var darkmask;

    var startAt = +new Date();
    var lastd;

    function create () {

        illuminated = this.game.plugins.add(Phaser.Plugin.IlluminatedPlugin);
        light1 = illuminated.createLight({'x': 100, 'y': 250, 'distance': 200, 'radius': 10, 'samples': 50});
        light2 = illuminated.createLight({'x': 300, 'y': 50,  'distance': 200, 'radius': 10, 'samples': 50, 'color': '#CCF'});

        disc = illuminated.createDiscObject({'x': 100, 'y': 100, 'radius': 30});
        rect = illuminated.createRectangleObject({ topleft: {'x': 250, 'y': 200}, bottomright: {'x': 350, 'y': 250} });

        var objects = [disc, rect];

        lighting1 = illuminated.createLighting({light: light1,objects: objects});
        lighting2 = illuminated.createLighting({light: light2,objects: objects});

        darkmask = illuminated.createDarkMask({ lights: [light1, light2] });
    }

    function render() {

        var ctx = game.context;

        var t = +new Date() - startAt;
        var d = Math.round(100*Math.cos(t/1000));
        if (d == lastd) return; // nothing has changed
        lastd = d;

        light1.position = new window.illuminated.Vec2(200-d, 150+d);
        light2.position = new window.illuminated.Vec2(200+d, 150-d);

        lighting1.compute(game.width, game.height);
        lighting2.compute(game.width, game.height);
        darkmask.compute(game.width, game.height);

        ctx.globalCompositeOperation = "lighter";
        lighting1.render(ctx);
        lighting2.render(ctx);

        ctx.globalCompositeOperation = "source-over";
        darkmask.render(ctx);
    }
};