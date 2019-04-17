var aux = 0;
var dates = [];

var vertices = {};
var edges = {};

vertices[0] = new Vertex(0, "a");
vertices[1] = new Vertex(1, "b");
vertices[2] = new Vertex(2, "c");
edges[0] = new Edge(0, 1, '2019-01-01', '2019-01-31');
edges[1] = new Edge(0, 2, '2019-01-15', '2019-02-28');

for (var k in edges){
    dates.push(edges[k].dtStart);
    dates.push(edges[k].dtFinal);
}

dates = dates.sort();
//console.log(dates);
var cy = startContainer('#cy', vertices, edges);
var update = updataDate("#amount", dates, edges);
var slider = startSlider("#slider", 0, dates.length - 1, 0, update);