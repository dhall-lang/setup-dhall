# setup-dhall

Github action to install a specific version of https://dhall-lang.org.

This will add the following executables to your `PATH`, making them available for further actions:

- `dhall`
- `dhall-to-json`
- `dhall-to-yaml`
- `json-to-dhall`

### Inputs

#### `version`

**Optional** The version of Dhall to install. Default: `latest`.

### Usage

#### Basic Example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: craig-day/setup-dhall@v2
      - run: dhall version
```

#### With a Specific Version

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: craig-day/setup-dhall@v2
        with:
          version: '1.28.0'
      - run: dhall version
      - run: dhall-to-json --version
```
