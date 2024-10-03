/**
 * Function to remove console.log statements from the provided text.
 * It handles both commented and uncommented console.log statements,
 * considering various cases:
 * 1. Single console.log on a line
 * 2. console.log followed by other code on the same line
 * 3. Commented console.log
 * 4. Commented console.log followed by other code
 *
 * @param text - The text from which console.log statements will be removed.
 * @returns The text after removing console.log statements.
 */
export function removeConsoleLogs(text: string): string {
  // Regular expression to match console.log statements in various formats
  const consoleLogRegex = /(^|\s*)(\/\/\s*)?console\.log\s*\([^)]*\);?/gm;

  // Remove console.log statements while preserving any code that follows on the same line
  return text.replace(
    consoleLogRegex,
    (match, start, comment, offset, string) => {
      // If this console.log is the only thing on the line, remove the entire line
      const lineStart = string.lastIndexOf("\n", offset) + 1;
      const lineEnd = string.indexOf("\n", offset);
      const fullLine = string.substring(
        lineStart,
        lineEnd !== -1 ? lineEnd : string.length,
      );

      // Check if there's any meaningful code after the console.log on the same line
      const remainingLine = fullLine.substring(match.length).trim();

      // If there's nothing else on the line, return empty string to remove the whole line
      if (!remainingLine) {
        return "";
      }

      // If there's other code on the line, just remove the console.log part
      return start && !comment ? start : "";
    },
  );
}
