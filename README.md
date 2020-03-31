# setup-dhall

![.github/workflows/main.yml](https://github.com/dhall-lang/setup-dhall/workflows/.github/workflows/main.yml/badge.svg?event=release)

Github action to install a specific version of https://dhall-lang.org.

This will add the following executables to your `PATH`, making them available for further actions:

- `dhall`
- `dhall-to-json`
- `dhall-to-yaml`
- `json-to-dhall`

## Inputs

| Parameter      | Description                                                           | Required | Default  |
| -------------- | --------------------------------------------------------------------- | -------- | -------- |
| `version`      | The version of Dhall to install                                       | N        | `latest` |
| `github_token` | A GitHub Token. This can help with rate limits when fetching releases | N        | None     |

## Usage

### Basic Example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: dhall-lang/setup-dhall@v4
      - run: dhall version
```

### With a Specific Version

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: dhall-lang/setup-dhall@v4
        with:
          version: '1.28.0'
      - run: dhall version
      - run: dhall-to-json --version
```

### Adding a GitHub token

If the action fails, it could be because GitHub rate limits anonymous requests to the API. In that
case, the action will log an error message that looks something like this:

```
##[error]Failed to fetch releases from GitHub API, providing a token may help.
Error: {"message":"API rate limit exceeded for 1.1.1.1. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)","documentation_url":"https://developer.github.com/v3/#rate-limiting"}
```

As the error indicates, making the request as an authenticated user will grant a higher rate limit,
so you can provide a `github_token` input to do so.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: dhall-lang/setup-dhall@v4
        with:
          version: '1.28.0'
          github_token: ${{ github.token }}
      - run: dhall version
      - run: dhall-to-json --version
```

## TODO

- [x] Add platform validation on action to fail early if an unsupported runner is used
- [x] Add support for the macOS runner
- [ ] Add support for the Windows runner
