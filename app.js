var score, roundScore, activePlayer, gamePlaying, counter = 0;
init();
document.querySelector('.btn-roll').addEventListener('click', function(){   
    if(gamePlaying){
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
			
        var diceDOM1 = document.querySelector('.dice1');	
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
		
        if (dice1 !==1 && dice2 !== 1){
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
			if(dice1===6 || dice2 === 6){
				counter += 1;
				if(counter === 2){
					document.querySelector('#score-' + activePlayer).textContent = 0;
					nextPlayer();
				}
			}
			else{
				counter = 0;
			}
        }
        else{
			nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){    
    if(gamePlaying){
		scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var skor_akhir = document.querySelector('.final_score').value;
		var final_score;
	
		if(skor_akhir){
			final_score = skor_akhir;
		}
		else{
			final_score = 100;
		}
        if (scores[activePlayer] >= final_score){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
            gamePlaying = false;
        }
        else{
			nextPlayer();
        }
    }
});

function nextPlayer(){   
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
	counter = 0;
	
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}