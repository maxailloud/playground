/**
 * Constructor.
 *
 * @param parent
 * @constructor
 */
Phaser.Plugin.IlluminatedPlugin = function (parent) {

    if (typeof window.illuminated !== 'object') {
        throw new Error("Illuminated is not defined!");
    }

    this.parent = parent;
};

Phaser.Plugin.IlluminatedPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.IlluminatedPlugin.prototype.constructor = Phaser.Plugin.IlluminatedPlugin;
