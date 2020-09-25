"use strict";

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
        'background-color': 'white',
      }
    },
    {
      selector: "edge",

      style: {
        'curve-style': 'bezier',
        'line-color': 'rgb(240, 240, 240)',
        'opacity': '0.5',

        // 'target-arrow-shape': 'triangle',
        // 'target-arrow-color': 'white'
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
    },
    {
      selector: ".ciclos",

      style: {
        'background-color': '#FF8C3B',
        'color': 'black',
        "line-color": 'rgba(255, 140, 59, 0.5)',
        'transition-property': 'background-color, line-color',
        'transition-duration': '0.5s'
      }
    }
  ],
});


/* Zona de creación del grafo */
let number_nodes;
let N = 100000;
let ids = [];

function centrar() {
  cy.zoomingEnabled(true);
  cy.fit();
  cy.zoomingEnabled(false);
}

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

var adj_list = [];

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
            id: `e${current_id}to${random}`,
            source: `${current_id}`,
            target: `${random}`
          }
        }]
      })

      adyacency_matrix[current_id][random] = 1;
      adyacency_matrix[random][current_id] = 1;
      adj_list[current_id].push(random);
      adj_list[random].push(current_id);
    }
    current_id = random;
    ids.splice(ids.indexOf(random), 1);
  }
}

var adyacency_matrix;

function createGraph(n_nodes, complexity) {
  tiempoPuentes.style.display = tiempoCiclos.style.display = 'none';
  code.innerHTML = '';
  cy.remove(cy.$());
  createNodes(n_nodes);
  adyacency_matrix = Array(n_nodes).fill(null).map(() => Array(n_nodes).fill(0));
  adj_list.length = 0;
  for (let i = 0; i < N; i++) {
    adj_list[i] = [];
  }

  for (var i = 0; i < complexity; i++) {
    fillIdsArray();
    joinEdges();
  }
  centrar();
}
// ------------------------------------

/* Zona de animación */
let i = 0;
let resaltarSgteElemento = function () {

  let dfs = cy.elements().dfs({
    roots: '#0'
  });

  if (i < dfs.path.length) {
    dfs.path[i].addClass('resaltado');
    i++;
    setTimeout(resaltarSgteElemento, 500);
  }
};

let resaltarElemento = (ele, clase = 'resaltado') => {
  cy.$(ele).addClass(clase);
}


// ------------------------------------------

/* Zona de algoritmos del proyecto */

// Algoritmos para hallar los puentes del grafo
let code = document.querySelector('.codigo-pseudo code');
function pseudoFindBridges() {
  tiempoPuentes.style.display = 'block';
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

  code = document.querySelector('.codigo-pseudo code');
  code.innerHTML = pseudocodigoPuentes;
}

function puenteUtil(u, visitado, disc, low, padres, time) {
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

      if (low[v] > disc[u]) {
        console.log("Existe un puente entre:", u, "y", v);
        resaltarElemento(`#e${u}to${v}`);
        resaltarElemento(`#e${v}to${u}`);
      }
    } else if (v != padres[u]) {
      low[u] = Math.min(low[u], disc[v])
    }
    i++;
  }
}

//Algoritmos para hallar los ciclos de longitud n de un grafo
let cycleNumber;

let cycles = [];


function dfsCycle(u, p, color, mark, par) {
  tiempoCiclos.style.display = 'block';
  //debugger;
  cycleNumber = 0;
  cycles.length = 0;
  for (let i = 0; i < 30000; i++) {
    cycles.push([]);
  }
  let cur = NaN;

  if (color[u] === 2) {
    return;
  }

  if (color[u] === 1) {
    cycleNumber++;
    cur = p;
    mark[cur] = cycleNumber;

    while (cur != u) {
      cur = par[cur];
      mark[cur] = cycleNumber;
    }

    return;
  }

  par[u] = p;

  color[u] = 1;

  /*cy.nodes().forEach((e = u, v) => {
    if (v == par[e]) {
      return;
    }
    dfsCycle(v, u, color, mark, par);
  });*/

  adj_list[u].forEach((e) => {
    if (e == par[u]) {
      return;
    }
    dfsCycle(e, u, color, mark, par);
  });

  color[u] = 2;
}

function imprimirCiclo(n, mark) {
  let e = cy.edges().length;
  let i = NaN;
  let aristaAux = NaN;
  for (i = 0; i <= e; i++) {
    if (mark[i] != 0) {
      cycles[mark[i]].push(i);
    }
  }

  for (i = 0; i <= cycleNumber; i++) {
    if (cycles[i].length == n) {
      cycles[i].forEach(x => {
        console.log(x);
      });
    }
  }
}

