Vue.component('create-map',{
    props: ['prop'],
    template:`
                <div>
                    <div v-for="(item, index) in prop">
                        <div v-for="i in 70" v-bind:class="'status-' + item[i-1]"></div>
                    </div>
                </div>
            `
});

Vue.component('row-map', {
    props: ['proprow', 'x'],
    methods: {
        showRowMap: function () {
            var rowmap = [];
            for (var j = 0; j < 70; j++) {
                rowmap[j] = this.proprow[this.x][j];
            }
            return rowmap;
        }
    },

    computed: {
        showRowMapUniver: function () {
            return this.showRowMap();
        }
    },

    template: `
                <div>
                    <div>
                        <div v-for="i in 70" v-bind:class="'xxx-' + showRowMapUniver[i-1]"></div>
                    </div>

                    <div>
                        <div v-for="i in 70">
                            <cell-map :x="i-1" :propcell="showRowMapUniver"></cell-map>
                        </div>
                    </div>
                </div>
            `
});

Vue.component('cell-map', {
    props: ['propcell', 'x'],
    methods: {
        showCellMap: function () {
            var cellmap = "";
            for (var j = 0; j < 70; j++) {
                cellmap = this.propcell[this.x];
            }
            return cellmap;
        }
    },

    computed: {
        showCellMapUniver: function () {
            return this.showCellMap();
        }
    },

    template: `
                <div>
                    <div v-bind:class="'yyy-' + showCellMapUniver"></div>
                </div>
            `
});

var newmap = [];
var map = new Vue ({
    el: '#map-universe',
    data: {
        newUniverse: newmap,
        isShowCreateMap: true,
        isShowChangeMap: true,
        isShowChangeMap2: false,
        isShowChildMap: false,
        isShowChildMap2: false,
        autoclick1: "",
        autoClick2: ""

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
            this.isShowCreateMap = false;
            this.isShowChildMap2 = true;
            this.isShowChildMap = false;
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
            this.isShowCreateMap = false;
            this.isShowChildMap = true;
            this.isShowChildMap2 = false;
            for (var i = 0 ; i < 70; i++) {
                for (var j = 0; j < 70; j++) {
                    this.calculateCellState(i, j);
                }
            }
            return this.newUniverse;
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

// setInterval(function() {
//     if(document.getElementById('btn1')!== null){
//         document.getElementById('btn1').click();  
//     }
    
// }, 100);
// setInterval(function() {
//     if(document.getElementById('btn2')!== null){
//         document.getElementById('btn2').click();  
//     }
// }, 100);