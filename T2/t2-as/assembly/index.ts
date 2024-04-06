// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

// 函数名：mancalaResult() 或者 mancala_result() etc.，根据你选择的编程语言选择合适的命名格式；

// 参数：

// 一个 i32 类型数字 flag，为 1 或 2：

// 代表本局 选手 1、选手 2 两位选手中，哪一方为先手；

// 一个 i32 类型数组 seq，包含若干介于 [11,16] 或 [21,26] 间的两位数数字：

// 每一个数字代表选手的一次决策和播撒操作，依次排列而得到的 seq 代表本局两位选手的行动序列。

// 十位数代表选手的编号，个位数代表棋洞的编号，其中棋洞的编号按照离计分洞最远到最近的顺序来从小到大编号：

// 也就是说，1 号棋洞是紧挨着对手计分洞的己方棋洞，6 号棋洞是紧挨着己方计分洞的己方棋洞。

// 例如，seq 为数组 [11,22] 时，代表本局中：选手 1 首先播撒了己方 **1 号棋洞 **内的棋子，随后 选手 2 播撒了己方 **2 号棋洞 **内的棋子。

// 一个 i32 类型数字 size，为数组 seq 的元素个数。
// 返回值：一个 i32 类型数字，代表本局的结果：

// 如果本局每一步都符合规则且刚好游戏结束（参照规则 6）：返回 $ 15000 + 先手的净胜棋数$。例如如果先手净胜棋数为 8，返回数字 15008；
// 如果本局每一步都符合规则且还未游戏结束（参照规则 6）：返回 $ 20000 + 先手的计分洞中的棋数$。例如如果此时先手的计分洞中棋数为 3，返回数字 20003；
// 如果本局的整个行动序列中出现了不符合规则的操作：返回 $ 30000 + 第一个不合法操作所在的步数$。步数对应 seq 中该步的数组下标，例如对于输入 (1, [11, 12], 2)，返回数字 30001，因为第 0 步 选手 1 播撒了己方 1 号棋洞 后，应该轮到 选手 2 行棋，而操作序列中 第 1 步 为 选手 1 再次操作，因此该步不合法。
export function mancalaResult(flag: i32, seq: Array<i32>, size: i32): i32 {
  let kalah: i32[][] = [[], [0, 4, 4, 4, 4, 4, 4], [0, 4, 4, 4, 4, 4, 4]];
  let score1: i32 = 0;
  let score2: i32 = 0;
  let nextDirec = flag;
  for (let i = 0; i < size; i++) {
    let direct = seq[i] / 10;
    let hole = seq[i] % 10; //start from this hole
    if (direct != nextDirec  || hole < 1 || hole > 6) {
      return 30000 + i;
    }
    hole = direct === 2 ? 7 - hole : hole;
    let piece = kalah[direct][hole]; //leave piece sum
    if (piece == 0) {
      return 30000 + i;
    }
    let nextFlag = false;
    kalah[direct][hole] = 0;
    while (piece > 0) {
      if (direct === 1) {
        for (let j = hole + 1; j <= 6 && piece > 0; j++) {
          kalah[1][j]++;
          piece--;
          hole++;
        }
        if (piece === 0) {
          break;
        }
        hole = -1;
        score1++;
        piece--;
        if (piece === 0) {
          nextFlag = true; //shouldNext
          break;
        }
        for (let j = 6; j > 0 && piece > 0; j--) {
          kalah[2][j]++;
          piece--;
        }
        if (piece === 0) {
          break;
        }
        hole = 0;
      } else if (direct === 2) {
        for (let j = hole - 1; j > 0 && piece > 0; j--) {
          kalah[2][j]++;
          piece--;
          hole--;
        }
        if (piece === 0) {
          break;
        }
        hole = -1;
        score2++;
        piece--;
        if (piece === 0) {
          nextFlag = true; //shouldNext
          break;
        }
        for (let j = 1; j <= 6 && piece > 0; j++) {
          kalah[1][j]++;
          piece--;
        }
        if (piece === 0) {
          break;
        }
        hole = 7;
      }
    }
    if (!nextFlag) {
      nextDirec = 3 - direct;
    } else {
      nextDirec = direct;
    }
    if (direct === 1) {
      if (hole > 0 && kalah[1][hole] === 1 && kalah[2][hole] != 0) {
        score1 += kalah[1][hole] + kalah[2][hole];
        kalah[1][hole] = 0;
        kalah[2][hole] = 0;
      }
    } else if (direct === 2) {
      if (hole > 0 && kalah[2][hole] === 1 && kalah[1][hole] != 0) {
        score2 += kalah[1][hole] + kalah[2][hole];
        kalah[1][hole] = 0;
        kalah[2][hole] = 0;
      }
    }
  }
  let res = isFinish(kalah[1], kalah[2]);
  if (res == 0) {
    let score = flag === 1 ? score1 : score2;
    return 20000 + score;
  }
  if (res == 1) {
    for (let j = 1; j <= 6; j++) {
      score2 += kalah[2][j];
    }
  } else {
    for (let j = 1; j <= 6; j++) {
      score1 += kalah[1][j];
    }
  }
  let score = flag === 1 ? score1 - score2 : score2 - score1;
  return 15000 + score;
}

export function isFinish(seq1: Array<i32>, seq2: Array<i32>): i32 {
  let side1Empty = seq1.slice(1).every(hole => hole === 0);
  let side2Empty = seq2.slice(1).every(hole => hole === 0);
  if (side1Empty) return 1;
  if (side2Empty) return 2;
  return 0;
}
