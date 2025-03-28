// Import the bs58 library for Base58 encoding
import bs58 from "bs58";

// Define a byte array
const byteArray = [
    155, 39, 151, 140, 221, 135, 61, 190, 217, 91, 118, 52, 31, 230, 158, 177,
    12, 83, 125, 252, 6, 107, 246, 248, 88, 67, 180, 116, 212, 23, 50, 241
];

// Convert the byte array to a Buffer and encode it to Base58
const base58String = bs58.encode(Buffer.from(byteArray));

// Log the encoded Base58 string
console.log("Encoded Base58 String:", base58String);
