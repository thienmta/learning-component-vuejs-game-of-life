Vue.component('create-map',{
	props: ['prop'],
	template:`
				<div>
					<div v-for="(item, index) in prop">
			            <div v-for="i in 70" v-bind:class="'xxx-' + item[i-1]"></div>
			        </div>
				</div>
			`
});

Vue.component('change-map', {
	props: ['propchange'],
	template:`
				<div>
					<button id="btn1" v-on:click="changemap">Next map</button>
					<div v-for="(item, index) in propchange">
			            <div v-for="i in 70" v-bind:class="'xxx-' + item[i-1]"></div>
			        </div>
				</div>
			`,
	methods: {
		changemap: function () {
			this.$emit('change');
		}
	}
});

Vue.component('change-map2', {
	props: ['propchange2'],
	template:`
				<div>
					<button id="btn2" v-on:click="changemap2">Next map</button>
					<div v-for="(item, index) in propchange2">
			            <div v-for="i in 70" v-bind:class="'xxx-' + item[i-1]"></div>
			        </div>
				</div>
			`,
	methods: {
		changemap2: function () {
			this.$emit('change2');
		}
	}
});

var newmap = [];
var interval = "";
var interval2 = "";
var map = new Vue ({
	el: '#grid',
	data: {
		newUniverse: newmap,
		isShowCreateMap: false,
		isShowChangeMap: false,
		isShowChangeMap2: false,
		isShowBtnChangeMap: false,
		isShowBtnCreateMap: true,
		isAutonext: false,
		autoclick1: interval,
        autoClick2: interval2

	},

	methods: {
		addNewMap: function() {
            for (var i = 0 ; i < 70; i++) {
                this.newUniverse[i] = [];
                for (var j = 0; j < 70; j++) {
                    this.newUniverse[i][j] = Math.round(Math.random());
                }
            }
            return this.newUniverse;
        },

        getValueOfCell: function (x, y) {
            if (x < 0 || x >= 70 || y < 0 || y >= 70) {
                return 0;
            }
            else {
                return this.newUniverse[x][y];
            }
        },

        countNeighborPlanet: function (i, j) {
            return parseInt(this.getValueOfCell((i - 1), (j - 1))) + parseInt(this.getValueOfCell((i - 1), j)) + parseInt(this.getValueOfCell((i - 1), (j + 1))) + parseInt(this.getValueOfCell(i, (j - 1))) + parseInt(this.getValueOfCell(i, (j + 1))) + parseInt(this.getValueOfCell((i + 1), (j - 1))) + parseInt(this.getValueOfCell((i + 1), j)) + parseInt(this.getValueOfCell((i + 1), (j + 1))) ;
        },

        calculateCellState: function (i, j) {
            if (this.countNeighborPlanet(i, j) < 2 || this.countNeighborPlanet(i, j) > 3) {
                this.newUniverse[i][j] = 0;
            } else if (this.countNeighborPlanet(i, j) == 3) {
                this.newUniverse[i][j] = 1;
            }
        },

        changeUniverseMapNumber: function () {
        	this.isShowChangeMap2 = true;
        	this.isShowChangeMap = false;
            for (var i = 0 ; i < 70; i++) {
                for (var j = 0; j < 70; j++) {
                    this.calculateCellState(i, j);
                }
            }
            return this.newUniverse;
        },

        changeUniverseMapNumber2: function () {
        	this.isShowChangeMap = true;
        	this.isShowChangeMap2 = false;
            for (var i = 0 ; i < 70; i++) {
                for (var j = 0; j < 70; j++) {
                    this.calculateCellState(i, j);
                }
            }
            return this.newUniverse;
        },

        autoClick: function () {
            this.autoclick1 = setInterval(function() {
                document.getElementById('btn1').click();  
            }, 100);
            this.autoclick2 = setInterval(function() {
                document.getElementById('btn2').click();  
            }, 100);
        },

        stopClick: function () {
            clearInterval(this.autoclick1);
            clearInterval(this.autoclick2);
        }
	},

	computed: {
		newMapUniverse: function () {
            return this.addNewMap();
        },

        universeMapNumber: function () {
            for (var i = 0 ; i < 70; i++) {
                for (var j = 0; j < 70; j++) {
                    this.calculateCellState(i, j);
                }
            }
            return this.newUniverse;
        },

        ChangenewMapUniverse: function () {
            return this.changeUniverseMapNumber();
        }
	}
});