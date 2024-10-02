/**
 * Function to remove console.log statements from the provided text.
 * It uses a regular expression to match and remove all console.log calls.
 *
 * @param text - The text from which console.log statements will be removed.
 * @returns The text after removing console.log statements.
 */
export function removeConsoleLogs(text: string): string {
    // Regular expression to remove console.log and the content inside parentheses
    return text.replace(/console\.log\(.*?\);?/g, '');
}
