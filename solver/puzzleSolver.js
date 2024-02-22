const { Worker } = require('worker_threads');

class PuzzleSolver {
    constructor(puzzleInput, debug = false) {
        this.puzzleData = this.parsePuzzle(puzzleInput);
        this.workers = new Array(this.puzzleData.n);
        this.puzzleSolverInputs = this.createPuzzleSolverInputs(this.puzzleData.buffer, this.puzzleData.n);
        this.solutionBuffer = new Uint8Array(8 * this.puzzleData.n);
        this.debug = debug;
        this.puzzleIndex = 0;
        this.progress = 0;
        this.totalHashes = 0;
        this.startTime = Date.now();
    }

    static base64Table() {
        const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        const a = new Uint8Array(256);
        for (let t = 0; t < o.length; t++) a[o.charCodeAt(t)] = t;
        return { o, a };
    }

    static u(t, e) {
        const r = new Uint8Array(3),
            i = new DataView(r.buffer);
        i.setUint8(0, t);
        i.setUint16(1, e);
        return r;
    }

    static s(t) {
        const { o } = PuzzleSolver.base64Table();
        const e = t.length;
        let r = "";
        for (let i = 0; i < e; i += 3) {
            const e = t[i + 0],
                n = t[i + 1],
                a = t[i + 2];
            let s = "";
            s += o.charAt(e >>> 2);
            s += o.charAt((3 & e) << 4 | n >>> 4);
            s += o.charAt((15 & n) << 2 | a >>> 6);
            s += o.charAt(63 & a);
            r += s;
        }
        return e % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : e % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="),
            r;
    }

    parsePuzzle(t) {
        const e = t.split(".");
        const r = e[1];
        const { a, o } = PuzzleSolver.base64Table();
        const n = "=".charCodeAt(0);
        const i = (() => {
            const e = r.length;
            let t = 3 * e >>> 2;
            r.charCodeAt(e - 1) === n && t--;
            r.charCodeAt(e - 2) === n && t--;
            const i = new Uint8Array(t);
            for (let t = 0, o = 0; t < e; t += 4) {
                const e = a[r.charCodeAt(t + 0)];
                const n = a[r.charCodeAt(t + 1)];
                const s = a[r.charCodeAt(t + 2)];
                const A = a[r.charCodeAt(t + 3)];
                i[o++] = e << 2 | n >> 4;
                i[o++] = (15 & n) << 4 | s >> 2;
                i[o++] = (3 & s) << 6 | 63 & A;
            }
            return i;
        })();
        return {
            signature: e[0],
            base64: r,
            buffer: i,
            n: i[14],
            threshold: Math.pow(2, (255.999 - i[15]) / 8) >>> 0,
            expiry: 3e5 * i[13]
        };
    }

    createPuzzleSolverInputs(t, e) {
        const r = [];
        for (let i = 0; i < e; i++) {
            const e = new Uint8Array(128);
            e.set(t);
            e[120] = i;
            r.push(e);
        }
        return r;
    }

    solve() {
        return new Promise(async (resolve, reject) => {
            for (let t = 0; t < this.workers.length && this.puzzleIndex !== this.puzzleSolverInputs.length; t++) {
                this.workers[t] = new Worker('./worker.js');
                this.workers[t].postMessage(JSON.stringify({
                    type: "start",
                    puzzleSolverInput: Buffer.from(this.puzzleSolverInputs[t]).toString('base64'),
                    threshold: this.puzzleData.threshold,
                    puzzleIndex: this.puzzleIndex,
                    puzzleNumber: this.puzzleData.n
                }));
                this.puzzleIndex++;
            }
            await this.attachWorkerListeners(resolve, reject);
        });
    }
    

    async attachWorkerListeners(resolve, reject) {
        for (let e = 0; e < this.workers.length; e++) {
            if (this.workers[e]) {
                this.workers[e].on('message', (t) => {
                    const r = JSON.parse(t);
                    r.solution = Uint8Array.from(Buffer.from(r.solution, 'base64'));
                    if (r.puzzleNumber !== this.puzzleData.n) return;
                    if (this.puzzleIndex < this.puzzleSolverInputs.length) {
                        this.workers[e].postMessage(JSON.stringify({
                            type: "start",
                            puzzleSolverInput: Buffer.from(this.puzzleSolverInputs[this.puzzleIndex]).toString('base64'),
                            threshold: this.puzzleData.threshold,
                            puzzleIndex: this.puzzleIndex,
                            puzzleNumber: this.puzzleData.n
                        }));
                        this.puzzleIndex++;
                    }
                    this.progress++;
                    this.totalHashes += r.h;
                    // Percentage solving calulcatiuon, if is somthing u need
                    // ((this.progress + 1) / this.puzzleData.n).toFixed(2) + "%");
                    this.solutionBuffer.set(r.solution, 8 * r.puzzleIndex);
                    if (this.progress == this.puzzleData.n) {
                        const solverType = 1; // is wasm
                        const end_time = Date.now();
                        const t = (end_time - this.startTime) / 1e3;
                        // kill all workers
                        for (let e = 0; e < this.workers.length; e++) {
                            if (this.workers[e]) {
                                this.workers[e].postMessage(JSON.stringify({
                                    type: "kill"
                                }));
                            }
                        }
                        const solution = `${this.puzzleData.signature}.${this.puzzleData.base64}.${PuzzleSolver.s(this.solutionBuffer)}.${PuzzleSolver.s(PuzzleSolver.u(solverType, t))}`
                        resolve(this.debug ? {
                            "puzzle": this.puzzleData.base64,
                            "solution": solution,
                            "startTime": this.startTime,
                            "endTime": end_time,
                            "ellapsed": t,
                        } : solution);
                    }
                });
            }
        }
    }
}

module.exports = PuzzleSolver;