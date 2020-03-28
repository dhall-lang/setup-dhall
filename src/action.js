const core = require('@actions/core')
const { exec } = require('@actions/exec')
const path = require('path')
const https = require('https')
const os = require('os')

const releasePatterns = () => {
  const platform = os.platform()
  let platformSuffix

  switch (platform) {
    case 'linux':
      platformSuffix = 'linux'
      break
    case 'darwin':
      platformSuffix = 'macos'
      break
    case 'win32':
      platformSuffix = 'windows'
      break
    default:
      core.setFailed(`Unknown or unsuppored platform: ${platform}`)
      return
  }

  return {
    core: new RegExp(`dhall-[0-9.]+.*-${platformSuffix}\.tar\.bz2`, 'i'),
    json: new RegExp(`dhall-json-[0-9.]+.*-${platformSuffix}\.tar\.bz2`, 'i'),
  }
}

const fetchReleases = async () => {
  const version = core.getInput('version')
  const versionPath = version == 'latest' ? 'latest' : `tags/${version}`
  const url = `https://api.github.com/repos/dhall-lang/dhall-haskell/releases/${versionPath}`

  core.info(`Fetching dhall releases from ${url}`)

  const release = JSON.parse(await get(url))
  const patterns = releasePatterns()

  const coreRelease = release.assets.find(asset =>
    patterns.core.test(asset.name)
  )
  const jsonRelease = release.assets.find(asset =>
    patterns.json.test(asset.name)
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
