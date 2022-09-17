const {readFileSync} = require('fs');
const Cpu = require('./cpu');
const { parser } = require('./utils')
const fileContent = readFileSync('./commandsFile.txt');

const parsedInstructions = parser(fileContent.toString())
let cpu = new Cpu();


for (let i = 0; i < parsedInstructions.length; i++) {
    const currentInstruction = parsedInstructions[i];
    if(!currentInstruction.label) {
       let label = cpu[currentInstruction.name](...currentInstruction.arguments);
       if(label) {
           let index = parsedInstructions.findIndex(el => el.label === label)
           if( index === -1) throw new Error(`Invalid label - ${label}`)
           else i = index;
       }
    }

}

console.log('Cpu final result ', cpu)
