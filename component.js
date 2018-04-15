Vue.component('universe-map', {
    props: ['propuniverse'],
    template: `
                <div>
                    <button id="btn1" v-on:click="changeMap">Nexting ...</button><br>
                    <div v-for="a in 50"  style="float: left;">
                        <row-map :x="a-1" :proprow="propuniverse"></row-map>
                    </div>
                </div>
            `,
    methods: {
        changeMap: function () {
            this.$emit('change');
        }
    }
});

Vue.component('row-map', {
    props: ['proprow', 'x'],
    methods: {
        showRowMap: function () {
            var rowmap = [];
            for (var j = 0; j < 50; j++) {
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
                    <div v-for="i in 50">
                        <cell-map :x="i-1" :propcell="showRowMapUniver"></cell-map>
                    </div>
                </div>
            `
});

Vue.component('cell-map', {
    props: ['propcell', 'x'],
    methods: {
        showCellMap: function () {
            var cellmap = "";
            for (var j = 0; j < 50; j++) {
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
                    <div v-bind:class="'status-' + showCellMapUniver"></div>
                </div>
            `
});

var createNewUniverse = [];
function create () {
    for (var i = 0 ; i < 50; i++) {
        createNewUniverse[i] = [];
        for (var j = 0; j < 50; j++) {
            createNewUniverse[i][j] = 0; //Math.round(Math.random());
        }
    }
    createNewUniverse[9][9] = 1;
    createNewUniverse[9][10] = 1;
    createNewUniverse[9][11] = 1;
    createNewUniverse[9][12] = 1;
    createNewUniverse[9][13] = 1;
    createNewUniverse[9][14] = 1;
    createNewUniverse[9][15] = 1;
    createNewUniverse[9][16] = 1;
    createNewUniverse[11][9] = 1;
    createNewUniverse[11][10] = 1;
    createNewUniverse[11][11] = 1;
    createNewUniverse[11][12] = 1;
    createNewUniverse[11][13] = 1;
    createNewUniverse[11][14] = 1;
    createNewUniverse[11][15] = 1;
    createNewUniverse[11][16] = 1;
    createNewUniverse[10][9] = 1;
    createNewUniverse[10][16] = 1;
    createNewUniverse[10][11] = 1;
    createNewUniverse[10][12] = 1;
    createNewUniverse[10][13] = 1;
    createNewUniverse[10][14] = 1;

    createNewUniverse[40][30] = 1;
    createNewUniverse[40][31] = 1;
    createNewUniverse[40][32] = 1;
    return createNewUniverse;
}

var newmap = create();
var map = new Vue ({
    el: '#map-universe',
    data: {
        newUniverse: newmap
    },

    methods: {

        getValueOfCell: function (x, y) {
            if (x < 0 || x >= 50 || y < 0 || y >= 50) {
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
            var x = 0;
            if(this.newUniverse[i][j] == 0) {
                if (this.countNeighborPlanet(i, j) < 2 || this.countNeighborPlanet(i, j) > 3) {
                    x = 0;
                } else if (this.countNeighborPlanet(i, j) == 3) {
                    x = 1;
                } else if (this.countNeighborPlanet(i, j) == 2) {
                    x = 0;
                }
            }

            else if(this.newUniverse[i][j] == 1) {
                if (this.countNeighborPlanet(i, j) < 2 || this.countNeighborPlanet(i, j) > 3) {
                    x = 0;
                } else if (this.countNeighborPlanet(i, j) == 3) {
                    x = 1;
                } else if (this.countNeighborPlanet(i, j) == 2) {
                    x = 1;
                }
            }

            return x;
        },

        changeUniverseMapNumber: function () {
            var changeUniverse = [];
            for (var i = 0 ; i < 50; i++) {
                changeUniverse[i] = [];
                for (var j = 0; j < 50; j++) {
                    changeUniverse[i][j] = this.calculateCellState(i, j);
                }
            }
            this.newUniverse = changeUniverse;
        }
    },

    computed: {
        ChangenewMapUniverse: function () {
            return this.newUniverse;
        }
    }
});

setInterval(function() {
    if(document.getElementById('btn1')!== null){
        document.getElementById('btn1').click();  
    }
    
}, 300);