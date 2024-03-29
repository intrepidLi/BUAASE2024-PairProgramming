// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

// 参数：
// 一个 i32 类型数字 flag，为 1 或 2；
// 一个 i32 类型数组 seq，包含若干介于 [11,16] 或 [21,26] 间的两位数数字；
// 一个 i32 类型数字 size，为数组 seq 的元素个数。
export function bocchiShutUp(flag: i32, seq: Array<i32>, size: i32): i32 {
  let count: Map<i32, i32> = new Map();

  if (flag === 1) {
    for (let i = 11; i <= 16; ++i) {
      count.set(i, 0);
    }
    for (let i = 0, k = seq.length; i < k; ++i) {
      if (seq[i] >= 11 && seq[i] <= 16) {
        count.set(seq[i], count.get(seq[i]) + 1);
      }
    }
  } else if (flag === 2) {
    for (let i = 21; i <= 26; ++i) {
      count.set(i, 0);
    }
    for (let i = 0, k = seq.length; i < k; ++i) {
      if (seq[i] >= 21 && seq[i] <= 26) {
        count.set(seq[i], count.get(seq[i]) + 1);
      }
    }
  }
  
  let mathMax = 0;
  let mathKey = 0;
  let values = count.values();
  for (let i = 0; i < count.size; ++i) {
    let key = count.keys()[i];
    let value = values[i];

    if (value > mathMax) {
      mathMax = value;
      mathKey = key;
    }
  }

  for (let i = 0; i < count.size; ++i) {
    let key = count.keys()[i];
    let value = values[i];

    if (value === mathMax && key !== mathKey) {
      return 10;
    }
  }

  return mathKey;
}