function pseudoFindCycles(n) {

  let u = parseInt(cy.nodes().id());
  let color = [];
  color.length = N;
  let mark = [];
  for (let i = 0; i < N; i++) {
    mark.push(0);
  }

  let par = [];
  par.length = N;

  cy.$(`#${u}`).neighborhood(cy.nodes()).forEach((e, i) => {
    par[i] = parseInt(e.id());
  });

  dfsCycle(u, 0, color, mark, par);
  imprimirCiclo(n, mark);
  resaltarCiclo(n);
  code = document.querySelector('.codigo-pseudo code');
  code.innerHTML = pseudocodigoCiclos;

}

let resaltarCiclo = (n) => {
  let cicloColor = cycles[1];
  let aristas = [];

  if(cycles[1].length === n){
    cy.edges().forEach((e) => {
      aristas.push(e.id());
    })
    for (let i = 0; i < cycles[1].length; i++) {
      resaltarElemento(`#${aristas[i]}`, 'ciclos');
    }
    for (let i of cicloColor) {
      cy.$(`#${i}`).addClass('ciclos');
    }
  }else{
    alert("No se pudo encontrar un ciclo con la longitud solicitada.");
  }
}
// ------------------------------------------

/* Zona de captura de eventos */
var formulario = document.querySelector(".ingreso-de-datos");
let complexity = document.querySelector('#complexity');
var spanTiempo = document.querySelector("#tiempo-ejecucion-grafo");
let tiempoPuentes = document.querySelector('#tiempo-puentes');
let tiempoCiclos = document.querySelector('#tiempo-ciclos');
let btnFindBridge = document.querySelector("#find-bridges");
let btnFindCycles = document.querySelector("#find-cycles");
let limpio = document.querySelector('#limpito');

//Evento para crear el grafo
formulario.addEventListener("submit", () => {
  let n = Number(complexity.value);

  number_nodes = parseInt(document.querySelector("#numero-nodos").value);
  //console.clear();
  console.log(`Nodos creados: ${number_nodes}`);

  if (!number_nodes) {
    createGraph(number_nodes);
    btnFindCycles.style.opacity = btnFindBridge.style.opacity = '.5';
    btnFindCycles.style.cursor = btnFindBridge.style.cursor = 'default';
    limpio.style.display = 'block';
    tiempoPuentes.style.display = tiempoCiclos.style.display = spanTiempo.style.display = 'none';
    
  } else {
    btnFindCycles.style.opacity = btnFindBridge.style.opacity = '1';
    btnFindCycles.style.cursor = btnFindBridge.style.cursor = 'pointer';

    limpio.style.display = 'none';

    let tiempoInicio = performance.now();
    createGraph(number_nodes, n);
    let tiempoFinal = performance.now();

    
    let tiempoDeEjecucion = tiempoFinal - tiempoInicio;
    spanTiempo.innerHTML = `Creación del grafo: ${(tiempoDeEjecucion / 1000).toPrecision(2)} segundos.`; // Esto para que se muestre en segundos
  }
});

//Evento para activar el algoritmo de búsqueda de puentes
btnFindBridge.addEventListener('click', () => {
  if (!number_nodes) {
    return console.log("No se creó grafo alguno");
  }
  i = 0;
  console.log('Evento de puentes activado');
  let tiempoInicio = performance.now();
  pseudoFindBridges();
  let tiempoFinal = performance.now();
  let tiempoDeEjecucion = tiempoFinal - tiempoInicio;
  tiempoPuentes.innerHTML = `Algoritmo de puentes: ${(tiempoDeEjecucion / 1000).toPrecision(2)} segundos.`;
  //resaltarSgteElemento();
});

