!function() {
    "use strict";
    const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
      , I = "=".charCodeAt(0)
      , g = new Uint8Array(256);
    for (let I = 0; I < A.length; I++)
        g[A.charCodeAt(I)] = I;
    function C(A) {
        const I = {}
          , g = A.exports
          , C = g.memory
          , Q = g.__alloc
          , t = g.__retain
          , B = g.__rtti_base || -1;
        return I.__allocArray = (A,I)=>{
            const g = function(A) {
                return new Uint32Array(C.buffer)[(B + 4 >>> 2) + 2 * A]
            }(A)
              , e = 31 - Math.clz32(g >>> 6 & 31)
              , o = I.length
              , i = Q(o << e, 0)
              , r = Q(12, A)
              , n = new Uint32Array(C.buffer);
            n[r + 0 >>> 2] = t(i),
            n[r + 4 >>> 2] = i,
            n[r + 8 >>> 2] = o << e;
            const E = C.buffer
              , s = new Uint8Array(E);
            if (16384 & g)
                for (let A = 0; A < o; ++A)
                    s[(i >>> e) + A] = t(I[A]);
            else
                s.set(I, i >>> e);
            return r
        }
        ,
        I.__getUint8Array = A=>{
            const I = new Uint32Array(C.buffer)
              , g = I[A + 4 >>> 2];
            return new Uint8Array(C.buffer,g,I[g - 4 >>> 2] >>> 0)
        }
        ,
        function(A, I={}) {
            const g = A.__argumentsLength ? I=>{
                A.__argumentsLength.value = I
            }
            : A.__setArgumentsLength || A.__setargc || (()=>({}));
            for (const C in A) {
                if (!Object.prototype.hasOwnProperty.call(A, C))
                    continue;
                const Q = A[C]
                  , t = C.split(".")[0];
                "function" == typeof Q && Q !== g ? (I[t] = (...A)=>(g(A.length),
                Q(...A))).original = Q : I[t] = Q
            }
            return I
        }(g, I)
    }
    class Q {
        constructor(A) {
            this.b = new Uint8Array(128),
            this.h = new Uint32Array(16),
            this.t = 0,
            this.c = 0,
            this.v = new Uint32Array(32),
            this.m = new Uint32Array(32),
            this.outlen = A
        }
    }
    function t(A, I) {
        return A[I] ^ A[I + 1] << 8 ^ A[I + 2] << 16 ^ A[I + 3] << 24
    }
    function B(A, I, g, C, Q, t, B, e) {
        const o = I[B]
          , i = I[B + 1]
          , r = I[e]
          , n = I[e + 1];
        let E, s, w, c, a = A[g], D = A[g + 1], h = A[C], f = A[C + 1], y = A[Q], l = A[Q + 1], u = A[t], N = A[t + 1];
        E = a + h,
        s = (a & h | (a | h) & ~E) >>> 31,
        a = E,
        D = D + f + s,
        E = a + o,
        s = (a & o | (a | o) & ~E) >>> 31,
        a = E,
        D = D + i + s,
        w = u ^ a,
        c = N ^ D,
        u = c,
        N = w,
        E = y + u,
        s = (y & u | (y | u) & ~E) >>> 31,
        y = E,
        l = l + N + s,
        w = h ^ y,
        c = f ^ l,
        h = w >>> 24 ^ c << 8,
        f = c >>> 24 ^ w << 8,
        E = a + h,
        s = (a & h | (a | h) & ~E) >>> 31,
        a = E,
        D = D + f + s,
        E = a + r,
        s = (a & r | (a | r) & ~E) >>> 31,
        a = E,
        D = D + n + s,
        w = u ^ a,
        c = N ^ D,
        u = w >>> 16 ^ c << 16,
        N = c >>> 16 ^ w << 16,
        E = y + u,
        s = (y & u | (y | u) & ~E) >>> 31,
        y = E,
        l = l + N + s,
        w = h ^ y,
        c = f ^ l,
        h = c >>> 31 ^ w << 1,
        f = w >>> 31 ^ c << 1,
        A[g] = a,
        A[g + 1] = D,
        A[C] = h,
        A[C + 1] = f,
        A[Q] = y,
        A[Q + 1] = l,
        A[t] = u,
        A[t + 1] = N
    }
    const e = [4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225]
      , o = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 28, 20, 8, 16, 18, 30, 26, 12, 2, 24, 0, 4, 22, 14, 10, 6, 22, 16, 24, 0, 10, 4, 30, 26, 20, 28, 6, 12, 14, 2, 18, 8, 14, 18, 6, 2, 26, 24, 22, 28, 4, 12, 10, 20, 8, 0, 30, 16, 18, 0, 10, 14, 4, 8, 20, 30, 28, 2, 22, 24, 12, 16, 6, 26, 4, 24, 12, 20, 0, 22, 16, 6, 8, 26, 14, 10, 30, 28, 2, 18, 24, 10, 2, 30, 28, 26, 8, 20, 0, 14, 12, 6, 18, 4, 16, 22, 26, 22, 14, 28, 24, 2, 6, 18, 10, 0, 30, 8, 16, 12, 4, 20, 12, 30, 28, 18, 22, 6, 0, 16, 24, 4, 26, 14, 2, 8, 20, 10, 20, 4, 16, 8, 14, 12, 2, 10, 30, 22, 18, 28, 6, 24, 26, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 28, 20, 8, 16, 18, 30, 26, 12, 2, 24, 0, 4, 22, 14, 10, 6];
    function i(A, I) {
        const g = A.v
          , C = A.m;
        for (let I = 0; I < 16; I++)
            g[I] = A.h[I],
            g[I + 16] = e[I];
        g[24] = g[24] ^ A.t,
        g[25] = g[25] ^ A.t / 4294967296,
        I && (g[28] = ~g[28],
        g[29] = ~g[29]);
        for (let I = 0; I < 32; I++)
            C[I] = t(A.b, 4 * I);
        for (let A = 0; A < 12; A++)
            B(g, C, 0, 8, 16, 24, o[16 * A + 0], o[16 * A + 1]),
            B(g, C, 2, 10, 18, 26, o[16 * A + 2], o[16 * A + 3]),
            B(g, C, 4, 12, 20, 28, o[16 * A + 4], o[16 * A + 5]),
            B(g, C, 6, 14, 22, 30, o[16 * A + 6], o[16 * A + 7]),
            B(g, C, 0, 10, 20, 30, o[16 * A + 8], o[16 * A + 9]),
            B(g, C, 2, 12, 22, 24, o[16 * A + 10], o[16 * A + 11]),
            B(g, C, 4, 14, 16, 26, o[16 * A + 12], o[16 * A + 13]),
            B(g, C, 6, 8, 18, 28, o[16 * A + 14], o[16 * A + 15]);
        for (let I = 0; I < 16; I++)
            A.h[I] = A.h[I] ^ g[I] ^ g[I + 16]
    }
    function r(A, I) {
        for (let I = 0; I < 16; I++)
            A.h[I] = e[I];
        A.b.set(I),
        A.h[0] ^= 16842752 ^ A.outlen
    }
    async function n() {
        return (A,I,g=4294967295)=>{
            const C = function(A, I, g) {
                if (128 != A.length)
                    throw Error("Invalid input");
                const C = A.buffer
                  , t = new DataView(C)
                  , B = new Q(32);
                B.t = 128;
                const e = t.getUint32(124, !0)
                  , o = e + g;
                for (let g = e; g < o; g++)
                    if (t.setUint32(124, g, !0),
                    r(B, A),
                    i(B, !0),
                    B.h[0] < I)
                        return 0 == ASC_TARGET ? new Uint8Array(B.h.buffer) : Uint8Array.wrap(B.h.buffer);
                return new Uint8Array(0)
            }(A, I, g);
            return [A, C]
        }
    }
    let E, s;
    Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
        value: function(A, I) {
            return new Uint8Array(Array.prototype.slice.call(this, A, I))
        }
    }),
    self.ASC_TARGET = 0;
    const w = new Promise((A=>s = A));
    self.onerror = A=>{
        self.postMessage({
            type: "error",
            message: JSON.stringify(A)
        })
    }
    ,
    self.onmessage = async A=>{
        const Q = A.data;
        try {
            if ("solver" === Q.type) {
                if (Q.forceJS) {
                    E = 1;
                    const A = await n();
                    s(A)
                } else
                    try {
                        E = 2;
                        const A = WebAssembly.compile(function(A) {
                            const C = A.length;
                            let Q = 3 * C >>> 2;
                            A.charCodeAt(C - 1) === I && Q--,
                            A.charCodeAt(C - 2) === I && Q--;
                            const t = new Uint8Array(Q);
                            for (let I = 0, Q = 0; I < C; I += 4) {
                                const C = g[A.charCodeAt(I + 0)]
                                  , B = g[A.charCodeAt(I + 1)]
                                  , e = g[A.charCodeAt(I + 2)]
                                  , o = g[A.charCodeAt(I + 3)];
                                t[Q++] = C << 2 | B >> 4,
                                t[Q++] = (15 & B) << 4 | e >> 2,
                                t[Q++] = (3 & e) << 6 | 63 & o
                            }
                            return t
                        }("AGFzbQEAAAABKghgAABgAn9/AGADf39/AX9gAX8AYAR/f39/AGAAAX9gAX8Bf2ACf38BfwINAQNlbnYFYWJvcnQABAMMCwcGAwAAAQIFAQIABQMBAAEGFgR/AUEAC38BQQALfwBBAwt/AEHgDAsHbgkGbWVtb3J5AgAHX19hbGxvYwABCF9fcmV0YWluAAIJX19yZWxlYXNlAAMJX19jb2xsZWN0AAQHX19yZXNldAAFC19fcnR0aV9iYXNlAwMNVWludDhBcnJheV9JRAMCDHNvbHZlQmxha2UyYgAKCAELCvQSC5IBAQV/IABB8P///wNLBEAACyMBQRBqIgQgAEEPakFwcSICQRAgAkEQSxsiBmoiAj8AIgVBEHQiA0sEQCAFIAIgA2tB//8DakGAgHxxQRB2IgMgBSADShtAAEEASARAIANAAEEASARAAAsLCyACJAEgBEEQayICIAY2AgAgAkEBNgIEIAIgATYCCCACIAA2AgwgBAsEACAACwMAAQsDAAELBgAjACQBC7sCAQF/AkAgAUUNACAAQQA6AAAgACABakEEayICQQA6AAMgAUECTQ0AIABBADoAASAAQQA6AAIgAkEAOgACIAJBADoAASABQQZNDQAgAEEAOgADIAJBADoAACABQQhNDQAgAEEAIABrQQNxIgJqIgBBADYCACAAIAEgAmtBfHEiAmpBHGsiAUEANgIYIAJBCE0NACAAQQA2AgQgAEEANgIIIAFBADYCECABQQA2AhQgAkEYTQ0AIABBADYCDCAAQQA2AhAgAEEANgIUIABBADYCGCABQQA2AgAgAUEANgIEIAFBADYCCCABQQA2AgwgACAAQQRxQRhqIgFqIQAgAiABayEBA0AgAUEgTwRAIABCADcDACAAQgA3AwggAEIANwMQIABCADcDGCABQSBrIQEgAEEgaiEADAELCwsLcgACfyAARQRAQQxBAhABIQALIAALQQA2AgAgAEEANgIEIABBADYCCCABQfD///8DIAJ2SwRAQcAKQfAKQRJBORAAAAsgASACdCIBQQAQASICIAEQBiAAKAIAGiAAIAI2AgAgACACNgIEIAAgATYCCCAAC88BAQJ/QaABQQAQASIAQQxBAxABQYABQQAQBzYCACAAQQxBBBABQQhBAxAHNgIEIABCADcDCCAAQQA2AhAgAEIANwMYIABCADcDICAAQgA3AyggAEIANwMwIABCADcDOCAAQgA3A0AgAEIANwNIIABCADcDUCAAQgA3A1ggAEIANwNgIABCADcDaCAAQgA3A3AgAEIANwN4IABCADcDgAEgAEIANwOIASAAQgA3A5ABQYABQQUQASIBQYABEAYgACABNgKYASAAQSA2ApwBIAAL2AkCA38SfiAAKAIEIQIgACgCmAEhAwNAIARBgAFIBEAgAyAEaiABIARqKQMANwMAIARBCGohBAwBCwsgAigCBCkDACEMIAIoAgQpAwghDSACKAIEKQMQIQ4gAigCBCkDGCEPIAIoAgQpAyAhBSACKAIEKQMoIQsgAigCBCkDMCEGIAIoAgQpAzghB0KIkvOd/8z5hOoAIQhCu86qptjQ67O7fyEJQqvw0/Sv7ry3PCEQQvHt9Pilp/2npX8hCiAAKQMIQtGFmu/6z5SH0QCFIRFCn9j52cKR2oKbfyESQpSF+aXAyom+YCETQvnC+JuRo7Pw2wAhFEEAIQQDQCAEQcABSARAIAUgCCARIAwgBSADIARBgAhqIgEtAABBA3RqKQMAfHwiBYVCIIoiDHwiCIVCGIoiESAIIAwgBSARIAMgAS0AAUEDdGopAwB8fCIMhUIQiiIIfCIVhUI/iiEFIAsgCSASIA0gCyADIAEtAAJBA3RqKQMAfHwiDYVCIIoiCXwiEYVCGIohCyAGIBAgEyAOIAYgAyABLQAEQQN0aikDAHx8IgaFQiCKIg58IhCFQhiKIhIgECAOIAYgEiADIAEtAAVBA3RqKQMAfHwiDoVCEIoiE3wiEIVCP4ohBiAHIAogFCAPIAcgAyABLQAGQQN0aikDAHx8IgeFQiCKIg98IgqFQhiKIhIgCiAPIAcgEiADIAEtAAdBA3RqKQMAfHwiD4VCEIoiCnwiEoVCP4ohByAQIAogDCARIAkgDSALIAMgAS0AA0EDdGopAwB8fCINhUIQiiIJfCIWIAuFQj+KIgwgAyABLQAIQQN0aikDAHx8IhCFQiCKIgp8IgsgECALIAyFQhiKIhEgAyABLQAJQQN0aikDAHx8IgwgCoVCEIoiFHwiECARhUI/iiELIAYgEiAIIA0gBiADIAEtAApBA3RqKQMAfHwiDYVCIIoiCHwiCoVCGIoiBiANIAYgAyABLQALQQN0aikDAHx8Ig0gCIVCEIoiESAKfCIKhUI/iiEGIAcgFSAJIA4gByADIAEtAAxBA3RqKQMAfHwiDoVCIIoiCHwiCYVCGIoiByAOIAcgAyABLQANQQN0aikDAHx8Ig4gCIVCEIoiEiAJfCIIhUI/iiEHIAUgFiATIA8gBSADIAEtAA5BA3RqKQMAfHwiD4VCIIoiCXwiFYVCGIoiBSAPIAUgAyABLQAPQQN0aikDAHx8Ig8gCYVCEIoiEyAVfCIJhUI/iiEFIARBEGohBAwBCwsgAigCBCACKAIEKQMAIAggDIWFNwMAIAIoAgQgAigCBCkDCCAJIA2FhTcDCCACKAIEIAIoAgQpAxAgDiAQhYU3AxAgAigCBCACKAIEKQMYIAogD4WFNwMYIAIoAgQgAigCBCkDICAFIBGFhTcDICACKAIEIAIoAgQpAyggCyAShYU3AyggAigCBCACKAIEKQMwIAYgE4WFNwMwIAIoAgQgAigCBCkDOCAHIBSFhTcDOCAAIAw3AxggACANNwMgIAAgDjcDKCAAIA83AzAgACAFNwM4IAAgCzcDQCAAIAY3A0ggACAHNwNQIAAgCDcDWCAAIAk3A2AgACAQNwNoIAAgCjcDcCAAIBE3A3ggACASNwOAASAAIBM3A4gBIAAgFDcDkAEL4QIBBH8gACgCCEGAAUcEQEHQCUGACkEeQQUQAAALIAAoAgAhBBAIIgMoAgQhBSADQoABNwMIIAQoAnwiACACaiEGA0AgACAGSQRAIAQgADYCfCADKAIEIgIoAgQgAygCnAGtQoiS95X/zPmE6gCFNwMAIAIoAgRCu86qptjQ67O7fzcDCCACKAIEQqvw0/Sv7ry3PDcDECACKAIEQvHt9Pilp/2npX83AxggAigCBELRhZrv+s+Uh9EANwMgIAIoAgRCn9j52cKR2oKbfzcDKCACKAIEQuv6htq/tfbBHzcDMCACKAIEQvnC+JuRo7Pw2wA3AzggAyAEEAkgBSgCBCkDAKcgAUkEQEEAIAUoAgAiAUEQaygCDCICSwRAQfALQbAMQc0NQQUQAAALQQxBAxABIgAgATYCACAAIAI2AgggACABNgIEIAAPCyAAQQFqIQAMAQsLQQxBAxABQQBBABAHCwwAQaANJABBoA0kAQsL+gQJAEGBCAu/AQECAwQFBgcICQoLDA0ODw4KBAgJDw0GAQwAAgsHBQMLCAwABQIPDQoOAwYHAQkEBwkDAQ0MCw4CBgUKBAAPCAkABQcCBAoPDgELDAYIAw0CDAYKAAsIAwQNBwUPDgEJDAUBDw4NBAoABwYDCQIICw0LBw4MAQMJBQAPBAgGAgoGDw4JCwMACAwCDQcBBAoFCgIIBAcGAQUPCwkOAwwNAAABAgMEBQYHCAkKCwwNDg8OCgQICQ8NBgEMAAILBwUDAEHACQspGgAAAAEAAAABAAAAGgAAAEkAbgB2AGEAbABpAGQAIABpAG4AcAB1AHQAQfAJCzEiAAAAAQAAAAEAAAAiAAAAcwByAGMALwBzAG8AbAB2AGUAcgBXAGEAcwBtAC4AdABzAEGwCgsrHAAAAAEAAAABAAAAHAAAAEkAbgB2AGEAbABpAGQAIABsAGUAbgBnAHQAaABB4AoLNSYAAAABAAAAAQAAACYAAAB+AGwAaQBiAC8AYQByAHIAYQB5AGIAdQBmAGYAZQByAC4AdABzAEGgCws1JgAAAAEAAAABAAAAJgAAAH4AbABpAGIALwBzAHQAYQB0AGkAYwBhAHIAcgBhAHkALgB0AHMAQeALCzMkAAAAAQAAAAEAAAAkAAAASQBuAGQAZQB4ACAAbwB1AHQAIABvAGYAIAByAGEAbgBnAGUAQaAMCzMkAAAAAQAAAAEAAAAkAAAAfgBsAGkAYgAvAHQAeQBwAGUAZABhAHIAcgBhAHkALgB0AHMAQeAMCy4GAAAAIAAAAAAAAAAgAAAAAAAAACAAAAAAAAAAYQAAAAIAAAAhAgAAAgAAACQC"))
                          , Q = await async function(A) {
                            const I = await async function(A) {
                                const I = {
                                    env: {
                                        abort() {
                                            throw Error("Wasm aborted")
                                        }
                                    }
                                };
                                return {
                                    exports: C(await WebAssembly.instantiate(A, I))
                                }
                            }(A)
                              , g = I.exports.__retain(I.exports.__allocArray(I.exports.Uint8Array_ID, new Uint8Array(128)));
                            let Q = I.exports.__getUint8Array(g);
                            return (A,C,t=4294967295)=>{
                                Q.set(A);
                                const B = I.exports.solveBlake2b(g, C, t);
                                Q = I.exports.__getUint8Array(g);
                                const e = I.exports.__getUint8Array(B);
                                return I.exports.__release(B),
                                [Q, e]
                            }
                        }(await A);
                        s(Q)
                    } catch (A) {
                        console.log("FriendlyCaptcha failed to initialize WebAssembly, falling back to Javascript solver: " + A.toString()),
                        E = 1;
                        const I = await n();
                        s(I)
                    }
                self.postMessage({
                    type: "ready",
                    solver: E
                })
            } else if ("start" === Q.type) {
                const A = await w;
                self.postMessage({
                    type: "started"
                });
                let I, g = 0;
                for (let C = 0; C < 256; C++) {
                    Q.puzzleSolverInput[123] = C;
                    const [t,B] = A(Q.puzzleSolverInput, Q.threshold);
                    if (0 !== B.length) {
                        I = t;
                        break
                    }
                    console.warn("FC: Internal error or no solution found"),
                    g += Math.pow(2, 32) - 1
                }
                g += new DataView(I.slice(-4).buffer).getUint32(0, !0),
                self.postMessage({
                    type: "done",
                    solution: I.slice(-8),
                    h: g,
                    puzzleIndex: Q.puzzleIndex,
                    puzzleNumber: Q.puzzleNumber
                })
            }
        } catch (A) {
            setTimeout((()=>{
                throw A
            }
            ))
        }
    }
}();
