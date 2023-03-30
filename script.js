// content dom
const content = document.querySelector(".content")
// FORMS DOM
const notAdd = document.querySelector(".note-add")
const close = document.querySelector(".close")  
const notEkleBaslik = document.querySelector("#baslik")
const notEkleTextArea = document.querySelector("#not-icerik")
const selectValue = document.querySelector("#kategori")
const formKaydet = document.querySelector("#saveNote")

// not ekle buton
const noteAddBtn = document.querySelector(".plus-button")
// Kategoriler
const categoryButtons = document.querySelectorAll(".category-button")

// dark buton
const darkButton = document.querySelector(".dark-button")

// pop up
const popUp = document.querySelector(".pop-up")

// dark mode dom
let lightBtn = document.querySelector(".light-btn")
let darkBtn = document.querySelector(".dark-btn")

// icons
let moon = document.querySelector(".fa-moon")
let sun = document.querySelector(".fa-sun")

// footer
let footer = document.querySelector("footer")


noteAddBtn.addEventListener("click",()=>{
    notAdd.classList.add("d-flex")
    notEkleTextArea.value = ""
})
close.addEventListener("click",()=>{
    notAdd.classList.remove("d-flex")
})

//* category




var allCards;
var categoryCounter;

if (localStorage.getItem('cards')) {
    allCards = JSON.parse(localStorage.getItem('cards'))
    categoryCounter = allCards.length
}
else {
    allCards = []
    categoryCounter = allCards.length
}
 if (allCards.length > 0) {
    for (let i = 0; i < allCards.length; i++){
        categoryIcerikEkle(allCards[i].name,allCards[i].desc,allCards[i].tag, allCards[i].index)
    }
 }
function yeniIcerikEkle(name,desc,tag){
    let card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("animate__animated")
    card.classList.add("animate__zoomInDown")
    card.dataset.index = categoryCounter
    content.appendChild(card)

    let cardHeader = document.createElement("div")
    cardHeader.classList.add("card-header")
    cardHeader.style.textTransform = 'capitalize'
    cardHeader.innerHTML = `${name}  <i class='fa-solid fa-trash'></i>`
    card.appendChild(cardHeader)

    let clearDiv = document.createElement("div")
    clearDiv.classList.add("clear")
    card.appendChild(clearDiv)

    let cardDesc = document.createElement("div")
    cardDesc.classList.add("card-desc")
    cardDesc.style.textTransform = 'capitalize'
    cardDesc.textContent = desc
    card.appendChild(cardDesc)

    let cardTag = document.createElement("div")
    cardTag.classList.add("card-tag")
    cardTag.classList.add(tag)
    cardTag.textContent = tag
    card.appendChild(cardTag)

    allCards[categoryCounter] = {
        "name" : name,
        "desc" : desc,
        "tag"  : tag,
        "index" : categoryCounter
    }
    categoryCounter++
    localStorage.setItem('cards',JSON.stringify(allCards))

}

function categoryIcerikEkle(name,desc,tag,index) {
    let card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("animate__animated")
    card.classList.add("animate__zoomInDown")
    card.dataset.index = index
    content.appendChild(card)

    let cardHeader = document.createElement("div")
    cardHeader.classList.add("card-header")
    cardHeader.innerHTML = `${name}  <i class='fa-solid fa-trash'></i>`
   
    card.appendChild(cardHeader)

    let clearDiv = document.createElement("div")
    clearDiv.classList.add("clear")
    card.appendChild(clearDiv)

    let cardDesc = document.createElement("div")
    cardDesc.classList.add("card-desc")
    cardDesc.textContent = desc
    card.appendChild(cardDesc)

    let cardTag = document.createElement("div")
    cardTag.classList.add("card-tag")
    cardTag.classList.add(tag)
    cardTag.textContent = tag
    card.appendChild(cardTag)


}
formKaydet.addEventListener("click",()=> {
    
    if ((notEkleBaslik.value).trim() != "" && (notEkleTextArea.value).trim() != "" && selectValue.value != "null") {
        yeniIcerikEkle(notEkleBaslik.value,notEkleTextArea.value,selectValue.value)
        notEkleBaslik.value = ""
        notEkleTextArea.value = ""
        selectValue.value = "null"
        popUp.innerHTML = "<i class='fa-solid fa-check'></i> Success"
        popUp.classList.add("pop-up-active")
        close.click()
         setTimeout(()=>{
            popUp.classList.remove("pop-up-active")

         },2000)
    }
    
    
})

function cardRemove(event) {
    const eventTarget = event.target;
    
    if(eventTarget.classList[1] == "fa-trash"){
        const cardElement  = eventTarget.parentElement.parentElement
        const targetDataIndex = cardElement.dataset.index
        let localStorageData = JSON.parse(localStorage.getItem('cards'))
        console.log(localStorageData)
        const removeConfirm = confirm("R u sure?")
        if (removeConfirm === true) {
            popUp.innerHTML = "<i class='fa-solid fa-check'></i> Success"
            popUp.classList.add("pop-up-active")
        
            setTimeout(()=>{
                popUp.classList.remove("pop-up-active")
             
             },2000)
             localStorageData.splice(targetDataIndex,1)
             allCards.splice(targetDataIndex,1)
             localStorage.setItem('cards',JSON.stringify(allCards))
             cardElement.remove()
            
            
        }
       
    }
}
addEventListener("click",cardRemove)

function darkMode() {
    document.body.classList.toggle("dark-bg")
    darkButton.classList.toggle("light-bg")
    lightBtn.classList.toggle("d-none")
    darkBtn.classList.toggle("d-none")
    footer.classList.toggle("text-white")
    if (document.body.classList[0] == "dark-bg") {
        localStorage.setItem("dark","true")
    }
    else {
        localStorage.setItem("dark","false")
    }


}

darkButton.addEventListener("click",darkMode)

function darkModeControl() {
    if (localStorage.getItem('dark') === 'true') {
        darkButton.click()
    }
}

darkModeControl()


//? Category Map

function categorySelect(nameCategory) {
        if (allCards.length > 0) {
            content.innerHTML = "";
            allCards.filter((card) => {
                return card.tag === nameCategory;
            }).map((card) => {
                categoryIcerikEkle(card.name, card.desc, card.tag , card.index);
              
            });
        }
    }
  

const allCardsCategoryButton = document.querySelector('#allCategoryButton')
allCardsCategoryButton.addEventListener('click',()=>{
    location.reload()
})
categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {

      categoryButtons.forEach((button) => {
        button.classList.remove("active-category");
      });

      button.classList.add("active-category");

      categorySelect(button.dataset.category);
    });
  });


