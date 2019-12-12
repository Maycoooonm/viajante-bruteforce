let cidades = [];
let nCidades = 7;
let bestDist;
let best;
let values = []
let contador = 0;
let citiesPos; 
function setup() {

	createCanvas(500, 500);
	for(let i = 0; i < nCidades; i++) {		
		cidades[i] = createVector(random(width), random(height));
		values[i] = i
	}
	bestDist = calcDist(cidades, values);
	best = values.slice();
	citiesPos = fatorial(cidades.length);
}
function draw() {
	background(100);
	beginShape();
	noFill();
	strokeWeight(1);
	for(let i = 0; i< cidades.length; i++) {
		stroke(0)
		ellipse(cidades[i].x, cidades[i].y, 8, 8);
	}
	for(let i = 0; i < values.length; i++) {	
		let n = values[i];
		stroke(255)
		vertex(cidades[n].x, cidades[n].y);
	}
	endShape();
	
	beginShape();
	noFill();
	strokeWeight(3);
	for(let i = 0; i < values.length; i++) {	
		let n = best[i];
		stroke(255, 0, 0)
		vertex(cidades[n].x, cidades[n].y);
	}
	endShape();
	let distance = calcDist(cidades, values);
	if(bestDist > distance) {
		bestDist = distance;
		best = values.slice();
		console.log(bestDist);
		console.log(contador)
	}
		
	textSize(32);
	let txt = '';
	for(let i = 0; i<values.length; i++) {
		txt += values[i];
	}
	fill(255);
	let porcent = ((contador+1)/citiesPos)*100;
	text(`${porcent.toFixed(10)}% completo`, 10, height-50)
	nextOrder()
}
function swap(a, i, j) {
	let t = a[i]
	a[i] = a[j];
	a[j] = t; 
	contador++;
}
function calcDist(pontos, values) {
	let soma = 0;
	for(let i = 0; i < values.length-1; i++) {
		let cidadeA = pontos[values[i]];
		let cidadeB = pontos[values[i+1]];
		soma += dist(cidadeA.x, cidadeA.y, cidadeB.x, cidadeB.y);
	}
	return soma;
}



// funcao ordem lexicográfica

function nextOrder() {
	//1
	let maiorI = -1;
	for(let i = 0; i < values.length-1; i++) {
		if(values[i] < values[i+1]) {
			maiorI = i;
		}
	}
	if(maiorI == -1) {
		noLoop();
		console.log("cabo")
	}
	
	//2
	let maiorJ = -1;
	for(let j = 0; j < values.length; j++) {
		if(values[maiorI] < values[j]) {
			maiorJ = j;
		}
	}
	// 3
	swap(values, maiorI, maiorJ);
	//4
	let endArray = values.splice(maiorI +1);
	endArray.reverse();
	values = values.concat(endArray);

}
function fatorial(a) {
	let i = a;
	while(i > 1) {
		a = a*(i-1);
		i--;
	}
	return a
	
}