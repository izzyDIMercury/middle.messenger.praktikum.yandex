import { JSDOM } from 'jsdom';
import * as Components from './src/components';
import Handlebars from "handlebars";

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
})



const jsdom = new JSDOM(`<div id="app"></div>`, {
    url: "http://localhost:3000",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.history = jsdom.window.history;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;

// global.window = jsdom.window;
// global.document = jsdom.window.document;
// global.Node = jsdom.window.Node;
// global.MouseEvent = jsdom.window.MouseEvent;
