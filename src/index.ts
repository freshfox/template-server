import {default as express, Express} from 'express';
import {resolve} from 'path'

export type Routes = Record<string, (query: any, options: Record<string, string[]>) => Promise<string> | string>;

export function attachTemplateServer(app: Express, routes: Routes) {
	app.use('/public', express.static(resolve(__dirname, '../public')), (req) => {
		console.log(req)
	});

	app.get('/', (req, res) => {
		const html = Object.keys(routes)
			.map((key) => {
				return `<a href="/${key}">Open template "${key}"</a>`;
			})
			.join('<br>');
		res.send(html);
	});

	app.get('/:template', async (req, res: any) => {
		const tplData = routes[req.params.template];
		if (!tplData) {
			return res.status(404).send(`Template ${req.params.template} not found`);
		}
		const options = {};
		let html = await tplData(req.query, options);
		html = replaceClosingHtmlTagWithScript(
			html,
			`
<script>const options = JSON.parse('${JSON.stringify(options)}');
</script><script src="/public/options.js"></script>
<link rel="stylesheet" href="/public/options.css">
`);
		res.send(html);
	});

	return app;
}

export function createTemplateServer(routes: Routes) {
	return attachTemplateServer(express(), routes)
}

function replaceClosingHtmlTagWithScript(htmlString: string, content: string) {
	// Regex to match the closing </html> tag
	const regex = /<\/html>/i;

	// Create the script tag for the external JavaScript file

	// Replace the closing </html> tag with the script tag followed by the </html> tag
	return htmlString.replace(regex, `${content}\n</html>`);
}