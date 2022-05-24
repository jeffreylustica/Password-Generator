const checkboxOptions = document.querySelectorAll("[data-opt]")
const btnGeneratePass = document.querySelector("#btn-generate-pass")
const passOptionEl = document.querySelectorAll(".password-choice")
const passLengthInput = document.querySelector("#opt-length")
const warningEl = document.querySelector("#warning-el")

const alphanumeric = {
    lowercaseType: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    uppercaseType: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    numberType: [0,1,2,3,4,5,6,7,8,9],
    specialCharType: ["!","@","#","$","%","^","&","*","-","_","+","<",">","?","."]
}

const characterTypes = {lowercaseType:false, uppercaseType: false, numberType:false, specialCharType: false}

let passLength = 0
let characterTypeUsed = []
let password = ""


checkboxOptions.forEach(checkbox => {
    checkbox.addEventListener("change", (event) => {
        const {type, name, checked} = event.target
        if (type === "checkbox") {
            checked ? characterTypes[name] = true : characterTypes[name] = false
        }
    })
})

btnGeneratePass.addEventListener("click", () => {
    getCharacterTypes()
    passLength = passLengthInput.value
    if (characterTypeUsed.length < 1 || passLength === 0) {
        warningEl.textContent = "* Please select password criteria and length"
        warningEl.classList.add("show-message")
    } else if(characterTypeUsed.length > passLength) {
        warningEl.textContent = "* Password length should not be less than the number of chosen criteria"
        warningEl.classList.add("show-message")
    } else {  
        warningEl.classList.remove("show-message")     
        passOptionEl.forEach(inputEl => {
            password = "" 
            getPass()
            inputEl.value = password
        })
    }    
})

function getCharacterTypes() {
    characterTypeUsed = Object.keys(characterTypes).filter((key) => {
        return  characterTypes[key]
    })
}

function getPass() {
    if (characterTypeUsed.length > 0) {
        let concatCharTypes = []

        characterTypeUsed.forEach(charType => {
            concatCharTypes = concatCharTypes.concat(alphanumeric[charType])
        })

        let tempPass = []
        for (i = 0; i < passLength; i++) {
            const characterIndex = Math.floor(Math.random() * concatCharTypes.length)
            const character = concatCharTypes[characterIndex]
            tempPass.push(character)
        }
        checkPass(tempPass)
    }   
}

function checkPass(tempPass) {
    // checking
    let areAllCharTypesIncludes = []

    characterTypeUsed.forEach(charType => {  
        let isCharIncludes = []      
        alphanumeric[charType].forEach(char => {       
            tempPass.includes(char) ? isCharIncludes.push(true) : isCharIncludes.push(false)
        })         
        isCharIncludes.some(checkChar) ? areAllCharTypesIncludes.push(true) : areAllCharTypesIncludes.push(false)        
    }) 

    areAllCharTypesIncludes.every(checkChar) ? password = tempPass.join('') : getPass()
}

function checkChar(isInclude) {
    return isInclude === true
}

passOptionEl.forEach(inputEl => {
    inputEl.addEventListener("click", (event) => {
        const copyText =  event.target
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);

        const tooltipTextEl = document.querySelectorAll(".tooltiptext");       
        tooltipTextEl.forEach(tooltipText => {
            tooltipText.innerHTML = "Copied: " + copyText.value;
        })
    })

    inputEl.addEventListener("mouseout", () => {
        const tooltipTextEl = document.querySelectorAll(".tooltiptext");       
        tooltipTextEl.forEach(tooltipText => {
            tooltipText.innerHTML = "Copy to clipboard";
        })
    })
})




