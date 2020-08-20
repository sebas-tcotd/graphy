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

  style: [{
      selector: "node",

      style: {
        "label": "data(id)",
        "text-halign": "center",
        "text-valign": "center",
        "font-family": "Roboto Condensed"
      }
    },
    {
      selector: "edge",

      style: {
        "curve-style": "bezier"
      }
    }
  ],

  layout: {
    name: "random",
  }

});

cy.remove(cy.$());
let ids = [];
var numeroDeNodos;

function crearNodos(n = 0) {
  let i;


  if (n == null || n < 0) {
    cy.remove(cy.$());
    console.log("Ingresaste algo mal...");
  } else if (n === 0) {
    cy.remove(cy.$());
  } else {
    cy.remove(cy.$());
    for (i = 0; i < n; i++) {
      cy.add({
        nodes: [{
          data: {
            id: `${i + 1}`,
            weight: 100
          }
        }]
      })
    }
  }
  cy.layout({
    name: "random"
  }).run();
  cy.fit();
}

function fillIdsArray() {
  for (var i = 0; i < numeroDeNodos; i++) {
    ids[i] = i + 1;
  }
}

function joinEdges(times_joined) {
  let current_id;
  let random;
  random = ids[Math.floor(Math.random() * ids.length)]
  current_id = random;

  for (var i = 0; i < numeroDeNodos; i++) {
    random = ids[Math.floor(Math.random() * ids.length)]
    cy.add({
      edges: [{
        data: {
          id: `e${i + (times_joined * numeroDeNodos)}`,
          source: `${current_id}`,
          target: `${random}`
        }
      }]
    })
    current_id = random;
    ids.splice(ids.indexOf(random), 1);
  }


}

var formulario = document.querySelector(".ingreso-de-datos");

formulario.addEventListener("submit", () => {
  numeroDeNodos = parseInt(document.querySelector("#numero-nodos").value);
  console.log(numeroDeNodos);

  crearNodos(numeroDeNodos);

  //debugger;
  for (var i = 0; i < 2; i++) {
    fillIdsArray();
    joinEdges(i);
  }
});

//cy.fit();
