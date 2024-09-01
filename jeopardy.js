
body=document.querySelector("body")
loader=document.querySelector(".loader")
section=document.querySelector("#questions")
startBtn=document.querySelector('#Start')
newTable=document.createElement('TABLE')
newTrHead=document.createElement('TR')
newTHead=document.createElement('THEAD')
newTBody=document.createElement('TBODY')
newTrQ0=document.createElement('TR')
newTrQ1=document.createElement('TR')
newTrQ2=document.createElement('TR')
newTrQ3=document.createElement('TR')
newTrQ4=document.createElement('TR')
newTable.appendChild(newTrQ0)
newTable.appendChild(newTrQ1)
newTable.appendChild(newTrQ2)
newTable.appendChild(newTrQ3)
newTable.appendChild(newTrQ4)
newTable.appendChild(newTBody)
let categories = [];


async function getCategoryIds() {
fillCat()
for(id of idCat ){
    resp = await axios.get((`https://rithm-jeopardy.herokuapp.com/api/category?id=${id}`))
    idValue=resp.data.id 
    titleValue = resp.data.title
    questionsValue= resp.data.clues
    categories.push({title:titleValue,questions:questionsValue})
    catId={title:titleValue,questions:questionsValue,id:idValue}
    fillTable(catId)
}
}


//generate a ramdom umber 0-13
function getRan(){
    num=Math.floor(Math.random()*14)
    return num
}
//pick 6 ids whit no repeat one
function fillCat(){
    set=new Set
    while(set.size <= 5){
        //ids than ar target here to dont show its bcuz were not working whowing 400 bad request
        num=getRan()
        if(num === 1){
            continue;
        }
        if(num === 5){
            continue;
        }
        if(num === 7){
            continue;
        }
        if(num === 0){
            continue;
        }
        set.add(num)
    }
    idCat=[...set]

 }
=

async function fillTable(catId) {

    id=catId.id
    title=catId.title
    questions=catId.questions
    newTH=document.createElement('TH')
    section.appendChild(newTable)
    newTable.appendChild(newTHead)
    newTHead.appendChild(newTrHead)
    newTrHead.appendChild(newTH)
    newTH.classList.add('title')
    textTitle = document.createTextNode(`${title}`)
    newTH.appendChild(textTitle)
     
    
    for (i=0;i<questions.length;i++){
        
        if(newTrQ0.children.length>newTrQ1.children.length){
            newTBody.appendChild(newTrQ1)
            newTrQ1.appendChild(newTD)
        }
        if(newTrQ1.children.length>newTrQ2.children.length){
            newTBody.appendChild(newTrQ2)
            newTrQ2.appendChild(newTD)
        }
        if(newTrQ2.children.length>newTrQ3.children.length){
            newTBody.appendChild(newTrQ3)
            newTrQ3.appendChild(newTD)
        }
        if(newTrQ3.children.length>newTrQ4.children.length){
            newTBody.appendChild(newTrQ4)
            newTrQ4.appendChild(newTD)
        }
        quest=questions[i].question
        questId=[i]
        newTD=document.createElement('TD')
        newTD.classList.add(questId)
        newTD.setAttribute('id',id)
        newTBody.append(newTrQ0)
        newTrQ0.appendChild(newTD)
        textQues =document.createTextNode('?')
        newTD.appendChild(textQues)

        
}
}


async function handleClick(evt) {
    TitleId=evt.target.id
    questionNum=evt.target.classList.value
    if(evt.target.innerHTML === '?'){
    resp = await axios.get((`https://rithm-jeopardy.herokuapp.com/api/category?id=${TitleId}`))
    question=resp.data.clues[questionNum].question
    evt.target.innerHTML=question
    
    }
    else if(evt.target.tagName === 'TD'){
        answer=resp.data.clues[questionNum].answer
        evt.target.innerHTML=answer
    }
}





/** clear the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    
    loader.style.display='block'
    hideLoadingView()
   }

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    setTimeout(function(){
        loader.style.display='none'
    },2000)
    setTimeout(function(){
        getCategoryIds()
    },2000)
}

async function setupAndStart() {
    
    
    if(section.children.length === 1){
        location.reload()
    }
     
    
}


/** On click of start / restart button, set up game. */


//showing questions and answers eventListener
addEventListener('click',async function(evt){
    handleClick(evt)
})
//start restart button eventListener
startBtn.addEventListener('click',function(){
    setupAndStart()
})
//on load eventListener
addEventListener('load',function(){
    this.alert("click on the ? to show questions and click again to get answers")
})
showLoadingView()