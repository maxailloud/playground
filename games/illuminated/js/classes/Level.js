Illuminated.Level = function(game) {
    this.game = game;

    this.illuminated;
    this.lamp;
};

Illuminated.Level.prototype = {
    create: function() {
        this.illuminated = this.game.plugins.add(Phaser.Plugin.IlluminatedPlugin);

        var vec = new window.illuminated.Vec2(12, 34);
        this.lamp = new window.illuminated.Lamp();
    },

    update: function() {
        this.lamp.render(this.game.context);
    },

    render: function() {
    }
};