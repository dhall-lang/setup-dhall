# setup-dhall

![.github/workflows/main.yml](https://github.com/dhall-lang/setup-dhall/workflows/.github/workflows/main.yml/badge.svg?event=release)

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
      - uses: dhall-lang/setup-dhall@v3
      - run: dhall version
```

#### With a Specific Version

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: dhall-lang/setup-dhall@v3
        with:
          version: '1.28.0'
      - run: dhall version
      - run: dhall-to-json --version
```

### TODO

- [x] Add platform validation on action to fail early if an unsupported runner is used
- [x] Add support for the macOS runner
- [ ] Add support for the Windows runner
