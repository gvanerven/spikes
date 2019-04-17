class Vertex {
    constructor(id, label) {
        this.id = id;
        this.label = label;
        this.element = undefined;
    }
}

class Edge {
    constructor(source, target, dtStart, dtFinal) {
      this.id = source + '-' + target;
      this.source = source;
      this.target = target;
      this.dtStart = dtStart;
      this.dtFinal = dtFinal;
      this.element = undefined;
    }
}

function startSlider(local, min, max, initial, update) {
    $( local ).slider({
        range: "max",
        min: min,
        max: max,
        value: initial,
        slide: function( event, ui ) {
          update(ui.value);
        }
      });
    update( $( local ).slider( "value" ) );
}

function timepointInPeriodOpened(timespoint, dtStart, dtFinal){
    if(dtStart < timespoint && timespoint < dtFinal){
        return true;
    }
    return false;
}

function updataDate(updateLocal, values, edges) {
    return function(value) {
        $( updateLocal ).val( values[value] );

        for(var edgeId in edges){
            if(timepointInPeriodOpened(values[value], edges[edgeId].dtStart, edges[edgeId].dtFinal)){
                edges[edgeId].element.style({ 'line-color': '#000', 'line-style': 'solid' });
            }else if(values[value] == edges[edgeId].dtStart){
                edges[edgeId].element.style({ 'line-color': '#33cc33', 'line-style': 'solid' });
            }else if(values[value] == edges[edgeId].dtFinal){
                edges[edgeId].element.style({ 'line-color': '#ff3300', 'line-style': 'solid' });
            }else {
                edges[edgeId].element.style({ 'line-color': '#000', 'line-style': 'dashed' });
            }
        }
    }
}

function startContainer(local, vertices, edges) {
    var cy = cytoscape({

        container: $(local), // container to render in
    
        /*elements: [ // list of graph elements to start with
        { // node a
            data: { id: 'a' }
        },
        { // node b
            data: { id: 'b' }
        },
        { // edge ab
            data: { id: 'ab', source: 'a', target: 'b' }
        }
        ],*/
        elements: [
        ],

        style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
            'background-color': '#666',
            'label': 'data(id)'
            }
        },
    
        {
            selector: 'edge',
            style: {
            'width': 3,
            'font-size': 10,
            'line-color': '#000',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'line-style': 'dotted',
            'label': 'data(label)'
            }
        }
        ]
    
    });

    for(var vertexId in vertices) {
        vertices[vertexId].element = cy.add({
            group: 'nodes',
            data: { id: vertices[vertexId].id }
        });
    }

    for(var edgesId in edges) {
        edges[edgesId].element = cy.add({
            group: 'edges',
            data: { id: edges[edgesId].id, source: edges[edgesId].source, target: edges[edgesId].target, label:  edges[edgesId].dtStart + " to " + edges[edgesId].dtFinal}
        });
    }
    cy.layout({
        name: 'breadthfirst'
        }).run();
    return cy;
}