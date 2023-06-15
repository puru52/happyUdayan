var rows = 3;
var columns = 3;

var currTile;
var otherTile; /* blank tile */

var turns = 0;

var imgOrder = ['6', '9', '5', '4', '8', '1', '7', '2', '3'];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //img
            let tile = document.createElement('img');
            tile.id = r.toString() + '-' + c.toString();
            tile.src = "./content/" + imgOrder.shift() + ".png";


            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click an image to drag
            tile.addEventListener("dragover", dragOver); // moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);//dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);//dragged image leaving another image
            tile.addEventListener("drop", dragDrop);//drop image over another image
            tile.addEventListener("dragend", dragEnd);//after drag drop, swap two tiles


            document.getElementById('board').append(tile);
        }
    }
}

function dragStart() {
    currTile = this; //refers to image tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave(e) {
    e.preventDefault();
}
function dragDrop() {
    otherTile = this; //this refers to img tile being dropped on
}
function dragEnd() {
    if (!otherTile.src.includes("3.png")) {
        return;
    }

    let currCords = currTile.id.split("-");
    let r = parseInt(currCords[0]);
    let c = parseInt(currCords[1]);

    let otherCords = otherTile.id.split("-");
    let r2 = parseInt(otherCords[0]);
    let c2 = parseInt(otherCords[1]);

    let moveLeft = (r == r2) && (c2 == c - 1);
    let moveRight = (r == r2) && (c2 == c + 1);

    let moveUp = (r == r2 - 1) && (c == c2);
    let moveDown = (r == r2 + 1) && (c == c2);

    let isAdjacent = moveUp || moveDown || moveLeft || moveRight;
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns++;
        document.getElementById("turns").innerText = turns;
    }
}
