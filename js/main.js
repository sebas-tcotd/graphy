"use strict";
//import * as pseudo from './pseudos.js';

var cy = cytoscape({
  container: document.getElementById("grafo"),

  elements: {
    nodes: [],
  },

  style: [{
      selector: "node",

      style: {
        "label": "data(id)",
        'font-family': 'Roboto Condensed, sans-serif',
        "text-halign": 'center',
        'text-valign': 'center',
        'background-color': 'white'
      }
    },
    {
      selector: "edge",

      style: {
        //"curve-style": "bezier",
        'line-color': 'rgb(240, 240, 240)',
        'opacity': '0.5',
        //'target-arrow-shape': 'triangle',
        //'target-arrow-color': 'white'
      }
    },
    {
      selector: ".resaltado",

      style: {
        'background-color': '#B721FF',
        'color': 'white',
        'line-color': 'rgba(184, 31, 255, 0.5)',
        'transition-property': 'background-color, line-color',
        'transition-duration': '0.5s'
      }
    }
  ],
});


/* Zona de creación del grafo */
let number_nodes
let ids = []
let edges_counter = 1;


function createNodes(number_nodes) {
  for (var i = 0; i < number_nodes; i++) {
    cy.add({
      nodes: [{
        data: {
          id: `${i}`,
          disc: [],
          low: []
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
    ids[i] = i;
  }
}

function joinEdges() {
  let current_id;
  let random;
  random = ids[Math.floor(Math.random() * ids.length)]
  current_id = random;

  for (var i = 0; i < number_nodes; i++) {
    random = ids[Math.floor(Math.random() * ids.length)]
    if (adyacency_matrix[current_id][random] == 0) {
      cy.add({
        edges: [{
          data: {
            //id: `${"e" + edges_counter}`,
            id: `e${current_id}to${random}`,
            source: `${current_id}`,
            target: `${random}`
          }
        }]
      })

      adyacency_matrix[current_id][random] = 1;
      edges_counter++;
    }
    current_id = random;
    ids.splice(ids.indexOf(random), 1);
  }
}

var adyacency_matrix;

function createGraph(n_nodes) {
  cy.remove(cy.$());
  createNodes(n_nodes);
  adyacency_matrix = Array(n_nodes).fill(null).map(() => Array(n_nodes).fill(0));

  for (var i = 0; i < 2; i++) {
    fillIdsArray();
    joinEdges();
  }
  cy.zoomingEnabled(true);
  cy.fit();
  cy.zoomingEnabled(false);
}
// ------------------------------------

/* Zona de animación */
let i = 0;
let resaltarSgteElemento = function () {

  let dfs = cy.elements().dfs({
    roots: '#1',
    directed: true
  });

  if (i < dfs.path.length) {
    dfs.path[i].addClass('resaltado');
    i++;
    setTimeout(resaltarSgteElemento, 500);
  }
};
// ------------------------------------------

/* Zona de algoritmos del proyecto */

function puenteUtil(u, visitado, disc, low, padres, time) {
  //let time = 0;
  //let _u = parseInt(u.id());
  let adyacentes = new Array();
  visitado[u] = true;
  disc[u] = low[u] = ++time;

  cy.$(`#${u}`).neighborhood(cy.nodes()).forEach((e, i) => {
    adyacentes[i] = parseInt(e.id());
  });

  let i = 0;
  let v = 0;
  let n = adyacentes.length;
  while (i < n) {
    v = adyacentes[i];
    if (!visitado[v]) {
      padres[v] = u;
      puenteUtil(v, visitado, disc, low, padres, time);
      low[u] = Math.min(low[u], low[v]);

      if (low[v] > disc[u]){
        console.log("Existe un puente entre:",u,v);
      }
    } else if(v != padres[u]){
      low[u] = Math.min(low[u], disc[v])
    }
    i++;
  }
}

function pseudoFindBridges() {
  let nodos = cy.nodes()
  let visitado = [],
    disc = [],
    low = [],
    padres = [];
  for (let i = 0; i < nodos.length; i++) {
    padres[i] = null;
    visitado[i] = false;
  }
  for (let i = 0; i < nodos.length; i++) {
    if (!visitado[i]) {
      let time = 0;
      puenteUtil(i, visitado, disc, low, padres, time);
    }
  }

  let code = document.querySelector('.codigo-pseudo code');
  code.innerHTML = `Acción Principal Bridges`;
}

function pseudoFindCycles() {
  let code = document.querySelector('.codigo-pseudo code');
  code.innerHTML = `Acción Principal Cycles`;
}
// ------------------------------------------

/* Zona de captura de eventos */
var formulario = document.querySelector(".ingreso-de-datos");
var spanTiempo = document.querySelector("#tiempo-ejecucion");
let btnFindBridge = document.querySelector("#find-bridges");
let btnFindCycles = document.querySelector("#find-cycles");

//Evento para crear el grafo
formulario.addEventListener("submit", () => {
  number_nodes = parseInt(document.querySelector("#numero-nodos").value);
  //console.clear();
  console.log(`Nodos creados: ${number_nodes}`);

  if (!number_nodes) {
    createGraph(number_nodes);
    btnFindCycles.style.opacity = btnFindBridge.style.opacity = '.5';
    btnFindCycles.style.cursor = btnFindBridge.style.cursor = 'default';
  } else {
    btnFindCycles.style.opacity = btnFindBridge.style.opacity = '1';
    btnFindCycles.style.cursor = btnFindBridge.style.cursor = 'pointer';

    let tiempoInicio = performance.now();
    createGraph(number_nodes);
    let tiempoFinal = performance.now();

    let tiempoDeEjecucion = tiempoFinal - tiempoInicio;
    spanTiempo.innerHTML = `Tiempo de ejecución: ${tiempoDeEjecucion / 1000} segundos.`; // Esto para que se muestre en segundos
  }
});

//Evento para activar el algoritmo de búsqueda de puentes
btnFindBridge.addEventListener('click', () => {
  if (!number_nodes) {
    return console.log("No se creó grafo alguno");
  }
  i = 0;
  console.log('Evento de puentes activado');
  debugger;
  pseudoFindBridges();
  //resaltarSgteElemento();
});

//Evento para activar el algoritmo de búsqueda de ciclos
btnFindCycles.addEventListener('click', () => {
  if (!number_nodes) {
    return console.log("No se creó grafo alguno");
  }
  pseudoFindCycles();
  console.log('Evento de ciclos activado');
});

//Eventos para cuando el mouse se centre en el div del grafo
let contenedorGrafo = document.querySelector('#grafo');
contenedorGrafo.addEventListener('mousedown', function () {
  cy.zoomingEnabled(true);
});
contenedorGrafo.addEventListener('mouseout', function () {
  cy.zoomingEnabled(false);
})
