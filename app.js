var sudokuApp = new Vue({
    el: '#app-sudoku',

    data: {
        sudokuMatrix: [],
        answerImage: "",
        isGameStarted: false,
        showAnswer: false,
        isNewGame: true,
    },

    mounted() {
        // Preload image
        new Image().src = './image/fail.gif';
        new Image().src = './image/success.gif';
    },

    methods: {
        initializeGame(level) {
            var defaultSudokuMatrix = generate();

            // Empty random cells per row
            for (var i = 0; i < defaultSudokuMatrix.length; ++i) {
                var k = 0;
                while (k < level) {
                    var randomColumnIndex = Math.floor(Math.random() * defaultSudokuMatrix.length);
                    if (defaultSudokuMatrix[i][randomColumnIndex].num != "") {
                        k++;
                        defaultSudokuMatrix[i][randomColumnIndex].num = "";
                        defaultSudokuMatrix[i][randomColumnIndex].readOnly = false;
                    }
                }
            }

            this.sudokuMatrix = defaultSudokuMatrix;
            this.isGameStarted = true;
            this.isNewGame = false;
        },

        evaluateGame() {
            var result = sudoku.map((x, i) => sudoku[i].map(y => parseInt(y.num)));
            var maxtrixCheck = this.sudokuMatrix.map((x, i) => this.sudokuMatrix[i].map(y => parseInt(y.num)));

            if (JSON.stringify(result) == JSON.stringify(maxtrixCheck)) {
                this.answerImage = "./image/success.gif";
                this.showAnswer = true;
                this.isGameStarted = false;
                this.isNewGame = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                    this.isNewGame = false;
                }, 2000);
            }
            else {
                this.answerImage = "./image/fail.gif";
                this.showAnswer = true;
                this.isGameStarted = false;
                this.isNewGame = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                    this.isNewGame = false;
                }, 2000);
            }
        },

        restart() {
            this.isGameStarted = false;
            this.showAnswer = false;
            this.isNewGame = true;
        },

        formatCell(row, cell) {
            if (this.sudokuMatrix[row][cell].num.length > 1) {
                this.sudokuMatrix[row][cell].num = this.sudokuMatrix[row][cell].num[1];
            }
        },

        onlyNumber($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

            if (keyCode < 48 || keyCode > 57) {
                $event.preventDefault();
            }
        }
    }
});