const core = require('@actions/core')
const { exec } = require('@actions/exec')
const path = require('path')
const https = require('https')

const CORE_RELEASE_PATTERN = /dhall-[0-9.]+.*-linux\.tar\.bz2/i
const JSON_RELEASE_PATTERN = /dhall-json-[0-9.]+.*-linux\.tar\.bz2/i

const fetchReleases = async () => {
  const version = core.getInput('version')
  const versionPath = version == 'latest' ? 'latest' : `tags/${version}`
  const url = `https://api.github.com/repos/dhall-lang/dhall-haskell/releases/${versionPath}`

  core.info(`Fetching dhall releases from ${url}`)

  const release = JSON.parse(await get(url))

  const coreRelease = release.assets.find(asset =>
    CORE_RELEASE_PATTERN.test(asset.name)
  )
  const jsonRelease = release.assets.find(asset =>
    JSON_RELEASE_PATTERN.test(asset.name)
  )

  return {
    core: coreRelease.browser_download_url,
    json: jsonRelease.browser_download_url,
  }
}

const get = url => {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: { 'User-Agent': 'setup-dhall Github actoin' },
    })

    request.on('response', res => {
      let data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        resolve(data)
      })
    })

    request.on('error', err => {
      reject(err)
    })
  })
}

const run = async () => {
  const urls = await fetchReleases()

  await exec(path.join(__dirname, 'install-dhall.sh'), [urls.core, urls.json])
}

try {
  run()
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`)
}
