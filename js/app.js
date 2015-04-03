// making a superclass for Enemy and Player
var Character =function (x,y, sprite, speed){
    this.x=x;
    this.y=y;
    this.sprite=sprite;
    this.speed=speed;
}
//the render() below can be used for both Enemy and Player subclasses.
Character.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Enemies our player must avoid
var Enemy = function(x,y, sprite, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y, sprite, speed);
    //Above I use superclass Character to derive subclass Enemy from.
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype=Object.create(Character.prototype);
Enemy.prototype.constructor=Enemy;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x=this.x+this.speed*dt*30;
    this.y=this.y+this.speed*dt*20;
    if (this.x>canvas.width){ //need to fix the wrap around
       this.x=20;
    }
    if (this.y>canvas.height){
       this.y=20;
    }
}

// Draw the enemy on the screen, required method for game
//My solution: Enemy.prototype.render deligates to Character.prototype.render

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y,sprite, speed){
    Character.call(this, x, y, sprite, speed);
}
Player.prototype=Object.create(Character.prototype);
Player.prototype.constructor=Player;
//Player.prototype.render deligates to Character.prototype.render
Player.prototype.update=function(){
    this.handleInput();
    if ((this.x<0)||(this.x>canvas.width)||(this.y<0)||(this.y>canvas.height)){
        this.reset();
    }
}
Player.prototype.reset=function(){
    this.x=200;
    this.y=300;
    alert("going back to the start!", 220, 300);
}
Player.prototype.handleInput=function(laLleva){
    switch(laLleva){
        case "left" :
        this.x -=this.speed;
        break;
        case "up":
        this.y -=this.speed;
        break;
        case "right":
        this.x +=this.speed;
        break;
        case "down":
        this.y +=this.speed;
        break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies=[];
for (var i=1; i<3; i++){
    for (var j=1; j<3; j++) {
        var sprite = 'images/enemy-bug.png';
        allEnemies.push(new Enemy(i*80, j*100, sprite,0.3*i*j));
    }
}

// Place the player object in a variable called player
var sprite='images/char-cat-girl.png';
var player=new Player(200, 300,sprite,25);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
