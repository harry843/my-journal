export default function countLines(inputString:string) {
    if (typeof inputString !== 'string') {
      throw new Error('Input must be a string');
    }
    // Remove leading and trailing whitespace, then split the string by newline characters
    const lines = inputString.trim().split(/\r?\n/);
  
    return lines.length;
  }