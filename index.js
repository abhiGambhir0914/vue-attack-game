$(function() {
		
	$('.progressbar').each(function(){
		var t = $(this);
		var dataperc = t.attr('data-perc'),
				barperc = Math.round(dataperc*3.96);
		t.find('.bar').animate({width:barperc}, dataperc*25);
		t.find('.label').append('<div class="perc"></div>');
		
		function perc() {
			var length = t.find('.bar').css('width'),
				perc = Math.round(parseInt(length)/3.96),
				labelpos = (parseInt(length)-2);
			t.find('.label').css('left', labelpos);
			t.find('.perc').text(perc+'%');
		}
		perc();
		setInterval(perc, 0); 
	});
});

 new Vue({
     el: '#game-canvas',
     data: {
        playerhealth: 100,
        monsterhealth: 100,
        gamerunning: false,
        turns: []
     },
     methods:{
         startGame: function() {
             this.gamerunning = true;
             this.playerhealth = 100;
             this.monsterhealth =100;
             this.turns=[];
         },
         attack: function(){
                var damage = this.calculateDamage(3,10);
                this.monsterhealth -= damage
                this.turns.unshift({
                    isPlayer: true,
                    text: 'You hit the Opponent for ' + damage
                });
                if(this.checkWin()){
                    return;
                }
                this.monstersAttacks();
         },
         sp_attack: function(){
                var damage = this.calculateDamage(10,20);
                this.monsterhealth -= damage
                this.turns.unshift({
                    isPlayer: true,
                    text: 'You hit the Opponent hard for ' + damage
                });
                if(this.checkWin()){
                    return;
                }
                this.monstersAttacks();
         },
         heal: function(){
                if(this.playerhealth <=90)
                    this.playerhealth += 10;
                else   
                    this.playerhealth = 100;
                this.turns.unshift({
                    isHeal: true,
                    text: 'You healed for 10'
                });
                this.monstersAttacks(); 
         },
         calculateDamage: function(min,max){
                 return Math.max(Math.floor(Math.random() * max) + 1, min);
         },
         checkWin: function(){
                if(this.monsterhealth <= 0){
                    if(confirm('You won! New Game?')){
                        this.startGame();
                    } else{
                        this.gamerunning = false;
                    }
                    return true;
                } else if(this.playerhealth<=0){
                    if(confirm('You Lost! New Game?')){
                        this.startGame();
                    }else{
                    this.gamerunning=false;  
                    }
                    return true;
                }
                return false;
         },
         monstersAttacks: function(){
                var damage = this.calculateDamage(5,12);
                this.playerhealth -= damage;
                this.checkWin();
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Opponent hit You for ' + damage
                });
         }
     }
 })