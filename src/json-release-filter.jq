[
  .assets[]
  | . as $release
  | if (.name | test("dhall-json-[0-9.]+.*-linux.tar.bz2"; "i")) then
    $release.browser_download_url
  else
    ""
  end
 ] | reduce .[] as $url (""; . + $url)
