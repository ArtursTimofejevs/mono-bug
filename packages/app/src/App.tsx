import { sayHello } from 'shared';

import { AType } from './types/App.types';

export function App() {
	const a: AType = {
		name: 'a',
	};

	return (
		<div>
			<h1>{sayHello(a.name)}</h1>
		</div>
	);
}
