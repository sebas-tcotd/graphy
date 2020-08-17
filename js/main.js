"use strict";

var cy = cytoscape({
    container: document.getElementById("grafo"),

    elements: {
        /*nodes: [
            {data: {id: "A"}, position: {x: Math.random(), y: Math.random()}}
        ],
        edges: [
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

cy.remove(cy.$());


/*cy.add({
    nodes: [
        {data: {id: "B"}, position: {x: Math.random(), y: Math.random()}}
    ]
})*/

function crearNodos(n = 0){
    let i;
    

    if(n == null || n < 0){
        console.log("Ingresaste algo mal...");
    }else if(n === 0){
        cy.remove(cy.$());
    }else{
        cy.remove(cy.$());
        for(i = 0; i < n; i++){
            cy.add({
                nodes:
                    [
                        {data: {id: `${i + 1}`}}
                    ]
            })
        }
    }
    cy.layout({
        name: "random"
    }).run();
    cy.fit();
}

var formulario = document.querySelector(".ingreso-de-datos");

formulario.addEventListener("submit", () =>{
    var numeroDeNodos = parseInt(document.querySelector("#numero-nodos").value);
    console.log(numeroDeNodos);

    crearNodos(numeroDeNodos);
});

//cy.fit();