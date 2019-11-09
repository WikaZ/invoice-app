# Reactron
## A Simplified Electron with React Boilerplate

This is the source code for the article [The Dream Team - React with Electron](https://medium.com/@mitchpierias/the-dream-team-react-with-electron-c808ecb5b55e) on Medium.

### Usage
> This will build for your current operating system.

Clone the repository into your working directory, then install the required dependencies;
```
npm install
```

Build the compiled React and HTML files;
```
npm run-script build
```

Build the Electron distribution;
```
npm run-script dist
```

Run development mode:

Open two terminals

Terminal 1 (to start webpack that rebuilds react app):
```
npm run-script start:react
```

Terminal 2 (to start electron app that gets sources from webpack dev server)
```
npm run-script start:electro
```
### Requirements
- Node ^9.X.X
- Electron ^3.X.X

#### Babel
- Babel-Core 6.3.X
- Babel-Loader 7.X.X
- Babel-Preset-Env 1.X.X
- Babel-Preset-React 6.X.X