//Evento para activar el algoritmo de búsqueda de ciclos
btnFindCycles.addEventListener('click', () => {
  let c = Number(complexity.value);
  if (!number_nodes) {
    return console.log("No se creó grafo alguno");
  }
  if (c > 1) {
    return alert("Lamentablemente, este es un problema NP-Completo");
  }
  let n = parseInt(prompt('Ingrese la longitud del ciclo:', 0));

  let tiempoInicio = performance.now()
  pseudoFindCycles(n);
  let tiempoFinal = performance.now();

  let tiempoDeEjecucion = tiempoFinal - tiempoInicio;
  tiempoCiclos.innerHTML = `Algoritmo de ciclos: ${(tiempoDeEjecucion / 1000).toPrecision(2)} segundos.`;

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

//Eventos para los layouts
let random = document.getElementById('random');
let circle = document.getElementById('circle');
let concentric = document.getElementById('concentric');
let bds = document.getElementById('breadthfirst');
let grid = document.getElementById('cuadricula');
let cose = document.getElementById('cose');

let maquetado = (lay) => {
  cy.zoomingEnabled(true);
  cy.layout({
    name: lay
  }).run();
  cy.fit();
  cy.zoomingEnabled(false);
}

random.addEventListener('click', () => {
  maquetado('random');
})

circle.addEventListener('click', () => {
  maquetado('circle')
});

concentric.addEventListener('click', () => {
  maquetado('concentric');
});

bds.addEventListener('click', () => {
  maquetado('breadthfirst');
});

grid.addEventListener('click', () => {
  maquetado('grid');
});

cose.addEventListener('click', () => {
  maquetado('cose');
});


//Evento para agrandar el cuadro de grafos
let viewport = document.querySelector('.fullscreen');
let isFull = viewport.innerHTML;
let divGrafo = document.querySelector('#grafo div');

viewport.addEventListener('click', () => {
  let grafoYpseudo = document.querySelector('.grafo-y-pseudo');

  //debugger;  
  if (isFull === 'fullscreen') {
    grafoYpseudo.style.display = 'block';
    viewport.innerHTML = isFull = "fullscreen_exit";
  } else {
    grafoYpseudo.style.display = 'grid';
    divGrafo.style.width = "100%";
    viewport.innerHTML = isFull = "fullscreen";

  }

  setTimeout(function () {
    cy.reset();
    console.log('Acción')
  }, 3000);

});

//Evento para centrar el grafo
let centre = document.querySelector('.img-center');
centre.addEventListener('click', () => {
  centrar();
})

/* ------------------------------------------ */

/* Pseudocódigos */

let pseudocodigoCiclos =
  `Acción DFS_Cycle(Entero u, Entero p, Entero color[], Entero Mark, Entero par[])
    DV
      Entero cur
    Inicio
      Si(color[u] = 2) entonces
        Retornar
      FinSi
      
      Si(color[u] = 1) entonces
        cycleNumber <- cycleNumber + 1
        cur <- p
        mark[cur] <- cycleNumber
        
        Mientras (cur != u) hacer
				  cur <- par[cur]
				  Mark[cur] <- cyclenumber
        FinMientras
        
			  Retornar;
      FinSi
      
      par[u] <- p
      color[u] <- 1

      Para cada v en graph[u] hacer
        Si v = par[u] hacer
          continuar
        FinSi

        DFS_Cycle(v, u, color, mark, par)
      FinPara

      Color[u] <- 2
    Fin

  Acción imprimirCiclo(Entero e, Boolean mark[])
    DV
      Entero i
      Entero aristaAux
    Inicio
      Para i desde 1 hasta e hacer
        Si mark[i] != 0 entonces
          cycles[mark[i]].push(i)
        FinSi
      FinPara

      Para i desde 1 hasta cycleNumber hacer
        Si(cycles[i].length = n) entonces
          Para cada x en cycles[i] hacer 
            Retornar x
          FinPara
        FinSi
      FinPara
    Fin
`;

let pseudocodigoPuentes = 
`Acción Principal Puente()
  DV
    Booleano visitado[]
    Entero disc[], low[], padres[], time

  Inicio
    time <- 0
    Para i desde 1 hasta nVertices hacer
      padres[i] <- nulo
      visitado[i] <- falso
    FinPara

    Para i desde 0 hasta nVertices hacer
      Si visitado[i] = falso entonces
        puenteUtil(i, visitado, disc, low, padres, time)
      FinSi
    FinPara
  Fin

Acción puenteUtil(Entero u, Booleano visitado[], Entero disc[], Entero low[], Entero padres[], Entero time)
  DV
    Entero adyacentes[], i, v
  Inicio
    visitado[u] <- verdadero
    disc[u] <- ++time
    low[u] <- disc[u]
    adyacentes[n] <- {nodos adyacentes de u}
    i <- 0
    v <- 0

    Mientras i < n hacer 
      v <- adyacentes[i]

      Si !visitado[u] entonces
        padres[v] <- u
        puenteUtil(v, visitado, disc, low, padres, time)
        low[u] <- MÍNIMO(low[u], disc[u])

        Si low[v] > disc[u] entonces
          Escribir (u, v) // Existe un puente entre u y v
        FinSI
      Sino
        Si v != padres[v] entonces
          low[u] <- MÍNIMO(low[u], disc[v])
        FinSi
      FinSi

      i <- i + 1
    FinMientras
Fin
`;
