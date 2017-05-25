$(start)
var wires = ['red','yellow','pink','blue','orange','purple','white','black','green']
var coloring =[]
var playerColoring = []
var x;
var n = 3
var roundGoal = 2
var tries =[]
var score =[]
var game = 0
var newPlay = 0
var roundScore=[]
var level = ['spinner','spinnertwo','spinnerthree','spinnerfour']
var levels = [1]
var T= 30
var timerId
var levelPic = ['picOne','picTwo','picThree','picFour']
var shake = 50
var points
var highscore = 0
var switchSpin
function start (){




play()
$('#c4').click(function(event){
	quit()
	console.log('you abandoned your line of duty')
})



function play(){
	$('#clock').click(function(event){
		if(game===0)	{
			game=1
			
			restart()
			countDown(T)
			colorSequence()
			changeClass('#motherboard','level','spinner')
			changeClass('#clue','clear','picOne')
			if(newPlay===0){
				colorChoice()
				newPlay = 1
			}
			
		}
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
			points = score.length+roundScore.length*10
			$($('.stats')[0]).html(points)
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
			// roundGoal=roundGoal+1

			console.log(roundScore.length)
			levelChange()



	}else if(tries.length===4){
		console.log('game over')
		clear()
		quit()
	}	
}





function restart (){
	clear()
	score=[]
	roundScore=[]
	tries=[]
	roundGoal=2	
	levels=new Array(1)
	T=30   

}


function changeClass(id,rem,ad){
	
	
	$(id).removeClass(rem)
	$(id).addClass(ad)

}


function levelChange(){
	var a = roundScore.length
	if(a % 3 == 0 && a <10 && a > 1){
	 changeClass('#motherboard',level[ a/3 - 1], level[a/3])
	 changeClass('#clue',levelPic[ a/3 - 1], levelPic[a/3])
	 levels.push(1)
	 $($('.stats')[1]).html(levels.length)
	}
	if (a > 9){

		switchSpin = setInterval(function(){
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
			quit()
		}
	},1500)
}

function quit (){	
	if(game===1){
		game = 0.5 
		clear()
		clearInterval(timerId)
		clearInterval(switchSpin)
		setTimeout(function(){
			$('#motherboard').toggleClass(level[levels.length-1])
			$('#clue').toggleClass(levelpic[levels.length-1])

		},3000)			
			// turn to function dude
		var shaker = setInterval(function(){
			$('#motherboard').toggleClass('explode')	
		},200)
		setTimeout(function(){
			clearInterval(shaker)			
			changeClass('#motherboard','explode','level')

			game = 0
			if (points>highscore){
				highscore = points
				$($('.stats')[3]).html(highscore)
				console.log('highscore')
			}
		},10000)
	}
}




}