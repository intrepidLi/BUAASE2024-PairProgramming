import assert from "assert";

// Choose proper "import" depending on your PL.
import { mancalaResult } from "./t2-as/build/release.js";
// import { mancala_result as mancalaResult } from "./t2_rust/pkg/t1_rust.js"
// [Write your own "import" for other PLs.]
// assert.strictEqual(mancalaResult(1,[13],1),20001);
// assert.strictEqual(mancalaResult(1,[13,15],2),20002);
// assert.strictEqual(mancalaResult(1,[13,15,22],3),20002);
// assert.strictEqual(mancalaResult(1,[13,15,22,21],4),20002);
assert.strictEqual(mancalaResult(1,[13,15,22,21,11],5),20004);
assert.strictEqual(mancalaResult(1,[11,12],2),30001);
assert.strictEqual(mancalaResult(1,[14],1),20001);

console.log("🎉 You have passed all the tests provided.");
