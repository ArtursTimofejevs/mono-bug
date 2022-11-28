import chalk from 'chalk';

type LogType = 'error' | 'warning' | 'success' | 'info';

const logColor = {
	error: chalk.red,
	warning: chalk.yellow,
	success: chalk.green,
	info: chalk.blue,
};

const log = (msg: string, logType: LogType = 'info') => console.log(logColor[logType](`[SCRIPTS]: ${msg}`));

const logInfo = (msg: string) => log(msg);

const logError = (msg: string) => log(msg, 'error');

const logWarning = (msg: string) => log(msg, 'warning');

const logSuccess = (msg: string) => log(msg, 'success');

export { LogType, log, logInfo, logError, logWarning, logSuccess };
