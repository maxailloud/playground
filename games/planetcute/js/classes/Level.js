PlanetCute.Level = function(game) {

    this.game = game;
    this.background;
    this.tiles;
};

PlanetCute.Level.prototype = {
    create: function() {
        var gradientBackground = this.game.add.bitmapData(this.game.width, this.game.height)
        gradientBackground
            .beginLinearGradientFill(["#79A8FF","#FFF"], [0, 1], 0, 0, 0, 200)
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
//        rock.frameName = "rock";
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

        var layers = [
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block']
            ],
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block']
            ],
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                ['stone_block', 'water_block', 'water_block', 'plain_block', 'plain_block', 'plain_block', 'plain_block'],
                ['stone_block', 'water_block', 'water_block', 'grass_block', 'stone_block', 'stone_block', 'stone_block'],
                ['stone_block', 'water_block', 'water_block', 'stone_block', 'stone_block', 'stone_block', 'ramp_south'],
                ['grass_block', 'water_block', 'water_block', 'grass_block', null, null, null],
                ['grass_block', 'water_block', 'water_block', 'grass_block', null, null, 'rock']
            ],
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, 'wall_block', 'door_tall_closed', 'wall_block'],
                ['ramp_west', 'stone_block', 'stone_block', 'stone_block', 'ramp_east', null, null],
                [null, null, null, null, null, null, null],
                ['tree_short', null, null, null, null, null, null],
                [null, null, null, 'rock', null, null, null],
            ],
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, 'wall_block', null, 'wall_block'],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
            ],
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, 'wall_block', null, 'wall_block'],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
            ]
        ];

        this.tiles = this.game.add.group();

        for (var layerIndex in layers) {
            var layer = layers[layerIndex];
            for (var lineIndex in layer) {
                var line = layer[lineIndex];
                for (var rowIndex in line) {
                    var row = line[rowIndex];
                    if (null != row) {
                        var tile = this.tiles.create(rowIndex * 101, (lineIndex * 171) - (1 + lineIndex * 90) - (layerIndex * 40), 'world', row);
                        tile.name = 'block' + layerIndex + lineIndex + rowIndex;
                        tile.body.immovable = true;
                        tile.body.moves = true;
                    }
                }
            }
        }
    },

    update: function() {
    },

    render: function() {
    }
};