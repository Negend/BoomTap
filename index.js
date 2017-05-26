$(start)
var wires = ['red','yellow','pink','blue','orange','purple','white','black','green']
var coloring =[]
var playerColoring = []
var x;
var n = 3

var roundGoal
var tries =[]
var score =[]
var game = 0
var newPlay = 0
var roundScore=[]
var level = ['spinner','spinnertwo','spinnerthree','spinnerfour']
var levels = [1]

var T
var timerId
var levelPic = ['picOne','picTwo','picThree','picFour']
var shake = 50
var points
var highscore = 0
var switchSpin
var once = 0
var sfx = new Audio()
// var vareffect
var rsfx = new Audio

var roundSound=['notOver','Great','goodJob','hellYeah','pressure','cyamon','OhNo',]
var levelSound=['','stadium','city','worldEnd'] 
// default difficulty ssettings
var goal = 1
var time = 45

var message = [ 
	'Please diffuse the bomb, you need to TAP the right wires I will guide you',
	'produce the colour combination below, each time. Hurry theres people here',
	'These people do not rest they have a stadium full of civillians, be a hero',
	'they are going nuclear, the world is at war. You must save the city',
	'The world is broken. Everyone went nuclear you are our last line against extintion',
	'GAME OVER,  GAME OVER, GAME OVER, GAME OVER, GAME OVER, GAME OVER,'

]


function start (){





// out of game music
// soundEffects()

difficulty()
play()
$('#c4').click(function(event){
	quit()
	console.log('you abandoned your line of duty')
})
$('#Info').click(function(){
	$('#infoList').toggleClass('hide')
})


function play(){
	$('#clock').click(function(event){
		if(game===0)	{
			// play new sound manually
			game=1
			soundEffects('help')
			restart(goal,time)
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
			randomizer(roundSound.length)
			
			// rsfx = new Audio();
			soundEffects(roundSound[x])
			console.log('Well Done next round')
			clearInterval()
			T = Math.round(T*0.95)

			clearInterval(timerId)
			countDown(T)
			score=[]
			tries=[]
			roundScore.push(1)
			roundGoal=roundGoal+1

			console.log(roundScore.length)
			levelChange()



	}else if(tries.length===4){
		console.log('game over')
		clear()
		quit()
	}	
}





function restart (rounds,timing){
	clear()
	once = 0
	score=[]
	roundScore=[]
	tries=[]
	roundGoal=rounds
	levels= [1]
	T=timing
	$($('.stats')[0]).html('0')   
	$($('.stats')[1]).html(levels.length)   
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
	 // rsfx.pause()
	 soundEffects(levelSound[levels.length])
	 levels.push(1)	 
	 $($('.stats')[1]).html(levels.length)
	}
	if (a > 9 && once==0){

		switchSpin = setInterval(function(){
			$('#motherboard').toggleClass('spinnerthree')
		},5000)	
		once=1		
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
		// .pause()background sound
		soundEffects('Ohnoooo')
		soundEffects('tick')
		setTimeout(function(){
			$('#motherboard').toggleClass(level[levels.length-1])
			$('#clue').toggleClass(levelPic[levels.length-1])
			changeClass('#motherboard','spinnerthree','level')
			changeClass('#clue',levelPic[levels.length-1],'destroyed')
			
			soundEffects('exploding')
			soundEffects('gameOver')
			// soundEffects('cracking')

		},3000)			
			// turn to function dude
		var shaker = setInterval(function(){
			$('#motherboard').toggleClass('explode')	
		},200)
		setTimeout(function(){
			clearInterval(shaker)			
			changeClass('#motherboard','explode','level')
			changeClass('#clue','destroyed','clear')
			game = 0
			if (points>highscore){
				
				highscore = points
				$($('.stats')[3]).html(highscore)
				$($('.stats')[3]).toggleClass('spas')
				setTimeout(function(){$($('.stats')[3]).toggleClass('spas')},1500)

			}
		},10000)
	}
}

function difficulty (){
	var timing= [45,30,20]
	var rounds= [3,2,1]
	
	$('.menu').each(function(i,name){
		$(this).click(function(event){
			if (game === 0){
				goal = rounds[i]
				time = timing[i]
			}
		})
	})
}

function soundEffects(effect){
	sfx.pause();
	sfx = new Audio('audio/'+ effect +'.mp3')
	sfx.play()
}

// document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>'




}