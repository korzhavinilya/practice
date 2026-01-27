# Development Tool

### Watch Mode

"watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled.
<b>we have to refresh the browser in order to see the changes.</b>

### webpack-dev-server

it tells to serve the files from the dist directory on localhost:8080

### webpack-dev-middleware

it is a wrapper that will emit files processed by webpack to a server. This is used in webpack-dev-server internally, however it's available as a separate package to allow more custom setups if desired.
