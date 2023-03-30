// USANDO JSON EN LUGAR DE XML
const button = document.getElementById("button");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const idFrom = document.getElementById("fromstart");
const idDestination = document.getElementById("toend");
const ctx = canvas.getContext("2d");
const sprite = new Image();
const imgWidth = 275;
const imgHeight = 219;
let jsonData;

async function init() {
  const jsonFile = await loadJSON("/grid.json");
  jsonData = jsonFile;
}

async function loadJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

window.addEventListener("load", () => {
  sprite.onload = function () {
    ctx.drawImage(sprite, 0, 0, imgWidth, imgHeight);
  };
  sprite.src = "./grid.png";
});

button.addEventListener("click", (e) => {
  // create a new grid and parse the loaded JSON into it.
  let grid = new Grid();
  grid.parseJSON(JSON.stringify(jsonData));
  // find a path between two node Id's
  //   console.log(grid.findPath("n1", "n5"));
  //   console.log(JSON.stringify(grid.findPath("n1", "n6")));
  // drawImageSample(grid.findPath("n1", "n5"));
  const findPath = grid.findPath(
    String(idFrom.value),
    String(idDestination.value)
  );
  drawImageSample(findPath);

});

function drawImageSample(awayData) {
  sprite.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (awayData != null || awayData != undefined) {
      ctx.drawImage(sprite, 0, 0, imgWidth, imgHeight);
      ctx.beginPath();
      awayData.path.forEach((label) => {
        const point = jsonData[label];
        drawDot(point, label);
      });
    } else {
      return;
    }
  };
  sprite.src = "/grid.png";
}

function drawDot(point, label) {
  ctx.save();
  ctx.fillStyle = "#00ff00";
  ctx.shadowOffsetX = -1;
  ctx.shadowOffsetY = 1;
  ctx.shadowColor = `#000`;
  ctx.textAlign = "center";
  ctx.textBaseline = "left";
  ctx.font = "Bold 20px Arial";
  ctx.fillText(label, point.x, point.y);
  ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
  ctx.strokeStyle = "#000";
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

class Grid {
  constructor() {
    this.nodes = {};
  }

  parseXML(xml) {
    for (const nodeXML of xml.querySelectorAll("node")) {
      const id = nodeXML.getAttribute("id");
      const x = parseFloat(nodeXML.getAttribute("x"));
      const y = parseFloat(nodeXML.getAttribute("y"));
      const node = new Node(id, x, y);
      node.parseNeighbors(nodeXML.getAttribute("join"));
      this.nodes[id] = node;
    }
  }

  parseJSON(json) {
    const nodesJSON = JSON.parse(json);

    for (const id in nodesJSON) {
      const nodeJSON = nodesJSON[id];
      const x = parseFloat(nodeJSON.x);
      const y = parseFloat(nodeJSON.y);

      const node = new Node(id, x, y);
      node.parseNeighbors(nodeJSON.join);

      this.nodes[id] = node;
    }
  }

  getNodeById(id) {
    if (this.nodes[id]) return this.nodes[id];
    return null;
  }

  findPath(startId, goalId) {
    const stack = [new Path(0, 0, [startId])];
    let best = new Path();
    const reachedNodes = {};
    let cyc = 0;
    while (stack.length > 0) {
      const searchPath = stack.shift();

      const searchNode = this.getNodeById(searchPath.lastElement);

      for (let j = 0; j < searchNode.numNeighbors; j++) {
        const branch = searchPath.clone();

        const expandNode = searchNode.getNeighbor(j);

        if (!branch.containsNode(expandNode)) {
          const prevCoord = this.getNodeById(branch.lastElement);
          const currentCoord = this.getNodeById(expandNode);
          const goalCoord = this.getNodeById(goalId);

          branch.addNode(expandNode);

          branch.length += Math.sqrt(
            Math.pow(currentCoord.x - prevCoord.x, 2) +
              Math.pow(currentCoord.y - prevCoord.y, 2)
          );
          branch.bestCase =
            branch.length +
            Math.sqrt(
              Math.pow(currentCoord.x - goalCoord.x, 2) +
                Math.pow(currentCoord.y - goalCoord.y, 2)
            );

          let shortest = reachedNodes[expandNode];
          if (isNaN(shortest)) shortest = branch.length;

          if (
            branch.length <= shortest &&
            (!best.hasLength || branch.bestCase < best.length)
          ) {
            reachedNodes[expandNode] = branch.length;

            if (expandNode === goalId) {
              best = branch;
            } else {
              stack.push(branch);
            }
          }
        }
      }

      stack.sort((a, b) => {
        if (a.bestCase < b.bestCase) return -1;
        else if (a.bestCase > b.bestCase) return 1;
        else return 0;
      });
      cyc++;
    }
    return best;
  }
}

class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this._neighbors = [];
  }

  parseNeighbors(join) {
    const dots = join.split(",");
    // for (const dot of dots) {
    //   this._neighbors.push(dot);
    // }
    dots.map((dot) => {
      this._neighbors.push(dot);
    });
  }

  getNeighbor(index) {
    return this._neighbors[index];
  }

  get numNeighbors() {
    return this._neighbors.length;
  }
}

class Path {
  constructor(length = 0, bestCase = 0, path = []) {
    this._length = length;
    this._bestCase = bestCase;
    this._path = path;
  }

  clone() {
    return new Path(this.length, this.bestCase, [...this.path]);
  }

  addNode(id) {
    this._path.push(id);
  }

  addNodes(ids) {
    this._path.push(...ids);
  }

  containsNode(id) {
    return this._path.includes(id);
  }

  get lastElement() {
    return this._path[this._path.length - 1];
  }

  get hasLength() {
    return this._path.length > 0;
  }

  get length() {
    return this._length;
  }

  set length(length) {
    this._length = length;
  }

  get bestCase() {
    return this._bestCase;
  }

  set bestCase(bestCase) {
    this._bestCase = bestCase;
  }

  get path() {
    return this._path;
  }

  set path(path) {
    this._path = path;
  }
}

init();
