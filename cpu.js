const {isRegister} = require("./utils");

class Cpu {
    r1;
    r2;
    r3;
    r4;
    r5;
    r6;
    r7;
    r8;
    r9;
    r10;
    flag;

    getVal(arg) {
        if(isRegister(arg))
            return this[arg];
        else return arg;
    }

    mov (dest, source) {
        this[dest] = this.getVal(source)
    }

    add (arg1, arg2) {
        this[arg1] = this[arg1] + this.getVal(arg2);
    }

    sub (arg1, arg2) {
        this[arg1] = this[arg1] - this.getVal(arg2)
    }

    mul (arg1, arg2) {
        this[arg1] = this[arg1] * this.getVal(arg2)
    }

    dif (arg1, arg2) {
        this[arg1] = this[arg1] / this.getVal(arg2)
    }

    and (arg1, arg2) {
        this[arg1] = this[arg1] & this.getVal(arg2);
    }

    or (arg1, arg2) {
        this[arg1] = this[arg1] | this.getVal(arg2);
    }

    xor (arg1, arg2) {
        this[arg1] = this[arg1] ^ this.getVal(arg2);
    }

    not (arg1) {
        this[arg1] = ~this[arg1];
    }

    cmp (arg1, arg2) {
        let val1 = this.getVal(arg1);
        let val2 = this.getVal(arg2);

        if (val1 > val2) this.flag = 1;
        else if (val1 < val2) this.flag = -1;
        else this.flag = 0;
    }

    jmp (label) {
        return label;
    }

    jl (label) {
        return this.flag === -1 ? label : undefined;
    }

    jle (label) {
        return this.flag === -1 || this.flag === 0 ? label : undefined;
    }

    jg (label) {
        return this.flag === 1 ? label : undefined;
    }

    jge (label) {
        return this.flag === 1 || this.flag === 0 ? label : undefined;
    }

    je (label) {
        return this.flag === 0 ? label : undefined;
    }
}

module.exports = Cpu;
