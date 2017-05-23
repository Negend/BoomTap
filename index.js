$(start)
var wires = ['red','yellow','pink','blue','orange','purple','white','black','green']
var choice;
var coloring=[]
var playerColoring = []
var x;
var n =3
var tries=[]
function start (){



colorSequence()
colorChoice()



function colorChoice (){
	$('.wire').each(function(i,name){
		$(this).click(function(event){
			console.log(wires[i])
			choice = wires[i]
			playerColoring.push(wires[i])

			console.log(playerColoring)
			showColor(wires[i])
			result()
		})
	})

}

function colorSequence(){
	for(var i = 0; i < n; i++){
		randomizer(wires.length)
		coloring.push(wires[x])
		console.log(coloring)
		showColor(wires[x])
	}
}






function randomizer(r){
	x = Math.floor(Math.random()*r)
}


function result(){
	if(playerColoring.length === n){
		if(coloring.join() === playerColoring.join()){
			console.log('well done')
		}else{
			playerColoring = []
		}
		tries.push('1')
	}
}


function showColor (color){
	var newClue = $("<li class='new'></li>").css('background',color)
		$("#Sequence").append(newClue)
}

























}