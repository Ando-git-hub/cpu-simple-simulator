module.exports.parser = function (text) {
    const instructions = []
    let lineNumber = 1;

    while (text.length) {
        let instruction = {
            name: undefined,
            arguments: [],
        }
        let firstLine = text.slice(0, text.indexOf('\n'));

        if(firstLine[0] === 'L' &&  firstLine.includes(':')) {
            instruction.label = firstLine;
        } else  {
            let indexOfFirstSpace = text.indexOf(' ');
            instruction.name = firstLine.slice(0, indexOfFirstSpace)
            if(!instructionsList.hasOwnProperty(instruction.name))
                throw new Error('Invalid instruction name - ' + instruction.name)
            let t = firstLine.slice(indexOfFirstSpace, firstLine.length);

            let indexOfArg = 0;
            while (t.length) {
                let indexOfComma = t.indexOf(',');
                if(indexOfComma === -1) indexOfComma = t.length;
                let arg = t.slice(0, indexOfComma).trim();
                let instructionOptions = instructionsList[instruction.name]
                if(Array.isArray(instructionOptions.requireRegister)) {
                    if(!isRegister(arg)) {
                        if(instructionOptions.requireRegister[indexOfArg])
                            throw new Error(`Line- ${lineNumber}: Argument number -'${indexOfArg}' for instruction '${instruction.name}' must be register`)

                        else if( instructionOptions.requireNumber[indexOfArg]) {
                            if(Number.isNaN(Number(arg)))
                            throw new Error(`Line- ${lineNumber}: Argument number -'${indexOfArg}' for instruction '${instruction.name}' must be number`)
                            else arg = Number(arg)
                        }
                    }
                }
                instruction.arguments.push(arg);
                t = t.slice(indexOfComma+1)
                indexOfArg++;
            }
        }

        instructions.push(instruction);
        text = text.slice(firstLine.length+1);
        lineNumber++;
    }

    return instructions;
}

module.exports.isRegister = isRegister = function (arg) {
    return typeof arg === 'string' && arg[0]==='r'
}

const instructionsList = {
    mov: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    } ,
    add: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    },
    mul: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    },
    dif: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    },
    cmp: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    },
    and: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    },
    or: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    },
    xor: {
        requireRegister: [true, false],
        requireNumber: [true, true]
    },
    not: {
        requireRegister: [true],
        requireNumber: [true]
    },
    jmp: {requireRegister: [], requireNumber: []},
    jl: {requireRegister: [], requireNumber: []},
    jle: {requireRegister: [], requireNumber: []},
    jg: {requireRegister: [], requireNumber: []},
    jge: {requireRegister: [], requireNumber: []},
    je: {requireRegister: [], requireNumber: []},
}
