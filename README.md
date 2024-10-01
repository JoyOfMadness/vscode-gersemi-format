# Gersemi support for VS Code

`vscode-gersemi-format` is an extension for Visual Studio Code that adds integration for [gersemi](https://github.com/BlankSpruce/gersemi) formatter for CMake files.

## Features

- Allows formatting CMake files via "Format Document" and "Format Selection" commands
- Uses existing `gersemi` installation to do so
- Allows adding custom parameters via settings
- Source code for this extension can be found here <https://github.com/JoyOfMadness/vscode-gersemi-format>

## Requirements

`gersemi` needs to be installed manually (with e.g. `pip3 install gersemi`).

See <https://github.com/BlankSpruce/gersemi> for more details.

## Extension Settings

This extension contributes the following settings:

- `gersemi.programPath`: Path to `gersemi` executable.
- `gersemi.currentWorkingDirectory`: Allows to overwrite working directory for `gersemi`. The location of currently formatted file is used by default.
- `gersemi.programArgs`: Optional program arugments which are passed to `gersemi`

## Known Issues

None

## Release Notes

### 0.0.1

- Initial release
