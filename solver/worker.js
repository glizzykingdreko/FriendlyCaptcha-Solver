const fs = require('fs');
const { parentPort } = require('worker_threads');

class WasmSolver {
    constructor(base64string) {
        this.base64string = base64string;
        this.A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        this.I = "=".charCodeAt(0);
        this.g = new Uint8Array(256);
        for (let I = 0; I < this.A.length; I++)
            this.g[this.A.charCodeAt(I)] = I;
        this.buildStructure = this.buildStructure.bind(this);  // Bind buildStructure to this instance
        this.Q = null;  // Initialize this.Q to null
    }

    decodeScript(A) {
        const C = A.length;
        let Q = 3 * C >>> 2;
        A.charCodeAt(C - 1) === this.I && Q--,
            A.charCodeAt(C - 2) === this.I && Q--;
        const t = new Uint8Array(Q);
        for (let I = 0, Q = 0; I < C; I += 4) {
            const C = this.g[A.charCodeAt(I + 0)],
                B = this.g[A.charCodeAt(I + 1)],
                e = this.g[A.charCodeAt(I + 2)],
                o = this.g[A.charCodeAt(I + 3)];
            t[Q++] = C << 2 | B >> 4,
                t[Q++] = (15 & B) << 4 | e >> 2,
                t[Q++] = (3 & e) << 6 | 63 & o;
        }
        return t;
    }

    buildStructure(A) {
        const I = {},
            g = A.exports,
            C = g.memory,
            Q = g.__alloc,
            t = g.__retain,
            B = g.__rtti_base || -1;

        I.__allocArray = (A, I) => {
            const g = function (A) {
                return new Uint32Array(C.buffer)[(B + 4 >>> 2) + 2 * A];
            }(A),
                e = 31 - Math.clz32(g >>> 6 & 31),
                o = I.length,
                i = Q(o << e, 0),
                r = Q(12, A),
                n = new Uint32Array(C.buffer);
            n[r + 0 >>> 2] = t(i),
                n[r + 4 >>> 2] = i,
                n[r + 8 >>> 2] = o << e;
            const E = C.buffer,
                s = new Uint8Array(E);
            if (16384 & g)
                for (let A = 0; A < o; ++A)
                    s[(i >>> e) + A] = t(I[A]);
            else
                s.set(I, i >>> e);
            return r;
        };

        I.__getUint8Array = A => {
            const I = new Uint32Array(C.buffer),
                g = I[A + 4 >>> 2];
            return new Uint8Array(C.buffer, g, I[g - 4 >>> 2] >>> 0);
        };

        return function (A, I = {}) {
            const g = A.__argumentsLength ? I => {
                A.__argumentsLength.value = I;
            }
                : A.__setArgumentsLength || A.__setargc || (() => ({}));
            for (const C in A) {
                if (!Object.prototype.hasOwnProperty.call(A, C))
                    continue;
                const Q = A[C],
                    t = C.split(".")[0];
                "function" == typeof Q && Q !== g ? (I[t] = (...A) => (g(A.length),
                    Q(...A))).original = Q : I[t] = Q;
            }
            return I;
        }(g, I);
    }

    async initialize() {
        const self = this;
        let A = WebAssembly.compile(this.decodeScript(this.base64string))
        this.Q = await async function (A) {
            const I = await async function (A) {
                const I = {
                    env: {
                        abort() {
                            throw Error("Wasm aborted")
                        }
                    }
                };
                return {
                    exports: self.buildStructure(await WebAssembly.instantiate(A, I))
                }
            }(A)
                , g = I.exports.__retain(I.exports.__allocArray(I.exports.Uint8Array_ID, new Uint8Array(128)));
            let Q = I.exports.__getUint8Array(g);
            return (A, C, t = 4294967295) => {
                Q.set(A);
                const B = I.exports.solveBlake2b(g, C, t);
                Q = I.exports.__getUint8Array(g);
                const e = I.exports.__getUint8Array(B);
                return I.exports.__release(B),
                    [Q, e]
            }
        }(await A);

        // We wanna save the .wasm file to disk for debugging purposes
        fs.writeFileSync('wasm.wasm', this.decodeScript(this.base64string));
    }

    async solve(input) {
        if (!this.Q) {
            await this.initialize();
        }
        let I, g = 0;
        const valuesArray = Object.values(input.puzzleSolverInput);
        input.puzzleSolverInput = Buffer.from(valuesArray);

        for (let C = 0; C < 256; C++) {
            input.puzzleSolverInput[123] = C;
            const [t, B] = this.Q(input.puzzleSolverInput, input.threshold);
            if (0 !== B.length) {
                I = t;
                break;
            }
            console.warn("FC: Internal error or no solution found"),
                g += Math.pow(2, 32) - 1;
        }
        g += new DataView(I.slice(-4).buffer).getUint32(0, !0);
        return {
            type: "done",
            solution: Buffer.from(I.slice(-8)).toString('base64'),
            h: g,
            puzzleIndex: input.puzzleIndex,
            puzzleNumber: input.puzzleNumber
        }
    }
}

const base64string = fs.readFileSync('./wasm.txt', 'utf8');
const solver = new WasmSolver(base64string);

parentPort.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === "kill") {
        process.exit(0);
    }

    // We need to load puzzleSolverInput as a Uint8Array
    data.puzzleSolverInput =  Uint8Array.from(Buffer.from(data.puzzleSolverInput, 'base64'));
    solver.solve(data).then((res) => {
        parentPort.postMessage(JSON.stringify(res));
    });
});

