import bs58 from "bs58";

const byteArray = [155,
    39,
    151,
    140,
    221,
    135,
    61,
    190,
    217,
    91,
    118,
    52,
    31,
    230,
    158,
    177,
    12,
    83,
    125,
    252,
    6,
    107,
    246,
    248,
    88,
    67,
    180,
    116,
    212,
    23,
    50,
    241
];



let latter = `



`

const base58String = bs58.encode(Buffer.from(byteArray));
console.log(base58String);
// console.log(latter)