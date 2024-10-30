import { Address } from '@ton/core';

const a = Address.parse('EQD8-w0lY9Rpg-6VqpicGsspuiSkaSTjQMXl1vNLnKUGUJoP');
const b = Address.parse('kQD8-w0lY9Rpg-6VqpicGsspuiSkaSTjQMXl1vNLnKUGUCGF');

console.log(a.toRawString() == b.toRawString());
