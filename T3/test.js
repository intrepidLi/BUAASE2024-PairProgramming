import assert from "assert";
import fs from "fs";

// Choose proper "import" depending on your PL.
import { mancalaOperator as op1 } from "./t3-2-as/build/release.js";
// import { mancala_operator as op1 } from "./t3_2_rust/pkg/t3_2_rust.js"
// [Write your own "import" for other PLs.]

// Choose proper "import" depending on your PL.
// import { mancalaOperator as op2 } from "./t3-2-as-rival/build/release.js";
import { mancalaOperator as op2 } from "./t3-2-as-rival/t3-2-c-pre-glue.js";
// import { mancala_operator as op2 } from "./t3_2_rust_rival/pkg/t3_2_rust.js"
// [Write your own "import" for other PLs.]

// Choose proper "import" depending on your PL.
import { mancalaBoard as board } from "./t3-1-as/build/release.js";

// import { State } from "./t3-1-as/src/state.js";
// import { mancala_board as board } from "./t3_1_rust/pkg/t3_1_rust.js"
// [Write your own "import" for other PLs.]

function readTXTFile(file) {
  var lines = file.split("\n");

  lines.forEach(function (line, index) {
    if (line) {
      // console.log('Line ' + index + ' : ' + line);
      var obj = JSON.parse(line);
      // console.log(obj);
      var type = obj.type;
      var steps = obj.steps;
      var exBoard = obj.board;

      if (type === "complete") {
        var winner = obj.winner;
        var winning_points = obj.winning_points;
        var last_step = steps[steps.length - 1];
        var res_board = board(Math.floor(last_step / 10), steps, steps.length);

        // console.log(res_board);
        assert.strictEqual(
          res_board[14],
          winning_points,
          "The type is:" + type + " The line is: " + line
        );
        let i = 0;
        let flag = 0;
        for (i = 0; i < 6; i++) {
          if (exBoard[i] !== 0) {
            flag = 1;
            break;
          }
        }
        if (flag === 1) {
          for (let j = 0; j < 6; j++) {
            exBoard[6] += exBoard[j];
            exBoard[j] = 0;
          }
        }
        for (i = 7; i < 13; i++) {
          if (exBoard[i] !== 0) {
            flag = 1;
            break;
          }
        }
        if (flag === 1) {
          for (let j = 7; j < 13; j++) {
            exBoard[13] += exBoard[j];
            exBoard[j] = 0;
          }
        }

        assert.deepStrictEqual(
          res_board.slice(0, 14),
          exBoard,
          "The type is:" + type + " The line is: " + line
        );

        // if (winner === 0) {
        //     var last_step = steps[steps.length - 1];
        //     res_board = board(last_step / 10, steps, steps.length);

        //     assert.strictEqual(res_board[14], winning_points, "The type is:" + type + " The line is: " + line);
        //     // assert.strictEqual(mancalaResult(1, steps, steps.length), winning_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
        // } else {
        //     assert.strictEqual(mancalaResult(1, steps, steps.length), winning_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
        // }
      } else if (type === "incomplete") {
        var next_turn = obj.next_turn;
        var last_step = steps[steps.length - 1];
        var res_board = board(Math.floor(last_step / 10), steps, steps.length);
        // console.log(res_board);
        assert.strictEqual(
          res_board[14],
          next_turn + 1,
          "The type is:" + type + " The line is: " + line
        );
        assert.deepStrictEqual(
          res_board.slice(0, 14),
          exBoard,
          "The type is:" + type + " The line is: " + line
        );
        // assert.strictEqual(mancalaResult(1, steps, steps.length), first_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
      } else if (type === "illegal") {
        var illegal_points = obj.illegal_points;
        var illegal_player = obj.illegal_player;
        var res_board = board(illegal_player + 1, steps, steps.length);
        // console.log(res_board);
        assert.strictEqual(
          res_board[14],
          illegal_points,
          "The type is:" + type + " The line is: " + line
        );
        assert.deepStrictEqual(
          res_board.slice(0, 14),
          exBoard,
          "The type is:" + type + " The line is: " + line
        );
        // assert.strictEqual(mancalaResult(1, steps, steps.length), points, "The type is:" + type + " The file is: " + file + " The line is: " + line);
      }
      // assert.strictEqual(mancalaResult(1, steps, steps.length), pure_points);
    }
  });
}

