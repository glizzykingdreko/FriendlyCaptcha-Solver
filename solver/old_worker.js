
const { parentPort } = require('worker_threads');

// Definition of some variables and functions that are used in the solver
const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const g = new Uint8Array(256);
for (let I = 0; I < A.length; I++) g[A.charCodeAt(I)] = I;

class Q {
    constructor(A) {
        this.b = new Uint8Array(128), this.h = new Uint32Array(16), this.t = 0, this.c = 0, this.v = new Uint32Array(32), this.m = new Uint32Array(32), this.outlen = A
    }
}

function t(A, I) {
    return A[I] ^ A[I + 1] << 8 ^ A[I + 2] << 16 ^ A[I + 3] << 24
}

function B(A, I, g, C, Q, t, B, e) {
    const o = I[B],
        i = I[B + 1],
        r = I[e],
        n = I[e + 1];
    let E, s, w, c, a = A[g],
        D = A[g + 1],
        h = A[C],
        f = A[C + 1],
        y = A[Q],
        l = A[Q + 1],
        u = A[t],
        N = A[t + 1];
    E = a + h, s = (a & h | (a | h) & ~E) >>> 31, a = E, D = D + f + s, E = a + o, s = (a & o | (a | o) & ~E) >>> 31, a = E, D = D + i + s, w = u ^ a, c = N ^ D, u = c, N = w, E = y + u, s = (y & u | (y | u) & ~E) >>> 31, y = E, l = l + N + s, w = h ^ y, c = f ^ l, h = w >>> 24 ^ c << 8, f = c >>> 24 ^ w << 8, E = a + h, s = (a & h | (a | h) & ~E) >>> 31, a = E, D = D + f + s, E = a + r, s = (a & r | (a | r) & ~E) >>> 31, a = E, D = D + n + s, w = u ^ a, c = N ^ D, u = w >>> 16 ^ c << 16, N = c >>> 16 ^ w << 16, E = y + u, s = (y & u | (y | u) & ~E) >>> 31, y = E, l = l + N + s, w = h ^ y, c = f ^ l, h = c >>> 31 ^ w << 1, f = w >>> 31 ^ c << 1, A[g] = a, A[g + 1] = D, A[C] = h, A[C + 1] = f, A[Q] = y, A[Q + 1] = l, A[t] = u, A[t + 1] = N
}
const e = [4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225],
    o = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 28, 20, 8, 16, 18, 30, 26, 12, 2, 24, 0, 4, 22, 14, 10, 6, 22, 16, 24, 0, 10, 4, 30, 26, 20, 28, 6, 12, 14, 2, 18, 8, 14, 18, 6, 2, 26, 24, 22, 28, 4, 12, 10, 20, 8, 0, 30, 16, 18, 0, 10, 14, 4, 8, 20, 30, 28, 2, 22, 24, 12, 16, 6, 26, 4, 24, 12, 20, 0, 22, 16, 6, 8, 26, 14, 10, 30, 28, 2, 18, 24, 10, 2, 30, 28, 26, 8, 20, 0, 14, 12, 6, 18, 4, 16, 22, 26, 22, 14, 28, 24, 2, 6, 18, 10, 0, 30, 8, 16, 12, 4, 20, 12, 30, 28, 18, 22, 6, 0, 16, 24, 4, 26, 14, 2, 8, 20, 10, 20, 4, 16, 8, 14, 12, 2, 10, 30, 22, 18, 28, 6, 24, 26, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 28, 20, 8, 16, 18, 30, 26, 12, 2, 24, 0, 4, 22, 14, 10, 6];

function i(A, I) {
    const g = A.v,
        C = A.m;
    for (let I = 0; I < 16; I++) g[I] = A.h[I], g[I + 16] = e[I];
    g[24] = g[24] ^ A.t, g[25] = g[25] ^ A.t / 4294967296, I && (g[28] = ~g[28], g[29] = ~g[29]);
    for (let I = 0; I < 32; I++) C[I] = t(A.b, 4 * I);
    for (let A = 0; A < 12; A++) B(g, C, 0, 8, 16, 24, o[16 * A + 0], o[16 * A + 1]), B(g, C, 2, 10, 18, 26, o[16 * A + 2], o[16 * A + 3]), B(g, C, 4, 12, 20, 28, o[16 * A + 4], o[16 * A + 5]), B(g, C, 6, 14, 22, 30, o[16 * A + 6], o[16 * A + 7]), B(g, C, 0, 10, 20, 30, o[16 * A + 8], o[16 * A + 9]), B(g, C, 2, 12, 22, 24, o[16 * A + 10], o[16 * A + 11]), B(g, C, 4, 14, 16, 26, o[16 * A + 12], o[16 * A + 13]), B(g, C, 6, 8, 18, 28, o[16 * A + 14], o[16 * A + 15]);
    for (let I = 0; I < 16; I++) A.h[I] = A.h[I] ^ g[I] ^ g[I + 16]
}

function r(A, I) {
    for (let I = 0; I < 16; I++) A.h[I] = e[I];
    A.b.set(I), A.h[0] ^= 16842752 ^ A.outlen
}
function n() {
    return (A, I, g = 4294967295) => {
        const C = function (A, I, g) {
            if (128 != A.length) throw Error("Invalid input");
            const C = A.buffer,
                t = new DataView(C),
                B = new Q(32);
            B.t = 128;
            const e = t.getUint32(124, !0),
                o = e + g;
            for (let g = e; g < o; g++)
                if (t.setUint32(124, g, !0), r(B, A), i(B, !0), B.h[0] < I) return 0 == ASC_TARGET ? new Uint8Array(B.h.buffer) : Uint8Array.wrap(B.h.buffer);
            return new Uint8Array(0)
        }(A, I, g);
        return [A, C]
    }
}
Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
    value: function (A, I) {
        return new Uint8Array(Array.prototype.slice.call(this, A, I))
    }
}), global.ASC_TARGET = 0;

const solver = n()


parentPort.on('message', (message) => {
    const Q = JSON.parse(message);

    if (Q.type === "kill") {
        process.exit(0);
    }
    // We need to load puzzleSolverInput as a Uint8Array
    Q.puzzleSolverInput =  Uint8Array.from(Buffer.from(Q.puzzleSolverInput, 'base64'));
    ;

    let I2, g2 = 0;
    for (let C = 0; C < 256; C++) {
        Q.puzzleSolverInput[123] = C;
        const [t, B] = solver(Q.puzzleSolverInput, Q.threshold); 
        if (0 !== B.length) {
            I2 = t;
            break;
        }
        console.warn("FC: Internal error or no solution found");
        g2 += Math.pow(2, 32) - 1;
    }
    g2 += new DataView(I2.slice(-4).buffer).getUint32(0, !0);
    // console.log("Worker has done")
    parentPort.postMessage(JSON.stringify({
        type: "done",
        solution: Buffer.from(I2.slice(-8)).toString('base64'),
        h: g2,
        puzzleIndex: Q.puzzleIndex,
        puzzleNumber: Q.puzzleNumber
    }));
});