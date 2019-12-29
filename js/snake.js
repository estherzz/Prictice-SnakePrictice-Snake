function Snake(imgs) {
    this.imgs = imgs;
    this.head = imgs.head;
    this.head_idx = 2;//头部图片的下标
    this.tail = imgs.tail;
    this.tail_idx = 0;
    this.position = [
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
    ];
    this.direction = 39;
}

Snake.prototype.move = function () {

    var new_head = {
        row: this.position[this.position.length - 1].row,
        col: this.position[this.position.length - 1].col
    }
    //根据方向改变头部图片 和 头部坐标
    if (this.direction == 37) {
        this.head_idx = 0;
        new_head.col--;
    } else if (this.direction == 38) {
        this.head_idx = 1;
        new_head.row--;
    } else if (this.direction == 39) {
        this.head_idx = 2;
        new_head.col++;
    } else if (this.direction == 40) {
        this.head_idx = 3;
        new_head.row++;
    }
    //growup时添加的尾巴

    this.position.shift();
    this.position.push(new_head);

    //改变尾巴处理
    var tail = this.position[0];
    var pg = this.position[1];
    if (tail.row == pg.row) {
        this.tail_idx = tail.col > pg.col ? 2 : 0;
    } else {
        this.tail_idx = tail.row > pg.row ? 3 : 1;
    }



}

Snake.prototype.growUp = function () {

    console.log('身体长')
    var tail = {
        row: this.position[0].row,
        col: this.position[0].col,
    }
    this.position.unshift(tail)
    console.log(this.position[0])

}
