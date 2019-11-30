new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: [],
    },
    methods: {
        startGame: function(){
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack: function(){
            var damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player Hits Monster ' + damage
            });

            if(this.checkWin()){
                return;
            }

            damage = this.calculateDamage(12, 5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster Hits Player ' + damage
            });
            this.checkWin();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player Hits Monster ' + damage
            });

            if(this.checkWin()){
                return;
            }

            damage = this.calculateDamage(12, 5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster Hits Player ' + damage
            });
            this.checkWin();
        },
        heal: function(){
            if(this.playerHealth <= 50) this.playerHealth += 10;  
        },
        giveUp: function(){
            this.isGameRunning = false;
        },
        calculateDamage: function(mx, mn){
            return Math.max(Math.floor(Math.random() * mx) + 1, mn);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0) this.monsterHealth = 0;
            if(this.playerHealth <= 0) this.playerHealth = 0;

            if(this.monsterHealth == 0){
                if(confirm('You Won. New Game?')){
                    this.startGame();
                }
                else this.isGameRunning = false;
                return true;
            }
            else if(this.playerHealth == 0){
                this.playerHealth = 0;
                if(confirm('You Lost. New Game?')){
                    this.startGame();
                }
                else this.isGameRunning = false;
                return true;
            }
            return false;
        }
    }
});