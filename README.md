# Fuchsia-CLI

### CLI tool for FuchsiaJS

### install

#### local install

```bash

    npm install -save-dev @fuchsia/cli

```

#### global install

```bash

    npm install -g @fuchsia/cli

```

### Usage

#### local install

```bash
    npx fuchsia [command]
```

#### global install

```bash
    fuchsia [command]
```

## basic commands

```
fuchsia [command]

-v --version: display CLI version
-h --help [command]: display Help info for command
```

### new

creates a new fuchsiajs project in [name] folder

```
    fuchsia new [name]
```

new command will prompt you for your prefered language (Javascript or Typescript) and prefered package manager (NPM / YARN).
