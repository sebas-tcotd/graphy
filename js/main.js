"use strict";

//var microprofiler = require('microprofiler');

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
}

function crearAristas() { //n = número de nodos
  let origen, numeroDeConexiones;
  let destino = new Array();
  //let nodo = cy.nodes();

  for (let i = 0; i < numeroDeNodos; i++) {
    //debugger;
    origen = Math.ceil(Math.random() * numeroDeNodos);
    numeroDeConexiones = Math.ceil(Math.random() * Math.sqrt(numeroDeNodos));
    destino = [];
    let j;
    for (j = 0; j < numeroDeConexiones; j++) {
      destino[j] = Math.ceil((Math.random() * numeroDeNodos));
    }
    j = 0;
    while (j != destino.length) {
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
  /*for (let i = 0; i < numeroDeNodos; i++) {
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
  }*/
}

function crearGrafo(n) {
  crearNodos(n);
  crearAristas();
  cy.fit();
}

var formulario = document.querySelector(".ingreso-de-datos");
var spanTiempo = document.querySelector("#tiempo-ejecucion");

formulario.addEventListener("submit", () => {
  numeroDeNodos = parseInt(document.querySelector("#numero-nodos").value);
  console.clear();
  console.log(`Nodos creados: ${numeroDeNodos}`);

  let tiempoInicio = performance.now();
  crearGrafo(numeroDeNodos);
  let tiempoFinal = performance.now()

  let tiempoDeEjecucion = tiempoFinal - tiempoInicio;


  // crearNodos(numeroDeNodos);
  // crearAristas();

  spanTiempo.innerHTML = `Tiempo de ejecución: ${tiempoDeEjecucion / 1000} segundos.`; // Esto para que se muestre en segundos
  
});

//cy.fit();
