import { Builder, Address } from "@ton/core";

const addr = Address.parse('0QDXNWWA7j9aUh87o5wVf_5seIoPaYjXvqeJVgQofzLbXUHr');

let tail = new Builder().storeAddress(addr).asCell();

for (let i = 0; i < 4; ++i) {
  tail = new Builder().storeAddress(addr).storeRef(tail).asCell();
}

export default tail;
