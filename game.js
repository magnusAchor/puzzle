const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const playerSpeed = 160;
let player;
let platforms;
let goal;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('goal', 'assets/goal.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    // Background
    this.add.image(400, 300, 'background');

    // Platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // Goal
    goal = this.physics.add.image(750, 400, 'goal').setImmovable(true);

    // Player
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(32, 48, true);

    // Physics
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, goal, onGoalReached, null, this);

    // Input Events
    this.input.on('pointerdown', function (pointer) {
        if (pointer.x < player.x) {
            player.setVelocityX(-playerSpeed);
        } else {
            player.setVelocityX(playerSpeed);
        }
    });

    this.input.on('pointerup', function () {
        player.setVelocityX(0);
    });
}

function update() {
    // Add custom game logic here
}

function onGoalReached() {
    alert('Congratulations! You reached the goal!');
}