// fs.readFile('test_data/output1.txt', 'utf8', function(err, data) {
//     if (err) throw err;
//     readTXTFile(data);
//     // let steps = [13, 14, 22, 23, 16, 24, 11, 16, 14, 23, 12, 22, 16, 15, 25, 14, 24, 15, 13, 26, 21, 14, 24, 11, 23, 16];
//     // let steps = [13]
//     // let res_board = board(1, steps, steps.length);
//     // loop print the board in each step
//     // for (let i = 0; i < steps.length; i++) {
//     //     console.log(Math.floor(steps[i] / 10));
//     //     console.log(steps.slice(0, i + 1));
//     //     let res_board = board(Math.floor(steps[i] / 10), steps.slice(0, i + 1), i + 1);
//     //     console.log("Step: " + i.toString());
//     //     console.log(steps[i]);
//     //     console.log(res_board);
//     // }

//     console.log("🎉 You have passed all the tests provided.");

// });

  let op1wins = 0;
  let op2wins = 0;
  let op3wins = 0;
  let op1Result = 0,
      op2Result = 0;
  
    let operator, status, operation, operationSequence, boardReturn, isEnded;
    
    let op1Result1 = 0,
      op2Result1 = 0;
    let op1Time = 0,
      op2Time = 0,
      timeStamp = 0;
    // Firstly, start from op1.
    operator = 1;
    status = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    operation = 0;
    operationSequence = [];
    isEnded = false;
    do {
      if (operator == 1) {
        timeStamp = performance.now() * 1000;

        operation = op1(1, status);
        // console.log("op1", operation);
        op1Time += performance.now() * 1000 - timeStamp;
        operationSequence.push(operation);
        boardReturn = board(1, operationSequence, operationSequence.length);
        // console.log("board", boardReturn);
        // console.log("******************************\n");
      } else {
        timeStamp = performance.now() * 1000;
        operation = op2(2, status);
        // console.log("op2", operation);
        op2Time += performance.now() * 1000 - timeStamp;
        operationSequence.push(operation);
        boardReturn = board(2, operationSequence, operationSequence.length);
        // console.log("board", boardReturn);
        // console.log("******************************\n");
      }
      if (boardReturn[14] == 1) {
        operator = 1;
        status = boardReturn.slice(0, 14);
      } else if (boardReturn[14] == 2) {
        operator = 2;
        status = boardReturn.slice(0, 14);
      } else {
        isEnded = true;
        op1Result += boardReturn[14] - 200;
        op1Result1 += boardReturn[14] - 200;
        op2Result -= boardReturn[14] - 200;
        op2Result1 -= boardReturn[14] - 200;
      }
    } while (!isEnded);
    // console.log("first hand: ours");
    // console.log("operationSequence", operationSequence);
    // console.log("boardReturn", boardReturn);
    // console.log("******************************\n");
    if (op1Result1 > op2Result1) {
      op1wins++;
    } else if (op1Result1 < op2Result1) {
      op2wins++;
    } else if (op1Result1 === op2Result1) {
      op3wins++;
    }
    // console.log("🎉 Finished battle, result: " + op1Result + ":" + op2Result + ".");
    // Now change to start from op2.
   operator = 2;
   status = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
   operation = 0;
   operationSequence = [];
   isEnded = false;
    op1Result1 = 0;
    op2Result1 = 0;
 
   do {
     if (operator == 1) {
       timeStamp = performance.now() * 1000;
       operation = op1(1, status);
       op1Time += performance.now() * 1000 - timeStamp;
       operationSequence.push(operation);
       boardReturn = board(1, operationSequence, operationSequence.length);
     } else {
       timeStamp = performance.now() * 1000;
       operation = op2(2, status);
       op2Time += performance.now() * 1000 - timeStamp;
       operationSequence.push(operation);
       boardReturn = board(2, operationSequence, operationSequence.length);
     }
     if (boardReturn[14] == 1) {
       operator = 1;
       status = boardReturn.slice(0, 14);
     } else if (boardReturn[14] == 2) {
       operator = 2;
       status = boardReturn.slice(0, 14);
     } else {
        isEnded = true;
        op1Result += boardReturn[14] - 200;
        op2Result -= boardReturn[14] - 200;
        op1Result1 += boardReturn[14] - 200;
        op2Result1 -= boardReturn[14] - 200;
     }
   } while (!isEnded);
    // console.log("first hand: rivals");
    // console.log("operationSequence", operationSequence);
    // console.log("boardReturn", boardReturn);
    // console.log("******************************\n");

   if (op1Result1 > op2Result1) {
     op1wins++;
   } else if (op1Result1 < op2Result1) {
     op2wins++;
   } else if (op1Result1 === op2Result1) {
     op3wins++;
   }
     op1Time = op1Time / 1000;
     op2Time = op2Time / 1000;
 


console.log("🎉 Finished battle, result: " + op1Result + ":" + op2Result + ".");
console.log("🎉 Finished battle, result: " + op1wins + ":" + op2wins + ":" + op3wins + ".");
console.log("⏰ Processing Time: " + op1Time + ":" + op2Time + ".");


// test_proceed_action();



