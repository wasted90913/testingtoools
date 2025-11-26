// MOCK IMPLEMENTATION
// This file does not perform real cryptography. It simulates the transformations
// for UI/UX purposes as requested in the app proposal.

/**
 * Mock AES Decryption (Base64 -> Plaintext JSON)
 * Simulates decrypting a Base64 encoded string back to a pretty-printed JSON string.
 * @param base64Cipher - The input Base64 string.
 * @returns A pretty-printed JSON string or an error object string.
 */
export const decryptAes = (base64Cipher: string): string => {
  if (!base64Cipher) return '';
  try {
    const jsonString = atob(base64Cipher);
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2); // Pretty print
  } catch (error) {
    return JSON.stringify({ error: "Decryption failed. Invalid Base64 or not a valid JSON payload." }, null, 2);
  }
};

/**
 * Mock AES Encryption (Plaintext JSON -> Base64)
 * Simulates encrypting a JSON payload into a Base64 encoded string.
 * @param jsonPayload - A string containing the JSON payload.
 * @returns A Base64 encoded string or an error message.
 */
export const encryptAes = (jsonPayload: string): string => {
  if (!jsonPayload) return '';
  try {
    const parsed = JSON.parse(jsonPayload);
    const compactJsonString = JSON.stringify(parsed);
    return btoa(compactJsonString);
  } catch (error) {
    return "Encryption failed. Invalid JSON object.";
  }
};

// Mock Custom URL Encoding/Decoding based on a simple substitution cipher.

const substitutionMap: { [key: string]: string } = {
  '{': '!', '"': '~', '}': '#', ':': '$', ',': '%', '[': '^', ']': '&',
  'a': 'z', 'b': 'y', 'c': 'x', 'd': 'w', 'e': 'v', 'f': 'u', 'g': 't', 'h': 's',
  'i': 'r', 'j': 'q', 'k': 'p', 'l': 'o', 'm': 'n',
  'o': 'l', 'p': 'k', 'q': 'j', 'r': 'i', 's': 'h', 't': 'g', 'u': 'f', 'v': 'e',
  'w': 'd', 'x': 'c', 'y': 'b', 'z': 'a',
  '0': '9', '1': '8', '2': '7', '3': '6', '4': '5',
  '5': '4', '6': '3', '7': '2', '8': '1', '9': '0'
};

const reverseSubstitutionMap = Object.fromEntries(Object.entries(substitutionMap).map(([k, v]) => [v, k]));

const transform = (str: string, map: { [key: string]: string }): string => {
  return str.split('').map(char => map[char] || char).join('');
};

/**
 * Simulates encoding a JSON object into a weakly protected string for URL parameters.
 * @param jsonString - A string containing the JSON payload.
 * @returns An encoded string.
 */
export const customUrlEncode = (jsonString: string): string => {
    try {
        JSON.parse(jsonString); // ensure it's valid JSON
        return transform(jsonString, substitutionMap);
    } catch (e) {
        return "Invalid JSON Input";
    }
}

/**
 * Simulates decoding a weakly protected string from a URL back into a JSON object.
 * @param encodedString - The custom-encoded string.
 * @returns A JSON string or an error message.
 */
export const customUrlDecode = (encodedString: string): string => {
    try {
        const decoded = transform(encodedString, reverseSubstitutionMap);
        JSON.parse(decoded); // ensure it's valid JSON
        return decoded;
    } catch (e) {
        return "Invalid Encoded String";
    }
}
