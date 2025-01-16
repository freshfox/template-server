import {createTemplateServer} from "./index";

const app = createTemplateServer({
    test: (query, options) => {
        options.test = ['1', '2', '3']
        options.locale = ['1', '2', '3']
        options.test = ['1', '2', '3']
        options.test2 = ['1', '2', '3'];
        options.test3 = ['1', '2', '3'];
        options.test4 = ['1', '2', '3'];
        options.test5 = ['1', '2', '3'];
        options.test6 = ['1', '2', '3'];
        options.test7 = ['1', '2', '3'];
        return `<html lang=""><body><div>Current query parameter</div><pre>${JSON.stringify(query, null, 2)}</pre></body></html>`
    }
});
app.listen(3010, () => {
    console.log('Listening on http://localhost:3010');
});