function Map(width, height, row, col) {
    this.dom = document.createElement('div');
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    this.divs = [];
}

Map.prototype.renderMap = function () {
    for (var i = 0; i < this.row; i++) {
        var divrow = document.createElement('div');
        divrow.className = 'row';
        divrow.style.width = this.width + 'px';
        divrow.style.height = this.height / this.row + 'px';

        //创建一个行数组
        var arr = [];
        for (var j = 0; j < this.col; j++) {
            var divcol = document.createElement('div');
            divcol.className = 'col';
            //将列放入行
            divrow.appendChild(divcol);
            divcol.style.width = this.width / this.col + 'px';
            divcol.style.height = this.height / this.row + 'px';
            arr.push(divcol)
        }
        //将行放入map
        this.dom.appendChild(divrow);
        this.divs.push(arr);

    }
    //将map放入body
    document.body.appendChild(this.dom);
    this.dom.style.border = '1px solid grey'
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
}

Map.prototype.clear = function () {
    for (var i = 0; i < this.divs.length; i++) {
        for (var j = 0; j < this.divs[i].length; j++) {
            this.divs[i][j].style.backgroundImage = 'none'
        }
    }
}