let currDraggedItem; 
const inputTier = document.getElementById("tier");
const submitBtn = document.getElementById("submit");

const imageForm = document.getElementById('image-form');

const itemContainers = document.getElementsByClassName('item-container');

for(const item of itemContainers){
    setUpItemContainerForDrag(item);
}

const tierList = document.querySelectorAll('.tier-list');

// tierList.forEach(setUpDropZoneinTierList);


imageForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    console.log("form submitted")
    const imageInput = document.getElementById('item');
    const ImageURL = imageInput.value;
    if(ImageURL === ''){
        alert("Please enter valid url");
        return;
    }
    console.log(ImageURL);
    createTierListItems(ImageURL);
    imageInput.value = '';
});

submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log("Event Occured !")
    const target = event.target;
    console.log(target);

    if(inputTier.value === ''){
        alert("Please enter tier name")
        return;
    }

    createTierList();
});

function createTierList(){
    const tierList = document.createElement('div');
    tierList.classList.add('tier-list');

    const heading = document.createElement('h1');
    heading.textContent = inputTier.value;

    const tierListItems = document.createElement('div');
    tierListItems.classList.add('tier-list-items');

    tierList.appendChild(heading);
    tierList.appendChild(tierListItems);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(tierList);
    
    setUpDropZoneinTierList(tierList);
}

function createTierListItems(ImageURL){
    const ImageDiv = document.createElement('div');
    ImageDiv.setAttribute('draggable','true');
    ImageDiv.classList.add('item-container');

    setUpItemContainerForDrag(ImageDiv);

    const img = document.createElement('img');
    img.src = ImageURL;

    ImageDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(ImageDiv);
}

function setUpItemContainerForDrag(itemContainers){

    itemContainers.addEventListener('dragstart', (event)=>{
        console.log("started dragging");
        currDraggedItem = event.target.parentNode;
        console.log(event.target.parentNode);
    });
}

function setUpDropZoneinTierList(tierList){
    console.log(tierList);
    tierList.addEventListener('drop',(event)=>{
        event.preventDefault();
        console.log("dropping");
    });

    tierList.addEventListener('dragover',function (event){
        console.log("Dragged over drop zone");
        event.target.appendChild(currDraggedItem);
    });
}