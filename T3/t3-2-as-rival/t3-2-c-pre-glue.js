import { readFileSync } from 'fs';
function mancalaOperator(flag, array) {
    // 前置导入
    const wasmBuffer = readFileSync('./t3-2-as-rival/t3-2-c-pre.wasm');
    const wasmCode = new Uint8Array(wasmBuffer);
    const wasmModule = new WebAssembly.Module(wasmCode); 
    const wasmInstance = new WebAssembly.Instance(wasmModule);

    // 获取 wasm 封装好的函数
    const c_mancalaOperator = wasmInstance.exports.mancalaOperator;
    const memory = new Int32Array(wasmInstance.exports.memory.buffer);
    array.forEach((value, index) => {
        memory[index] = value;
    });
    // 调用 WebAssembly 模块中的函数，并传递参数
    return c_mancalaOperator(flag, memory);
}

function mancalaBoard(flag, array, length) {
    // 前置导入
    const wasmBuffer = readFileSync('./t3-1-c/t3.wasm');
    const wasmCode = new Uint8Array(wasmBuffer);
    const wasmModule = new WebAssembly.Module(wasmCode); 


    const alloc_memory = new WebAssembly.Memory({initial: 256, maximum: 256});

    // Create imports object for the WebAssembly instance
    const imports = {
        env: {
            memory: alloc_memory,
            // Implementing malloc function
            malloc: function(size) {
                const buffer = new ArrayBuffer(size);
                const pointer = alloc_memory.buffer.push(buffer);
                return pointer;
            },
            // Other imports as needed...
            emscripten_resize_heap: function(size) {
                // Dummy implementation, does nothing
            }
        }
    };
    const wasmInstance = new WebAssembly.Instance(wasmModule, imports);

    // 获取 wasm 封装好的函数
    const c_mancalaBoard = wasmInstance.exports.mancalaBoard;
    const memory = new Int32Array(wasmInstance.exports.memory.buffer);

    array.forEach((value, index) => {
        memory[index] = value;
    });
    // 调用 WebAssembly 模块中的函数，并传递参数

    const result = c_mancalaBoard(flag, memory, length);
    const resultArray = new Int32Array(memory.buffer, result, 15);
    return resultArray;
}

// 导出包装函数，以便其他 JavaScript 文件可以引入并调用
export { mancalaBoard };

// 导出包装函数，以便其他 JavaScript 文件可以引入并调用
export { mancalaOperator };