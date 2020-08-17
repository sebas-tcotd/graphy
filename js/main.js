"use strict";

var cy = cytoscape({
    container: document.getElementById("grafo"),

    elements: {
        nodes: [
            {data: {id: "A"}, position: {x: Math.random(), y: Math.random()}}
        ],
        /*edges: [
            {data: {id: "e1", source: "A", target: "A"}}
        ]*/
    },

    style: [
        {
            selector: "node",

            style: {
                "label": "data(id)"
            }
        }
    ],

    layout: {
        name: "random",
    }

});


cy.add({
    nodes: [
        {data: {id: "B"}, position: {x: Math.random(), y: Math.random()}}
    ]
})
cy.fit();