export function splitStringByNewLine(text: string): string[] {
	return text.split(/\r?\n/);
}

export function checkStringHasWords(str: string): boolean {
	return str.trim().length > 0;
}
