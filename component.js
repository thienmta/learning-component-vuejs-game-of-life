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
    createNewUniverse[1][5] = 1;
    createNewUniverse[1][6] = 1;
    createNewUniverse[2][5] = 1;
    createNewUniverse[2][6] = 1;

    createNewUniverse[11][5] = 1;
    createNewUniverse[11][6] = 1;
    createNewUniverse[11][7] = 1;

    createNewUniverse[12][4] = 1;
    createNewUniverse[13][3] = 1;
    createNewUniverse[14][3] = 1;

    createNewUniverse[12][8] = 1;
    createNewUniverse[13][9] = 1;
    createNewUniverse[14][9] = 1;

    createNewUniverse[15][6] = 1;

    createNewUniverse[16][4] = 1;
    createNewUniverse[16][8] = 1;

    createNewUniverse[17][5] = 1;
    createNewUniverse[17][6] = 1;
    createNewUniverse[17][7] = 1;

    createNewUniverse[18][6] = 1;

    createNewUniverse[22][3] = 1;
    createNewUniverse[22][4] = 1;
    createNewUniverse[22][5] = 1;
    createNewUniverse[21][3] = 1;
    createNewUniverse[21][4] = 1;
    createNewUniverse[21][5] = 1;

    createNewUniverse[23][2] = 1;
    createNewUniverse[23][6] = 1;

    createNewUniverse[25][1] = 1;
    createNewUniverse[25][2] = 1;
    createNewUniverse[25][6] = 1;
    createNewUniverse[25][7] = 1;

    createNewUniverse[36][3] = 1;
    createNewUniverse[36][4] = 1;
    createNewUniverse[35][3] = 1;
    createNewUniverse[35][4] = 1;
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
    
}, 100);