import assert from "assert";

// Choose proper "import" depending on your PL.
import { mancalaResult } from "./t2-as/build/release.js";
// import { mancala_result as mancalaResult } from "./t2_rust/pkg/t1_rust.js"
// [Write your own "import" for other PLs.]
// assert.strictEqual(mancalaResult(1,[13],1),20001);
// assert.strictEqual(mancalaResult(1,[13,15],2),20002);
// assert.strictEqual(mancalaResult(1,[13,15,22],3),20002);
// assert.strictEqual(mancalaResult(1,[13,15,22,21],4),20002);
// TXT File just like:
// {"winner": 1, "pure_points": 12, "steps": [14, 23, 25, 12, 15, 22, 21, 26, 11, 14, 12, 24, 16, 26, 22, 15, 21, 16, 13, 26, 21, 12, 22, 16, 14, 23, 15, 16]}
// {"winner": 0, "pure_points": 2, "steps": [13, 16, 23, 11, 22, 24, 14, 25, 16, 12, 26, 16, 23, 15, 24, 23, 16, 11, 26, 11, 21, 14, 26, 25, 26, 24, 16, 13, 21, 15, 22, 16]}
import fs from 'fs';
import path from "path";

// const fs = require('fs');
// Read the txt file content
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
                if (winner === 0) {
                    assert.strictEqual(mancalaResult(1, steps, steps.length), winning_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
                } else {
                    assert.strictEqual(mancalaResult(1, steps, steps.length), winning_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
                }
            } 
            else if (type === "incomplete") {
                var first_points = obj.first_points;
                assert.strictEqual(mancalaResult(1, steps, steps.length), first_points,  "The type is:" + type + " The file is: " + file + " The line is: " + line);
            } 
            else if (type === "illegal") {
                var points = obj.points;
                assert.strictEqual(mancalaResult(1, steps, steps.length), points, "The type is:" + type + " The file is: " + file + " The line is: " + line);
            }
            // assert.strictEqual(mancalaResult(1, steps, steps.length), pure_points);
        }
    })
}

// const folderPath = 'd:\dasanXia\software_engineer\Mancala-main\inputs';

// const subFolders = ['complete', 'incomplete', 'illegal', 'synthetic'];

// subFolders.forEach(subFolder => {

// })
fs.readFile('output0.txt', 'utf8', function(err, data) {
    if (err) throw err;
    // readTXTFile(data);
    // assert.strictEqual(mancalaResult(1,[13, 16, 13, 23, 12, 25, 13, 24, 12, 15, 24, 25], 12),30001);
    assert.strictEqual(mancalaResult(1,[13,15,22,21,11],5),20004);
    assert.strictEqual(mancalaResult(2,[23, 24, 12, 16, 22, 25, 14, 21, 24, 25, 26, 16, 22, 15, 26, 24, 14, 25, 26, 23, 16, 12, 26, 25, 13, 21, 14, 24, 15, 16],30),15028);
    assert.strictEqual(mancalaResult(1,[11,12],2),30001);
    assert.strictEqual(mancalaResult(1,[14],1),20001);

    console.log("🎉 You have passed all the tests provided.");

});


