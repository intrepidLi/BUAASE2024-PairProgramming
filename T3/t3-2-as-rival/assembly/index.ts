// The entry file of your WebAssembly module.

export function getLegalActions(flag: i32, status: Array<i32>): Array<i32> {
  let legalActions: Array<i32> = new Array<i32>();
  if (flag == 1) {
    for (let i = 0; i < 6; i++) {
      if (status[i] != 0) {
        legalActions.push(i + 11);
      }
    }
  } else {
    for (let i = 7; i < 13; i++) {
      if (status[i] != 0) {
        legalActions.push(i + 14);
      }
    }
  }

  return legalActions;
}


export function mancalaOperator(flag: i32, status: Array<i32>): i32 {
    let legalActions: Array<i32> = getLegalActions(flag, status);

    let random_index = i32(Math.floor(Math.random() * legalActions.length));

    return legalActions[random_index];
}