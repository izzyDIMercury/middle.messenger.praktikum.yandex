import { JSDOM } from 'jsdom'
import * as Components from './src/components';
import Handlebars from "handlebars";

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
})

const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
