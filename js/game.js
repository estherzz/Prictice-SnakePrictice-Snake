function Game(map, stone, snake, cake) {
    this.map = map;
    this.stone = stone;
    this.snake = snake;
    this.cake = cake;
    this.timer = null;
    this.lock = false;


    this.init();
}
Game.prototype.renderStone = function () {
    for (var i = 0; i < this.stone.position.length; i++) {
        var div = this.map.divs[this.stone.position[i].row][this.stone.position[i].col];
        div.style.backgroundImage = 'url(' + this.stone.img + ')';
        div.style.backgroundSize = 'cover';
    }
}

Game.prototype.renderCake = function () {
    var div = this.map.divs[this.cake.row][this.cake.col];
    div.style.backgroundImage = 'url(' + this.cake.img + ')';
    div.style.backgroundSize = 'cover';
}

Game.prototype.renderSnake = function () {

    //先渲染身体，吃到食物的时候，多加了snake.position的[0]和[1]相同，所以先渲染身体，尾巴会覆盖
    //身体
    for (var i = 1; i < this.snake.position.length - 1; i++) {
        var div = this.map.divs[this.snake.position[i].row][this.snake.position[i].col];
        div.style.backgroundImage = 'url(' + this.snake.imgs.body + ')';
        div.style.backgroundSize = 'cover';
    }

    //尾巴
    console.log('尾吧渲染')
    console.log(this.snake.position)
    var div = this.map.divs[this.snake.position[0].row][this.snake.position[0].col];
    console.log(div)
    div.style.backgroundImage = 'url(' + this.snake.tail[this.snake.tail_idx] + ')';
    div.style.backgroundSize = 'cover';

    //头部
    var div = this.map.divs[this.snake.position[this.snake.position.length - 1].row][this.snake.position[this.snake.position.length - 1].col];
    div.style.backgroundImage = 'url(' + this.snake.head[this.snake.head_idx] + ')';
    div.style.backgroundSize = 'cover';
}

Game.prototype.init = function () {
    this.map.renderMap();
    this.renderCake();
    this.renderStone();
    this.renderSnake();
    this.bingEvent()
    this.start();
}

Game.prototype.start = function () {
    var me = this;
    this.timer = setInterval(function () {
        me.lock = false;
        me.snake.move();
        me.check();
        me.map.clear();
        me.renderCake();
        me.renderStone();
        me.renderSnake();
    }, 300)
}

Game.prototype.bingEvent = function () {
    var me = this;
    document.onkeydown = function (e) {
        if (me.lock) {
            return
        }
        me.lock = true;
        console.log(me.snake.direction)
        if (e.keyCode <= 40 && e.keyCode >= 37) {

            if (Math.abs(e.keyCode - me.snake.direction) != 2) {
                me.snake.direction = e.keyCode;
            }

        }
    }
}

Game.prototype.check = function () {
    //头部move后的row 和 col
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;


    //障碍物检查
    for (var i = 0; i < this.stone.position.length; i++) {
        if (row == this.stone.position[i].row && col == this.stone.position[i].col) {
            this.gameOver('遇到障碍物！');
        }
    };

    //出界检查
    if (row == this.map.row || row < 0 || col == this.map.col || col < 0) {
        this.gameOver('出界！');
    }

    //遇到食物检查
    if (row == this.cake.row && col == this.cake.col) {
        //长身体
        this.snake.growUp();
        //蛋糕变位置
        this.cake.row = parseInt(Math.random() * this.map.divs.length);
        this.cake.col = parseInt(Math.random() * this.map.divs.length);
    }

    //遇到自己身体gameover
    for (var i = 0; i < this.snake.position.length - 1; i++) {
        if (row == this.snake.position[i].row && col == this.snake.position[i].col) {
            this.gameOver('遇到自己！');
        }
    }


}


Game.prototype.gameOver = function (j) {
    clearInterval(this.timer);
    this.map.dom.innerHTML = '<img src="img/gameover.jpg">' + j
}