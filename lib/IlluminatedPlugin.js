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

/**
 * A circular light rendered as a radial gradient. Lamps can also be "oriented"
  in a specific direction.
 *
 * @param options Options to configure the light. Available options listed below
 *
 * @param {Object} [options] Options to be applied to this lamp.
 * @param {Number} [options.x] Position of the light on the x axis
 * @param {Number} [options.y] Position of the light on the y axis
 * @param {Number} [options.distance=100] Intensity of this lamp.
 * @param {Number} [options.diffuse=0.8] How diffuse this lamp is.
 * @param {String} [options.color='rgba(250,220,150,0.8)'] The color emitted by the lamp.
 * The color can be specified in any CSS format.
 * @param {Number} [options.radius=0] The size of the lamp. Bigger lamps cast smoother shadows.
 * @param {Number} [options.samples=1] The number of points which will be used for shadow projection.
 * It defines the quality of the rendering.
 * @param {Number} [options.angle=0] The angle of the orientation of the lamp.
 * @param {Number} [options.roughness=0] The roughness of the oriented effect.
 *
 * @return window.illuminated.Lamp
 */
Phaser.Plugin.IlluminatedPlugin.prototype.createLight = function (options) {
    return new window.illuminated.Lamp({
        position:  new window.illuminated.Vec2(options.x, options.y),
        distance:  options.distance,
        diffuse:   options.diffuse,
        color:     options.color,
        radius:    options.radius,
        samples:   options.samples,
        angle:     options.angle,
        roughness: options.roughness
    });
};

/**
 * A circular, opaque object.
 *
 * @param {Object} [options] Options to be applied to this disc object.
 * @param {Number} [options.x] Position of the disc object on the x axis
 * @param {Number} [options.y] Position of the disc objet on the y axis
 * @param {Number} [options.radius] Size of the disc object.
 *
 * @return window.illuminated.DiscObject
 */
Phaser.Plugin.IlluminatedPlugin.prototype.createDiscObject = function (options) {
    return new window.illuminated.DiscObject({
        center:  new window.illuminated.Vec2(options.x, options.y),
        radius:  options.radius
    });
};

/**
 * A rectangular, opqaue object.
 *
 * @param {Object} [options] Options to be applied to this rectangle object.
 * @param {Number} [options.topleft.x] Top-left position of the rectangle on the x axis
 * @param {Number} [options.topleft.y] Top-left position of the rectangle on the y axis
 * @param {Number} [options.bottomright.x] Bottom-right position of the rectangle on the x axis
 * @param {Number} [options.bottomright.y] Bottom-right position of the rectangle on the y axis
 *
 * @return window.illuminated.RectangleObject
 */
Phaser.Plugin.IlluminatedPlugin.prototype.createRectangleObject = function (options) {
    return new window.illuminated.RectangleObject({
        topleft: new window.illuminated.Vec2(options.topleft.x, options.topleft.y),
        bottomright: new window.illuminated.Vec2(options.bottomright.x, options.bottomright.y)
    });
};

/**
 * Defines the lighting of one light through a set of opaque objects.
 *
 * @param {Object} [options] Options to be applied to this light.
 * @param {illuminated.Light} [options.lamp] The source of the lighting.
 * @param {Array} [options.objects] An array of {{#crossLink "illuminated.OpaqueObject"}}{{/crossLink}} objects
 * stop the light and create shadows.
 *
 * @return window.illuminated.Lighting
 */
Phaser.Plugin.IlluminatedPlugin.prototype.createLighting = function (options) {
    return new window.illuminated.Lighting({light: options.light, objects: options.objects});
};

/**
 * Defines the dark layer which hides the dark area not illuminated by a set of lights.
 *
 * @param {Object} [options] Options to be applied to this light.
 * @param {Array} [options.lights] An array of {{#crossLink "illuminated.Light"}}{{/crossLink}} objects
 * that illuminate the rest of the scene.
 * @param {String} [options.color] The color of the dark area in RGBA format.
 *
 * @return window.illuminated.DarkMask
 */
Phaser.Plugin.IlluminatedPlugin.prototype.createDarkMask = function (options) {
    return new window.illuminated.DarkMask({ lights: options.lights, color: options.color });
};
