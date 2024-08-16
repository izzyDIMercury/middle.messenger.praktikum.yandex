export async function resolve(specifier, context, next) {
	const nextResult = await next(specifier, context);

	if (!specifier.endsWith('.gif')) return nextResult;

	return {
		format: 'gif',
		shortCircuit: true,
		url: nextResult.url,
	};
}

export async function load(url, context, next) {
	if (context.format !== 'gif') return next(url, context);

	return {
		format: 'module',
		shortCircuit: true,
		source: 'export default ""',
	};
}
