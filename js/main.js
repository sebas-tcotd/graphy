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
        "curve-style": "bezier",
        //"target-arrow-shape": "triangle"
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

function crearAristas() { //n = número de nodos
  let origen, numeroDeConexiones;
  let destino = new Array();
  //let nodo = cy.nodes();

  for (let i = 0; i < numeroDeNodos; i++) {
    //debugger;
    origen = Math.ceil(Math.random() * numeroDeNodos);
    numeroDeConexiones = Math.ceil(Math.random() * numeroDeNodos);
    destino = [];
    let j;
    for (j = 0; j < numeroDeConexiones; j++) {
      destino[j] = Math.ceil(Math.random() * numeroDeNodos);
    }
    j = 0;
    while(j != destino.length){
        cy.add({
          edges: [{
            data: {
              id: `e${origen}A${destino[j]}`,
              source: `${origen}`,
              target: `${destino[j]}`
            }
          }]
        });
        j++;
    }
  }
  for (let i = 0; i < numeroDeNodos; i++) {
      destino = [];
    if (cy.$(`#${i + 1}`).totalDegree() == 0) {
      origen = i + 1;
      let j;
      //debugger;
    for (j = 0; j < numeroDeConexiones; j++) {
      destino[j] = Math.ceil(Math.random() * numeroDeNodos);
    }
      if (origen != 0 || destino != 0) {
        cy.add({
          edges: [{
            data: {
              id: `e${origen}A${destino[j - 1]}`,
              source: `${origen}`,
              target: `${destino[j - 1]}`
            }
          }]
        });
      }
    }
  }
}

/*function fillIdsArray() {
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


}*/

var formulario = document.querySelector(".ingreso-de-datos");

formulario.addEventListener("submit", () => {
  numeroDeNodos = parseInt(document.querySelector("#numero-nodos").value);
  console.clear();
  console.log(`Nodos creados: ${numeroDeNodos}`);

  crearNodos(numeroDeNodos);
  crearAristas();

  //debugger;
  /*for (var i = 0; i < 2; i++) {
    fillIdsArray();
    joinEdges(i);
  }*/
});

//cy.fit();
