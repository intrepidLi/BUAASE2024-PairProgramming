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


// minimax algorithm(alphabeta pruning)
export function minimax(state: State, depth: i32, alpha: i32, beta: i32, flag: i32): i32 {
    if (depth == 0 || state.isFinish()) {
        return state.getArrayValue(getScorePocket(flag)) - state.getArrayValue(getScorePocket(3 - flag));
    }

    let legalActions: Array<i32> = state.getLegalActions();
    
    if (state.getTurn() == flag){
      for (let i = 0; i < legalActions.length; i++) {
        let newState = state.proceed_action(legalActions[i]);
        alpha = max(alpha, minimax(newState, depth - 1, alpha, beta, flag));
        if (beta <= alpha) {
          break;
        }
      }

      return alpha;
    } else {
      for (let i = 0; i < legalActions.length; i++) {
        let newState = state.proceed_action(legalActions[i]);
        beta = min(beta, minimax(newState, depth - 1, alpha, beta, flag));
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

    // get legal actions
    let legalActions: Array<i32> = state.getLegalActions();

    // if no legal actions, return None
    if (legalActions.length === 0) {
        return -1;
    }

    let act_rewards = new Array<i32>();
    // minimax algorithm
    for (let i = 0; i < legalActions.length; i++) {
        let newState = state.proceed_action(legalActions[i]);
        let m = minimax(newState, 3, -100000, 100000, flag);
        act_rewards.push(m);
    }
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

    let random_index = i32(Math.floor(Math.random() * max_indexs.length));
    max_index = max_indexs[random_index];

    return legalActions[max_index];
}