import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')

const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

const mainEl = document.querySelector("main")
const modalDimensions = memeModal.getBoundingClientRect()

getImageBtn.addEventListener('click', renderCat)


memeModalCloseBtn.addEventListener('click', closeModal)



document.addEventListener('click', function(e){
    if (e.target.isEqualNode(getImageBtn)) return;
    const isOutsideModal = !memeModal.contains(e.target)
    if (isOutsideModal){
        closeModal()
    }
})


function getEmotionsArray(cats){
    // Gets unique list of emotions to display
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsDropdown(cats){
    const emotions = getEmotionsArray(cats)
    let selectItems = `<select>`
    for (let emotion of emotions){
        selectItems += `
        <div class="radio">
            <option value="${emotion}">${emotion}</option>
        </div>
        `   
    }
    selectItems += `</select>`
    emotionRadios.innerHTML = selectItems
}

renderEmotionsDropdown(catsData)

function renderCat(){

    const catObject = getSingleCatObject()
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
    
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    const selectEl = document.querySelector('select')
    if(selectEl){
        const selectedEmotion = selectEl.value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray
    }  

    
}

function closeModal(e){
    memeModal.style.display = 'none'
}