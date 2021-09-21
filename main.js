const inputTextArea = document.getElementById("input")
const outputTextArea = document.getElementById("output")
const keyInput = document.getElementById("key-input")

const availableCharters = 'йцукенгшщзхъэждлорпавыфячсмитьбю_'.split('').sort((a, b) => a.localeCompare(b))
const keyMap = {}
const generateKeyInput = (ch) => {
    if (!keyMap.hasOwnProperty(ch)) {
        keyMap[ch] = ""
    }
    keyInput.insertAdjacentHTML('beforeend',
        `
<span class="key-input__char">
    <span class="key-input__char__input">${ch}</span>
    <span class="key-input__char__spacer">:</span>
    <input type="text" class="key-input__char__output" maxlength="1" data-char="${ch}">
</span>
    `)
    keyInput.querySelector(`input[data-char=${ch}]`)?.addEventListener('input', ({ target }) => { keyMap[ch] = target.value; outputTextArea.value = decrypt(inputTextArea.value) })
}
availableCharters.forEach(generateKeyInput)

const decrypt = (text) =>
    text.split("").map(ch => keyMap[ch]?.toUpperCase() || ch).join("")

inputTextArea.addEventListener('input', () => {
    const chs = {}
    inputTextArea.value.split('').forEach(ch => chs[ch] && chs[ch]++ || (chs[ch] = 1))
    Object.keys(chs).forEach((ch) => chs[ch] /= inputTextArea.value.length)
    console.log(chs);
    outputTextArea.value = decrypt(inputTextArea.value)
})