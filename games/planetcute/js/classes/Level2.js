PlanetCute.Level = function(game) {

    this.game = game;
    this.background;
    this.groundLayer;
    this.tileLayer;
    this.rockLayer;
};

PlanetCute.Level.prototype = {
    create: function() {
        var gradientBackground = this.game.add.bitmapData(this.game.width, this.game.height)
        gradientBackground
            .beginLinearGradientFill(["#79A8FF","#FFF"], [0, 1], 0, 0, 0, 200)
            .fillRect(0, 0, this.game.width, this.game.height);

        var background = this.game.add.sprite(0, 0, gradientBackground);

        var tilesLayers = [
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block'],
                ['grass_block', 'grass_block', 'grass_block', 'stone_block', 'stone_block', 'dirt_block', 'dirt_block']
            ]
        ];
        var rockLayer = [
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, 'rock', 'rock'],
                [null, null, null, null, null, 'rock', 'rock'],
                [null, null, null, null, null, 'rock', 'rock'],
                [null, null, null, null, null, 'rock', 'rock'],
                [null, null, null, null, null, 'rock', 'rock']
            ]
        ];
        var groundLayers = [
            [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block'],
                ['dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block', 'dirt_block']
            ]
        ];

        this.groundLayer   = this.game.add.group();
        this.groundLayer.z = 0;
        this.tileLayer   = this.game.add.group();
        this.tileLayer.z = 1;
        this.rockLayer   = this.game.add.group();
        this.rockLayer.z = 0;

        for (var layerIndex in groundLayers) {
            var layer = groundLayers[layerIndex];
            for (var lineIndex in layer) {
                var line = layer[lineIndex];
                for (var rowIndex in line) {
                    var row = line[rowIndex];
                    if (null != row) {
                        var tile = this.groundLayer.create(rowIndex * 101, (lineIndex * 171) - (1 + lineIndex * 90) - (layerIndex * 40), 'world', row);
                        tile.name = 'block' + layerIndex + lineIndex + rowIndex;
                        tile.body.immovable = true;
                        tile.body.moves = false;
                    }
                }
            }
        }

        for (var layerIndex in tilesLayers) {
            var layer = tilesLayers[layerIndex];
            for (var lineIndex in layer) {
                var line = layer[lineIndex];
                for (var rowIndex in line) {
                    var row = line[rowIndex];
                    if (null != row) {
                        var tile = this.tileLayer.create(rowIndex * 101, (lineIndex * 171) - (1 + lineIndex * 90) - (layerIndex * 40 + 40), 'world', row);
                        tile.name = 'block' + layerIndex + lineIndex + rowIndex;
                        tile.body.immovable = true;
                        tile.body.moves = false;
                    }
                }
            }
        }

        for (var layerIndex in rockLayer) {
            var layer = rockLayer[layerIndex];
            for (var lineIndex in layer) {
                var line = layer[lineIndex];
                for (var rowIndex in line) {
                    var row = line[rowIndex];
                    if (null != row) {
                        var tile = this.rockLayer.create(rowIndex * 101, (lineIndex * 171) - (1 + lineIndex * 90) - (layerIndex * 40 + 80), 'world', row);
                        tile.name = 'block' + layerIndex + lineIndex + rowIndex;
                        tile.body.immovable = true;
                        tile.body.moves = false;
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