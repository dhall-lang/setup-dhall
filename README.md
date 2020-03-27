# setup-dhall
Github action to install a specific version of https://dhall-lang.org and run commands

## Inputs

### `version`

**Optional** The version of Dhall to install. Default: `latest`.

## Usage


### Basic Example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-dhall@v1
        with:
          version: 1.24.0
      - run: dhall version
      - run: dhall-to-json --version
```
