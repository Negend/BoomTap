$(start)
var wires = ['red','yellow','pink','blue','orange','purple','white','black','green']
var coloring =[]
var playerColoring = []
var x;
var n = 3
var roundGoal = 3
var tries =[]
var score =[]
var game = 1
var roundScore=[]
var level = ['spinner','spinnertwo','spinnerthree','spinnerfour']
var levels = [1]
var T= 20
var timerId

function start (){




play()




function play(){
	$('#clock').click(function(event){
		game=1
		restart()
		countDown(T)
		colorSequence()
		speedUp('level','spinner')
		colorChoice()
	})	
}




function colorChoice (){	
	$('.wire').each(function(i,name){
		$(this).click(function(event){
			if(game===1){			
			playerColoring.push(wires[i])

			
			showColor(wires[i])
			result()
			
			}
		})	
	})
}





function colorSequence(){
	for(var i = 0; i < n; i++){
		randomizer(wires.length)
		coloring.push(wires[x])
		
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
			clear()
			
			
			score.push('1')
			$($('.stats')[0]).html(score.length+roundScore.length*10)
			colorSequence()
			console.log(score.length)



		}else{
			// add something to show failure point
			tries.push('1')
			playerColoring=[]
		}
		roundWin()
	}
}





function showColor (color){
	var newClue = $("<li class='new'></li>").css('background',color)
		$("#Sequence").append(newClue)
}





function clear(){
	playerColoring = []
	coloring=[]

	$('.new').each(function(i,name){
		this.remove()
	})
}





function roundWin (){
	if(score.length===roundGoal){
			console.log('Well Done next round')
			clearInterval()
			T = Math.floor(T*0.95)

			clearInterval(timerId)
			countDown(T)
			score=[]
			tries=[]
			roundScore.push(1)
			// roundGoal=roundGoal+2
			// if theres time make a Time count down
			console.log(roundScore.length)
			levelChange()



	}else if(tries.length===4){
		console.log('game over')
		clear()
		game =  0		
	}	
}





function restart (){
	clear()
	score=[]
	roundScore=[]
	tries=[]
	roundGoal=3

	    
}


function speedUp(rem,ad){
	
	
	$('#motherboard').removeClass(rem)
	$('#motherboard').addClass(ad)

}


function levelChange(){
	var a = roundScore.length
	if(a % 3 == 0 && a <10 && a > 1){
	 speedUp(level[ a/3 - 1], level[a/3])
	 levels.push(1)
	 $($('.stats')[1]).html(levels.length)
	 // this will take off the previous class and add 
	 // the next a is multiple/modulua of 3 (3,6,9)
	 // translating to position 123. a/3-1 for previous class.
	}
	if (a > 9){
		// lets try changing direction mid round
		setInterval(function(){
			$('#motherboard').toggleClass('spinnerthree')
		},5000)	

		
	}
}


function countDown(T){
	var timer= new Array(T)

	$($('.stats')[2]).html(timer.length)
	timerId = setInterval(function(){
	
		timer.pop()
		$($('.stats')[2]).html(timer.length)
	
	

		if (timer.length===0){
			game=0
			restart()
			clearInterval(timerId)
		}
	},1500)
	
}






}