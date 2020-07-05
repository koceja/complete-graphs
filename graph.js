var canvas;
var ctx;

var warned = false;


window.onload = () => {
    canvas = document.getElementById("graph");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    console.log($("#header").height());
    console.log($("#form-container").height());
    canvas.height = window.innerHeight - $("#header-container").height() - $("#form-container").height() - 10;
    init();
    $('#nodeForm').on('submit', getNumOfNodes);
};

var numOfNodes;
var graphMargin;
var xCenter;
var yCenter;

var increment;
var radius;

var nodes = []

function init() {

    numOfNodes = 7;
    graphMargin = 10;

    ctx.lineWidth = 1/(2* Math.log(numOfNodes + 1)) + 1/numOfNodes;

    graph();
}

function getNumOfNodes(e) {
    e.preventDefault();
    numOfNodes = parseInt($('#nodes').val());
    if (numOfNodes > 1263) {
        if (!confirm("Warning: large numbers will take a long time to process and will not show up well on standard resolution screens. This may crash your page. Do you still want to continue?")) {
            return;
        }
    }
    if (numOfNodes > 200 && !warned) {
        alert("Large number of nodes may result not being able to distinguish between each line (graph is solid).")
        warned = true;
    }
    nodes = [];
    ctx.lineWidth = 1/(2* Math.log(numOfNodes + 1)) + 1/numOfNodes;

    graph();
}

function graph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    xCenter = canvas.width/2;
    yCenter = canvas.height/2;

    increment = Math.PI * 2 / numOfNodes;

    radius = (canvas.width < canvas.height) ? (canvas.width - graphMargin - xCenter) : (canvas.height - graphMargin - yCenter);

    graphNodes();
    graphEdges();
}

function graphNodes() {

    for (var i = 0; i < numOfNodes; i++) {
        const xNode = Math.cos(increment * i) * radius + xCenter;
        const yNode = Math.sin(increment * i) * radius + yCenter;

        nodes.push({x: xNode, y: yNode});

        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.arc(xNode, yNode, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function graphEdges() {
    for (var i = 0; i < nodes.length; i++) {
        const x1 = nodes[i].x;
        const y1 = nodes[i].y;
        for (var j = i; j < nodes.length; j++) {
            const x2 = nodes[j].x;
            const y2 = nodes[j].y;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        } 
    }
}