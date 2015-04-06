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
//Gems for the player to collect,
var Gem=function(x,y, sprite) {
    Character.call(this, x, y, sprite,0);
}
Gem.prototype=Object.create(Character.prototype);
Gem.prototype.constructor=Gem;
Gem.prototype.putaway=function(){
    this.x=-100;
    this.y=-100;
}
// Enemies our player must avoid
    var Enemy = function(x,y, sprite, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y, sprite, speed);
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
       this.x=canvas.width/4;
    }
    if (this.y>canvas.height){
       this.y=canvas.height/3;
    }
}

// Draw the enemy on the screen, required method for game
//My solution: Enemy.prototype.render deligates to Character.prototype.render

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.*Player.prototype.render deligates
//to Character.prototype.render

var Player = function(x,y,sprite, speed){
    Character.call(this, x, y, sprite, speed);
}
Player.prototype=Object.create(Character.prototype);
Player.prototype.constructor=Player;
Player.prototype.reset=function(){
    this.x=20;
    this.y=400;
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
Player.prototype.collisionCheck=function(enemy){
    if (this.crossPath(enemy)){
        this.reset();
        alert("Collision, start again!");//TODO: figure out how to continue the alert after the first alert
    }
}
//player collect gems, and gains speed after each collection
Player.prototype.collectionCheck=function(gem){
    if(this.crossPath(gem)){
        gem.putaway();
        this.speed *=2;
        alert("Got a gem! Player will move twice as fast.");
    }
}
//crossPath can be used to check meeting of player with either enemy or gem
Player.prototype.crossPath=function(object){
    return(object.x-20<this.x&&object.x+20>this.x&&object.y-20<this.y&&object.y+20>this.y) ? true: false;
}
Player.prototype.update=function(){
    this.handleInput();
    if (this.y<=0){
        this.y=0;
        alert("Congratulations, you have arrIved!");//TODO: figure out why if I add ctx.strokeText("Wow!"); here, the red darting dot leaves trail
    } else if (this.x<-40||this.x>canvas.width-40||this.y>canvas.height-40){
        alert("No crossing the border! Start over.");
        this.reset();
    }
    for (var i=0; i<allEnemies.length; i++){
        this.collisionCheck(allEnemies[i]);
    }
    for (var i=0; i<allGems.length;i++){
        this.collectionCheck(allGems[i]);
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies=[];
for (var i=1; i<3; i++){
    for (var j=1; j<3; j++) {
        var sprite = 'images/enemy-bug.png';
        allEnemies.push(new Enemy(i*120, j*200, sprite,0.3*i*j));
    }
}
//Place gems in an array allGems
var allGems=[];
var gemGreen="images/gem-green.png", gemBlue="images/gem-blue.png";
allGems[0]=new Gem(150, 100,gemGreen);
allGems[1]=new Gem(250, 260, gemBlue);

// Place the player object in a variable called player
var sprite='images/char-cat-girl.png';
var player=new Player(0, 400,sprite,10);

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
