import assert from "assert";
import fs from 'fs';

// Choose proper "import" depending on your PL.
// import { mancalaOperator as op1 } from "./t3-2-as/build/release.js";
// import { mancala_operator as op1 } from "./t3_2_rust/pkg/t3_2_rust.js"
// [Write your own "import" for other PLs.]

// Choose proper "import" depending on your PL.
// import { mancalaOperator as op2 } from "./t3-2-as-rival/build/release.js";
// import { mancala_operator as op2 } from "./t3_2_rust_rival/pkg/t3_2_rust.js"
// [Write your own "import" for other PLs.]

// Choose proper "import" depending on your PL.
import { mancalaBoard as board } from "./t3-1-as/build/release.js";
// import { mancala_board as board } from "./t3_1_rust/pkg/t3_1_rust.js"
// [Write your own "import" for other PLs.]

function readTXTFile(file) {
    var lines = file.split('\n');

    lines.forEach(function(line, index) {
        if (line) {
            // console.log('Line ' + index + ' : ' + line);
            var obj = JSON.parse(line);
            // console.log(obj);
            var type = obj.type;
            var steps = obj.steps;

            if (type === "complete") {
                var winner = obj.winner;
                var winning_points = obj.winning_points;
                var last_step = steps[steps.length - 1];
                var res_board = board(Math.floor(last_step / 10), steps, steps.length);

                console.log(res_board);
                assert.strictEqual(res_board[14], winning_points, "The type is:" + type + " The line is: " + line);
                
                // if (winner === 0) {
                //     var last_step = steps[steps.length - 1];
                //     res_board = board(last_step / 10, steps, steps.length);

                //     assert.strictEqual(res_board[14], winning_points, "The type is:" + type + " The line is: " + line);
                //     // assert.strictEqual(mancalaResult(1, steps, steps.length), winning_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
                // } else {
                //     assert.strictEqual(mancalaResult(1, steps, steps.length), winning_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
                // }
            } 
            else if (type === "incomplete") {
                var next_turn = obj.next_turn;
                var last_step = steps[steps.length - 1];
                var res_board = board(Math.floor(last_step / 10), steps, steps.length);
                console.log(res_board);
                assert.strictEqual(res_board[14], next_turn + 1, "The type is:" + type + " The line is: " + line);
                // assert.strictEqual(mancalaResult(1, steps, steps.length), first_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
            } 
            else if (type === "illegal") {
                var illegal_points = obj.illegal_points;
                var illegal_player = obj.illegal_player;
                var res_board = board(illegal_player + 1, steps, steps.length);
                console.log(res_board);
                assert.strictEqual(res_board[14], illegal_points, "The type is:" + type + " The line is: " + line);
                // assert.strictEqual(mancalaResult(1, steps, steps.length), points, "The type is:" + type + " The file is: " + file + " The line is: " + line);
            }
            // assert.strictEqual(mancalaResult(1, steps, steps.length), pure_points);
        }
    })
}


fs.readFile('output_T3_0.txt', 'utf8', function(err, data) {
    if (err) throw err;
    readTXTFile(data);
    // assert.strictEqual(mancalaResult(1,[13, 16, 13, 23, 12, 25, 13, 24, 12, 15, 24, 25], 12),30001);
    // let steps = [13, 14, 22, 23, 16, 24, 11, 16, 14, 23, 12, 22, 16, 15, 25, 14, 24, 15, 13, 26, 21, 14, 24, 11, 23, 16];
    // let steps = [13]
    // let res_board = board(1, steps, steps.length);
    // loop print the board in each step
    // for (let i = 0; i < steps.length; i++) {
    //     console.log(Math.floor(steps[i] / 10));
    //     console.log(steps.slice(0, i + 1));
    //     let res_board = board(Math.floor(steps[i] / 10), steps.slice(0, i + 1), i + 1);
    //     console.log("Step: " + i.toString());
    //     console.log(steps[i]);
    //     console.log(res_board);
    // }

    console.log("🎉 You have passed all the tests provided.");

});



// let operator, status, operation, operationSequence, boardReturn, isEnded;
// let op1Result = 0, op2Result = 0;
// let op1Time = 0, op2Time = 0, timeStamp = 0;

// // Firstly, start from op1.
// operator = 1;
// status = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
// operation = 0;
// operationSequence = [];
// isEnded = false;

// do {
//     if (operator == 1) {
//         timeStamp = performance.now() * 1000;
//         operation = op1(1, status);
//         op1Time += performance.now() * 1000 - timeStamp;
//         operationSequence.push(operation);
//         boardReturn = board(1, operationSequence, operationSequence.length);
//     } else {
//         timeStamp = performance.now() * 1000;
//         operation = op2(2, status);
//         op2Time += performance.now() * 1000 - timeStamp;
//         operationSequence.push(operation);
//         boardReturn = board(2, operationSequence, operationSequence.length);
//     }
//     if (boardReturn[14] == 1) {
//         operator = 1;
//         status = boardReturn.slice(0,14);
//     } else if (boardReturn[14] == 2) {
//         operator = 2;
//         status = boardReturn.slice(0,14);
//     } else {
//         isEnded = true;
//         op1Result += boardReturn[14] - 200;
//         op2Result -= boardReturn[14] - 200;
//     }
// } while (!isEnded);

// // Now change to start from op2.
// operator = 2;
// status = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
// operation = 0;
// operationSequence = [];
// isEnded = false;

// do {
//     if (operator == 1) {
//         timeStamp = performance.now() * 1000;
//         operation = op1(1, status);
//         op1Time += performance.now() * 1000 - timeStamp;
//         operationSequence.push(operation);
//         boardReturn = board(1, operationSequence, operationSequence.length);
//     } else {
//         timeStamp = performance.now() * 1000;
//         operation = op2(2, status);
//         op2Time += performance.now() * 1000 - timeStamp;
//         operationSequence.push(operation);
//         boardReturn = board(2, operationSequence, operationSequence.length);
//     }
//     if (boardReturn[14] == 1) {
//         operator = 1;
//         status = boardReturn.slice(0,14);
//     } else if (boardReturn[14] == 2) {
//         operator = 2;
//         status = boardReturn.slice(0,14);
//     } else {
//         isEnded = true;
//         op1Result += boardReturn[14] - 200;
//         op2Result -= boardReturn[14] - 200;
//     }
// } while (!isEnded);
 
// op1Time = op1Time / 1000;
// op2Time = op2Time / 1000;

// console.log("🎉 Finished battle, result: " + op1Result + ":" + op2Result + ".");
// console.log("⏰ Processing Time: " + op1Time + ":" + op2Time + ".");