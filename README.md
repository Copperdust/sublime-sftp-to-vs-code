This is a very basic package with no validation whatsoever.

It'll copy the settings from a `sftp-config.json` file in the current directory to a `./.vscode/sftp.json` file to be compatible with VS Code's `SFTP` plugin. This is mostly to make migration easy if you have many `sftp-config.json` files in many projects.

Install with `-g` option. `npm install -g Copperdust/sublime-sftp-to-vs-code`.

In order to run, `cd` to the root folder of the project and run `sublime-sftp-to-vs-code`.