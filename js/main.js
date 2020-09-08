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

  style: [{
      selector: "node",

      style: {
        "label": "data(id)",
        "text-halign": 'center',
        'text-valign': 'center',
        'background-color': 'white'
      }
    },
    {
      selector: "edge",

      style: {
        "curve-style": "bezier",
        'line-color': 'rgb(240, 240, 240)',
        'opacity': '0.5'
      }
    }
  ],

  layout: {
    name: "random",
  }});

let number_nodes
let ids = []
let edges_counter = 1;

function createNodes(number_nodes) {
  for (var i = 0; i < number_nodes; i++) {
    cy.add({
      nodes: [{
        data: {
          id: `${i + 1}`
        },
        position: {
          x: Math.random() * 500,
          y: Math.random() * 500
        },
        weight: 100
      }]
    })
  }
}

function fillIdsArray() {
  for (var i = 0; i < number_nodes; i++) {
    ids[i] = i + 1;
  }
}

function joinEdges() {
  let current_id;
  let random;
  random = ids[Math.floor(Math.random() * ids.length)]
  current_id = random;

  for (var i = 0; i < number_nodes; i++) {
    random = ids[Math.floor(Math.random() * ids.length)]
    if (adyacency_matrix[current_id - 1][random - 1] == 0) {
      cy.add({
        edges: [{
          data: {
            id: `${"e" + edges_counter}`,
            source: `${current_id}`,
            target: `${random}`
          }
        }]
      })

      adyacency_matrix[current_id - 1][random - 1] = 1;
      edges_counter++;
    }
    current_id = random;
    ids.splice(ids.indexOf(random), 1);
  }
}

let adyacency_matrix

function createGraph(n_nodes) {
  cy.remove(cy.$());
  createNodes(n_nodes);
  adyacency_matrix = Array(n_nodes).fill(null).map(() => Array(n_nodes).fill(0));

  for (var i = 0; i < 2; i++) {
    fillIdsArray();
    joinEdges();
  }

  cy.fit();
}

var formulario = document.querySelector(".ingreso-de-datos");
var spanTiempo = document.querySelector("#tiempo-ejecucion");

formulario.addEventListener("submit", () => {
  number_nodes = parseInt(document.querySelector("#numero-nodos").value);
  console.clear();
  console.log(`Nodos creados: ${number_nodes}`);

  let tiempoInicio = performance.now();
  createGraph(number_nodes);
  let tiempoFinal = performance.now()

  let tiempoDeEjecucion = tiempoFinal - tiempoInicio;


  // crearNodos(numeroDeNodos);
  // crearAristas();

  spanTiempo.innerHTML = `Tiempo de ejecución: ${tiempoDeEjecucion / 1000} segundos.`; // Esto para que se muestre en segundos
  
});

//cy.fit();
