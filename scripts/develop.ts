import { readFileSync } from 'fs';
import { logWarning, logSuccess, logError } from './utils/log';
import { spawnAsync } from './utils/spawnAsync';

const PACKAGE_JSON_SCRIPT_KEY = 'dev:init';
const PACKAGES_PATH = './packages';

// pass any package folder name to run 'pnpm dev:init' as args to this script
const [, , ...args] = process.argv;

async function coldStart() {
	logSuccess('Welcome to SCRIPTS');

	// for each package name check if it has a 'dev:init' script in package.json
	for (const packageName of args) {
		const packagePath = `./${PACKAGES_PATH}/${packageName}`;
		const packageJson = JSON.parse(readFileSync(`${packagePath}/package.json`, 'utf8'));
		const script = packageJson.scripts[PACKAGE_JSON_SCRIPT_KEY];

		if (script === undefined) {
			logError(`No '${PACKAGE_JSON_SCRIPT_KEY}' script found in package.json for '${packageName}'`);
			process.exit(1);
		}

		logWarning(`Cold starting '${packageName}'...`);

		await spawnAsync('pnpm', ['-r', '--filter', packageName, PACKAGE_JSON_SCRIPT_KEY]);

		logSuccess('Done!');
	}
}

async function startDevelop() {
	logWarning('Starting development server...');

	await spawnAsync('pnpm', ['-r', '--parallel', '--filter', './packages/*', 'dev']);
}

await coldStart();
await startDevelop();
