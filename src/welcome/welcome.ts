const openOptionsBtn = document.getElementById(
  'open-options'
) as HTMLButtonElement

openOptionsBtn.onclick = () => {
  browser.runtime.openOptionsPage()
}
