const inputTextArea = document.getElementById("input")
const outputTextArea = document.getElementById("output")
const keyInput = document.getElementById("key-input")
const chars = document.getElementById("chars")

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
    keyInput.querySelector(`input[data-char=${ch}]`)?.addEventListener('input', ({ target }) => { keyMap[ch] = target.value; rewrite() })
}
availableCharters.forEach(generateKeyInput)

const printChar = (ch,v)=>
    chars.insertAdjacentHTML('beforeend',`<span class="char-value${keyMap[ch]?' fill':''}">${ch}: ${v.toFixed(3)}</span>`)

const printChars = (chs) => {
    chars.innerHTML = "";
    Object.entries(chs).sort((a,b)=>b[1]-a[1]).forEach(e=>printChar(e[0],e[1]))
}

const decrypt = (text) =>
    text.split("").map(ch => keyMap[ch]?.toUpperCase() || ch).join("")

const rewrite = ()=>{
    const chs = {}
    inputTextArea.value.split('').forEach(ch => chs[ch] && chs[ch]++ || (chs[ch] = 1))
    Object.keys(chs).forEach((ch) => chs[ch] /= inputTextArea.value.length)
    printChars(chs);
    outputTextArea.value = decrypt(inputTextArea.value)
}
inputTextArea.addEventListener('input', () => rewrite())