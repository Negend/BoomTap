$(start)
var wires = ['red','yellow','pink','blue','orange','purple','white','black','green']
var choice;
var coloring=[]
var x;
var n =3
function start (){


colorChoice()
colorSequence()



function colorChoice (){
	$('.wire').each(function(i,name){
		$(this).click(function(event){
			console.log(wires[i])
			choice = wires[i]
		})
	})

}


// function colorSequence(){

// 	randomizer(wires.length)
// 	a = wires[x]
// 	randomizer(wires.length)
// 	b = wires[x]
// 	randomizer(wires.length)
// 	c = wires[x]
// 	colorSequence = [a,b,c]
// }
function colorSequence(){
	for(var i = 0; i < n; i++){
		randomizer(wires.length)
		coloring.push(wires[x])
		console.log(coloring)
	}
}






function randomizer(r){
	x = Math.floor(Math.random()*r)
}






























}