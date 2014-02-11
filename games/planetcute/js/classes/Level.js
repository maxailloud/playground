PlanetCute.Level = function(game) {

    this.game = game;
    this.background;
};

PlanetCute.Level.prototype = {
    create: function() {
        var gradientBackground = this.game.add.bitmapData(this.game.width, this.game.height)
        gradientBackground
            .beginLinearGradientFill(["#79A8FF","#FFF"], [0, 1], 0, 0, 0, this.game.height)
            .fillRect(0, 0, this.game.width, this.game.height);

        var background = this.game.add.sprite(0, 0, gradientBackground);

//        var wood_block = this.game.add.sprite(0, 0, 'world');
//        wood_block.frameName = "wood_block";
//        var grass_block = this.game.add.sprite(101, 0, 'world');
//        grass_block.frameName = "grass_block";
//        var water_block = this.game.add.sprite(202, 0, 'world');
//        water_block.frameName = "water_block";
//        var brown_block = this.game.add.sprite(303, 0, 'world');
//        brown_block.frameName = "brown_block";
//        var dirt_block = this.game.add.sprite(404, 0, 'world');
//        dirt_block.frameName = "dirt_block";
//        var plain_block = this.game.add.sprite(505, 0, 'world');
//        plain_block.frameName = "plain_block";
//        var stone_block = this.game.add.sprite(606, 0, 'world');
//        stone_block.frameName = "stone_block";
//        var stone_block_tall = this.game.add.sprite(707, 0, 'world');
//        stone_block_tall.frameName = "stone_block_tall";
//        var wall_block = this.game.add.sprite(808, 0, 'world');
//        wall_block.frameName = "wall_block";
//        var wall_block_tall = this.game.add.sprite(909, 0, 'world');
//        wall_block_tall.frameName = "wall_block_tall";
//
//        var ramp_west = this.game.add.sprite(0, 171, 'world');
//        ramp_west.frameName = "ramp_west";
//        var ramp_east = this.game.add.sprite(101, 171, 'world');
//        ramp_east.frameName = "ramp_east";
//        var ramp_south = this.game.add.sprite(202, 171, 'world');
//        ramp_south.frameName = "ramp_south";
//        var ramp_north = this.game.add.sprite(303, 171, 'world');
//        ramp_north.frameName = "ramp_north";
//        var door_tall_open = this.game.add.sprite(404, 171, 'world');
//        door_tall_open.frameName = "door_tall_open";
//        var door_tall_closed = this.game.add.sprite(505, 171, 'world');
//        door_tall_closed.frameName = "door_tall_closed";
//        var tree_short = this.game.add.sprite(606, 171, 'world');
//        tree_short.frameName = "tree_short";
//        var tree_tall = this.game.add.sprite(707, 171, 'world');
//        tree_tall.frameName = "tree_tall";
//        var tree_ugly = this.game.add.sprite(808, 171, 'world');
//        tree_ugly.frameName = "tree_ugly";
//        var rock = this.game.add.sprite(909, 171, 'world');
//
//        var roof_west = this.game.add.sprite(0, 342, 'world');
//        roof_west.frameName = "roof_west";
//        var ramp_east = this.game.add.sprite(101, 342, 'world');
//        ramp_east.frameName = "ramp_east";
//        var roof_north_west = this.game.add.sprite(202, 342, 'world');
//        roof_north_west.frameName = "roof_north_west";
//        var roof_north_east = this.game.add.sprite(303, 342, 'world');
//        roof_north_east.frameName = "roof_north_east";
//        var roof_south_west = this.game.add.sprite(404, 342, 'world');
//        roof_south_west.frameName = "roof_south_west";
//        var roof_south_east = this.game.add.sprite(505, 342, 'world');
//        roof_south_east.frameName = "roof_south_east";
//        var roof_north = this.game.add.sprite(606, 342, 'world');
//        roof_north.frameName = "roof_north";
//        var roof_south = this.game.add.sprite(707, 342, 'world');
//        roof_south.frameName = "roof_south";
//        var window_tall = this.game.add.sprite(808, 342, 'world');
//        window_tall.frameName = "window_tall";
//        var selector = this.game.add.sprite(909, 342, 'world');
//        selector.frameName = "selector";

//        var star = this.game.add.sprite(0, 513, 'world');
//        star.frameName = "star";

        var wood_block = this.game.add.sprite(200, 200, 'world');
        wood_block.frameName = "wood_block";
        var wood_block2 = this.game.add.sprite(200, 161, 'world');
        wood_block2.frameName = "wood_block";
        var wood_block3 = this.game.add.sprite(200, 121, 'world');
        wood_block3.frameName = "wood_block";
        var wood_block4 = this.game.add.sprite(200, 81, 'world');
        wood_block4.frameName = "wood_block";
    },

    update: function() {
    },

    render: function() {
    }
};