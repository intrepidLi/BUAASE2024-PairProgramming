// The entry file of your WebAssembly module.
import { State } from "./state";
export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function getScorePocket(flag: i32): i32 {
    if (flag == 1) {
      return 6;
    } else {
      return 13;
    }
}

// if init board
export function ifInitBoard(status : Array<i32>): bool {
    // let board: bool = true;
    for (let i = 0; i < 6; i++) {
      if (status[i] != 4) {
        return false;
      }
    }
    if (status[6] != 0) {
      return false;
    }

    for (let i = 7; i < 13; i++) {
      if (status[i] != 4) {
        return false;
      }
    }

    if (status[13] != 0) {
      return false;
    }
    return true;
}


// minimax algorithm(alphabeta pruning)
export function minimax(state: State, depth: i32, alpha: i32, beta: i32, flag: i32): i32 {
    // state.print();
    if (state.isFinish() || depth == 0) {
      // let p0_bag = state.getArrayValue(getScorePocket(flag));
      // let p1_bag = state.getArrayValue(getScorePocket(3 - flag));
      // if (p0_bag + p1_bag < 30) {
      //   if (state.getTurn() == flag) {
      //     return p0_bag - p1_bag;
      //   } else {
      //     return p1_bag - p0_bag;
      //   }
      // } else {

      // let emptyPocketNum = state.getEmptyPocketNum();
      // let p0_stones = state.getPSum(flag);
      // let p1_stones = state.getPSum(3 - flag);
      // let polar = 0;
      // if (p0_stones < p1_stones) {
      //   polar = -1;
      // } else if (p0_stones > p1_stones) {
      //   polar = 1;
      // }

      // if (p0_stones === p1_stones) {
      //   return 0;
      // } else {
      //   if (state.getTurn() == flag) {
      //     return i32((p0_stones - p1_stones) * (1 + polar * emptyPocketNum * 1.0 / Math.abs(p0_stones - p1_stones)));
      //  } else {
      //    return i32(- (p0_stones - p1_stones) * (1 + polar * emptyPocketNum * 1.0 / Math.abs(p0_stones - p1_stones)));
      //     }
      // }
      // }
      let polar = 0;
      // state.print();
      return state.getArrayValue(getScorePocket(flag)) - state.getArrayValue(getScorePocket(3 - flag));
        
    }

    let legalActions: Array<i32> = state.getLegalActions();
    // console.log("minimax_legalActions: ");
    // console.log(legalActions.toString());
    if (legalActions.length == 0) {
      // console.log("legalActions.length == 0");
      return state.getArrayValue(getScorePocket(flag)) - state.getArrayValue(getScorePocket(3 - flag));
    }
    
    if (state.getTurn() == flag){
      for (let i = 0; i < legalActions.length; i++) {
        // console.log("The legalAction_alpha is:" + legalActions[i].toString());
        let newState = state.proceed_action(legalActions[i]);
        
        alpha = max(alpha, minimax(newState, depth - 1, alpha, beta, flag));
        // console.log("alpha: ")
        // console.log(alpha.toString());
        if (beta <= alpha) {
          break;
        }
      }

      return alpha;
    } else {
      for (let i = 0; i < legalActions.length; i++) {
        // console.log("The legalAction_beta is:" + legalActions[i].toString());
        let newState = state.proceed_action(legalActions[i]);
       
        beta = min(beta, minimax(newState, depth - 1, alpha, beta, flag));
        // console.log("beta: ")
        // console.log(beta.toString());
        if (beta <= alpha) {
          break;
        }
      }
      return beta;
    }
}


export function mancalaOperator(flag: i32, status: Array<i32>): i32 {
    // legal actions of current player
    let state = new State(flag, status);
    if (ifInitBoard(status)) {
      if (flag == 1) {
        return 13;
      } else {
        return 23;
      }
    } 

    // get legal actions
    let legalActions: Array<i32> = state.getLegalActions();
    // console.log("legalActions: ");
    // console.log(legalActions.toString());

    // if no legal actions, return None
    if (legalActions.length === 0) {
        return -1;
    }

    let act_rewards = new Array<i32>();
    // minimax algorithm
    for (let i = 0; i < legalActions.length; i++) {
        let newState = state.proceed_action(legalActions[i]);
        // console.log("newState: ")
        // newState.print();
        let m = minimax(newState, 4, -100000, 100000, flag);
        act_rewards.push(m);
        
    }
    // console.log("legalActions: ")
    // console.log(legalActions.toString());
    // console.log("act_rewards: ")
    // console.log(act_rewards.toString());
    // let act_rewards = minimax(state, 2, -100000, 100000, flag);
    // console.log("act_rewards: ")
    // console.log(act_rewards.toString());

    // return the max in the act_rewards
    let max_reward = -100000;
    let max_index = -1;
    
    for (let i = 0; i < act_rewards.length; i++) {
        if (act_rewards[i] > max_reward) {
            max_reward = act_rewards[i];
            max_index = i;
        }
    }

    let max_indexs = new Array<i32>();
    for (let i = 0; i < act_rewards.length; i++) {
        if (act_rewards[i] == max_reward) {
            max_indexs.push(i);
        }
    }

    let p0_bag = state.getArrayValue(getScorePocket(flag));
    let p1_bag = state.getArrayValue(getScorePocket(3 - flag));

    let min_stones = 100;
    let min_stones_index = -1;

    for (let i = 0; i < max_indexs.length; i++) {
        
        // let emptyPocketNum = state.getEmptyPocketNum();
        // let p0_stones = state.getPSum(flag);
        // let p1_stones = state.getPSum(3 - flag);
        
        if (legalActions[max_indexs[i]] >= 11 && legalActions[max_indexs[i]] <= 16) {
          let stones = status[legalActions[max_indexs[i]] - 11];
          if (legalActions[max_indexs[i]] + stones == 17) {
            return legalActions[max_indexs[i]];
          }
        } else if (legalActions[max_indexs[i]] >= 21 && legalActions[max_indexs[i]] <= 26) {
          let stones = status[legalActions[max_indexs[i]] - 14];
          if (legalActions[max_indexs[i]] + stones == 27) {
            return legalActions[max_indexs[i]];
          }
        }
        if (legalActions[max_indexs[i]] == 16 || legalActions[max_indexs[i]] == 26) {
            return legalActions[max_indexs[i]];
        }
        if (p0_bag + 5 < p1_bag) {
          if (legalActions[max_indexs[i]] >= 11 && legalActions[max_indexs[i]] <= 16) {
            let stones = status[legalActions[max_indexs[i]] - 11];
            if (stones < min_stones) {
              min_stones = stones;
              min_stones_index = max_indexs[i];
            }
          }
          else if (legalActions[max_indexs[i]] >= 21 && legalActions[max_indexs[i]] <= 26) {
            let stones = status[legalActions[max_indexs[i]] - 14];
            if (stones < min_stones) {
              min_stones = stones;
              min_stones_index = max_indexs[i];
            }
          }

        } 
    }
    if (min_stones_index != -1) {
      return legalActions[min_stones_index];
    }


    let random_index = i32(Math.floor(Math.random() * max_indexs.length));
    max_index = max_indexs[random_index];

    return legalActions[max_index];

}

// Unit test for proceed_action function
// export function test_proceed_action(): void {
//   let status = [0, 6, 6, 6, 5, 5, 0, 0, 5, 5, 0, 4, 4, 2];
//   console.log("status: ")
//   let curPlayer = 2;
//   console.log("curPlayer: ")
//   let state = new State(curPlayer, status);
//   state.print();
//   let newState = state.proceed_action(12);
//   newState.print();
// }