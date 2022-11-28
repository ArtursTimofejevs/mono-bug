import { spawn } from 'child_process';
import { log, LogType } from './log';
import { splitStringByNewLine, checkStringHasWords } from './text';

export async function spawnAsync(command: string, args: string[]) {
	return await new Promise((resolve, reject) => {
		const child = spawn(command, args, { stdio: ['pipe'], env: { ...process.env, FORCE_COLOR: 'true' } });

		child.stdout.on('data', (data) => outputBuffer(data, 'info'));

		child.stderr.on('data', (data) => outputBuffer(data, 'error'));

		child.on('close', () => {
			if (child.exitCode === 0) {
				resolve(true);
			}
			reject(
				new Error(
					`${command} ${args.join(' ')} exited with code ${child.exitCode === null ? 'unknown' : child.exitCode}, see above for more info`
				)
			);
		});
	});
}

function outputBuffer(buffer: Buffer, logType: LogType) {
	splitStringByNewLine(buffer.toString()).forEach((line) => {
		if (line === 'undefined') return;
		if (line.includes('Exit status 1')) return;
		if (checkStringHasWords(line)) {
			log(line.trim(), logType);
		}
	});
}
