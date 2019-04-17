function startContainerJSMX(local, G){
    return jsnx.draw(G, {
        element: local,  
        weighted: true,
        stickyDrag: true,
        withLabels: true,
        //not working
        edgeStyle: {
            'color': '#FF0',
            'stroke': '#FF0',
            'stroke-dasharray': "4 2",
            'stroke-width': 5,
        }
    }, optBind=true);
}

function updataDateJSNX(updateLocal, values, G) {
    return function(value) {
        $( updateLocal ).val( values[value] );
    }
}

var aux = 0;
var dates = [];

var G = new jsnx.Graph();

G.addNode(0, {label: "a"});
G.addNode(1, {label: "b"});
G.addNode(2, {label: "c"});
G.addEdge(0,1, {weight: 1, dtStart: '2019-01-01', dtFinal: '2019-01-31'});
G.addEdge(0,2, {weight: 1, dtStart: '2019-01-15', dtFinal: '2019-02-28'});

for (var i = 0; i < G.edges(optData=true).length; i++){
    dates.push(G.edges(optData=true)[i][2].dtStart);
    dates.push(G.edges(optData=true)[i][2].dtFinal);
}

dates = dates.sort();
var jsnx_cont = startContainerJSMX('#jsnx', G);
var update = updataDate("#timemark", dates, G, updataDateJSNX);
var slider = startSlider("#slider", 0, dates.length - 1, 0, update);