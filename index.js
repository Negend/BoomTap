$(start)
var wires = ['red','yellow','pink','blue','orange','purple','white','black','green']



function start (){








	$('.wire').each(function(i,name){
		$(this).click(function(event){
			console.log(wires[i])
		})
	})











}