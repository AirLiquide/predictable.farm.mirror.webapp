Predictable Farm — Mirror server web app
---

### Introduction

This is the front end web application for the ssh mirror server. It lists the available clients, their respective ports, and allows for a terminal to be open directly in the browser, in case you have installed WebSSH2.

We suppose this web app and the mirror server are on the same server.

Copy `config.json.dist`  to  `config.json` and change the values for the server host and username if needed.

### Installation

    npm install
    npm run build # runs webpack

### Run

Open the `client/index.html` in a browser. You might want to serve it with a web server such as Nginx or Apache. The only dependency is the `public/bundle.js` created by webpack and the `index.css` file.

If you want to use a [WebSSH2](https://github.com/billchurch/WebSSH2), it must be installed on a server somewhere, and the host and port must be put in the `config.json` file.

### License

MIT. See License.txt file