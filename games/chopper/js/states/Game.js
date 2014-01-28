Chopper.Game = function(game) {

    //When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //a reference to the currently running game
    this.add;       //used to add sprites, text, groups, etc
    this.camera;    //a reference to the game camera
    this.cache;     //the game cache
    this.input;     //the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;      //for preloading assets
    this.math;      //lots of useful common math operations
    this.sound;     //the sound manager - add a sound, play one, set-up markers, etc
    this.stage;     //the game stage
    this.time;      //the clock
    this.tweens;    //the tween manager
    this.world;     //the game world
    this.particles; //the particle manager
    this.physics;   //the physics manager
    this.rnd;       //the repeatable random number generator
    //You can use any of these from any function within this State.
    //But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.player = null;
    this.level  = null;
    this.hud    = null;
};

Chopper.Game.prototype = {

    preload: function() {
        this.level = new Level(this.game);
        this.level.preload();

        this.player = new Player(this.game, this.level);
        this.player.preload();

        this.hud = new HUD(this.game);
        this.hud.preload();
    },

    create: function() {
        this.level.create();
        this.player.create();
        this.hud.create();
    },

    update: function() {
        this.level.update();
        this.player.update();
        this.hud.update();
    },

    render: function() {

        this.game.debug.renderText("x : " + this.game.input.mousePointer.x, 32, 410);
        this.game.debug.renderText("y : " + this.game.input.mousePointer.y, 32, 430);
        this.game.debug.renderText("Sound " + !this.game.sound._muted, 150, 410);

        this.level.render();
        this.hud.render();
    },

    quitGame: function(pointer) {

        this.game.state.start('MainMenu');

    }

};