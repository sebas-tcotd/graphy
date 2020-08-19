"use strict";

var cy = cytoscape({
    container: document.getElementById("grafo"),

    elements: {

        nodes: [
            //{data: {id: "A"}, position: {x: Math.random(), y: Math.random()}}
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

let number_nodes
let ids = []

function createNodes()
{
    number_nodes = parseInt(prompt("Digite el numero de nodos: ",0));

    for(var i = 0; i < number_nodes; i++)
    {
        cy.add({
            nodes: [
                {data: {id: `${i + 1}`}, position: {x: Math.random() * 500, y: Math.random() * 500}, weight: 100}
            ]
        })
    }
}

function fillIdsArray()
{
    for(var i = 0; i < number_nodes; i++)
    {
        ids[i] = i + 1;
    }
}

function joinEdges(times_joined)
{
    let current_id;
    let random;
    random = ids[Math.floor(Math.random() * ids.length)]
    current_id = random;

    for(var i = 0; i < number_nodes; i++)
    {
        random = ids[Math.floor(Math.random() * ids.length)]
        cy.add({
            edges: [
                {data: {id: `${"e" + (i + (times_joined * number_nodes))}`, source: `${current_id}`, target: `${random}`}}
            ]
        })
        current_id = random;
        ids.splice(ids.indexOf(random), 1);
    }
}

createNodes();

for(var i = 0; i < 2; i++)
{
    fillIdsArray();
    joinEdges(i);
}


cy.fit();