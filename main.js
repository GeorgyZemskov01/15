'use strict'
let stop = false
let intervalId
let init = true

let empty = document.getElementById('empty')
empty.style.top = '0px'
empty.style.left = '0px'
for ( let i = 1; i < 16; i++) {
    let node = document.getElementById('b'+i)
    node.style.top = '0px'
    node.style.left = '0px' 
}

function clickHandler(){
    document.getElementById('desk').removeEventListener('mousedown', clickHandler)
    let target = event.target;
    let id = target.id;
    if (!id) {
        target = target.parentNode;
        id = target.id};
    if (id == 'desk') {
        document.getElementById('desk').addEventListener('mousedown', clickHandler)
        return false
    }
    console.log(id)
    let empty = document.getElementById('empty');
    if (target == empty) {
        document.getElementById('desk').addEventListener('mousedown', clickHandler)
        return false
    }
    let targetRect = target.getBoundingClientRect()
    let emptyRect = empty.getBoundingClientRect()
    let deltaX = (targetRect.x - emptyRect.x)
    let deltaY = (targetRect.y - emptyRect.y)
    if (((Math.abs(deltaX) >= 5) && (Math.abs(deltaY) >= 5)) || ((Math.abs(deltaX) <= 5) && (Math.abs(deltaY) <= 5))) {
        document.getElementById('desk').addEventListener('mousedown', clickHandler)

        return false
    }
    if (Math.abs(deltaX) < 110 && Math.abs(deltaY) < 110){
        nextStep()
        target.style.top = parseFloat(target.style.top) - deltaY +'px'
        target.style.left = parseFloat(target.style.left) - deltaX +'px'
        empty.style.top = parseFloat(empty.style.top) + deltaY+'px'
        empty.style.left = parseFloat(empty.style.left) + deltaX+'px'}
    if (Math.abs(deltaX) > 110){
        nextStep()
        empty.style.left = parseFloat(empty.style.left) + deltaX+'px';
        empty.style.top = parseFloat(empty.style.top) + deltaY+'px';
        for (let i = (Math.abs(deltaX)/100-1).toFixed(0); i>=0; i--){
            if (deltaX > 0){
                let nextBrick = document.elementFromPoint(targetRect.x - 90*i, targetRect.y+10)
                if (!nextBrick.id.startsWith('b')){nextBrick = nextBrick.parentNode}
                nextBrick.style.left = parseFloat(nextBrick.style.left) - 100 + 'px'}
            if (deltaX < 0){
                let nextBrick = document.elementFromPoint(targetRect.x + 110*i, targetRect.y+10)
                if (!nextBrick.id.startsWith('b')){nextBrick = nextBrick.parentNode}
                nextBrick.style.left = parseFloat(nextBrick.style.left) + 100 + 'px'}
            }
        }
    if (Math.abs(deltaY) > 110){
        nextStep()
        empty.style.left = parseFloat(empty.style.left) + deltaX+'px';
        empty.style.top = parseFloat(empty.style.top) + deltaY+'px';
        for (let i = (Math.abs(deltaY)/100-1).toFixed(0); i>=0; i--){
            if (deltaY > 0){
                let nextBrick = document.elementFromPoint(targetRect.x+10, targetRect.y - 90*i)
                if (!nextBrick.id.startsWith('b')){nextBrick = nextBrick.parentNode}
                nextBrick.style.top = parseFloat(nextBrick.style.top) - 100 + 'px'}
            if (deltaY < 0){
                let nextBrick = document.elementFromPoint(targetRect.x+10, targetRect.y + 110*i)
                if (!nextBrick.id.startsWith('b')){nextBrick = nextBrick.parentNode}
                nextBrick.style.top = parseFloat(nextBrick.style.top) + 100 + 'px'}
                }
            }
    setTimeout(()=>{
        document.getElementById('desk').addEventListener('mousedown', clickHandler)
        if (!init) {checkWin()}
    }, 150)
}


function timer() {
    let timer = document.getElementById('timer')
    let stamp = Date.now()
    intervalId = setInterval(() => {
        let timePassed = Date.now() - stamp
        timePassed = (new Date(timePassed))
        let minutes = timePassed.getMinutes()
        if (minutes < 10) minutes = '0' + minutes
        let seconds = timePassed.getSeconds()
        if (seconds < 10) seconds = '0' + seconds
        timer.innerHTML = minutes + ':' + seconds
        if (stop) {
            clearInterval(intervalId)
            stop = false
        }
    }, 100);
}

function nextStep() {
    let stepDiv = document.querySelector('.count')
    let inner = stepDiv.innerHTML
    inner = parseInt(inner.split(' ')[1])
    inner += 1
    stepDiv.innerHTML = 'Steps: ' + inner
}

// let list = randChoise([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
// // let list1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
// // console.log(list)
// // console.log(list1)
// alert(list.isCorrect)


function shuffle() {
    if (stop == false) {
        stop = true
        setTimeout((()=>stop=false),100)
    }
    let list = randChoise([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
    while (!isCorrect(list)) {
        list = randChoise([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
    }
    let desk = document.getElementById('desk')
    desk.innerHTML = ''
    for (let num of list) {
        let string = "<div class='brick' id='"+'b'+num+"'><div>"+num+"</div></div>"
        desk.innerHTML += string  
    }
    desk.innerHTML += '<div class="brick" id="empty"></div>'
    let empty = document.getElementById('empty')
    empty.style.top = '0px'
    empty.style.left = '0px'
    for ( let i = 1; i < 16; i++) {
        let node = document.getElementById('b'+i)
        node.style.top = '0px'
        node.style.left = '0px' 
    }
    setTimeout(timer, 100)
    let steps = document.getElementById('count')
    steps.innerHTML = 'Steps: 0'
    init = false
}

function isCorrect(array) {
    let sum = 0
    for ( let i = 1; i < 15; i++ ) {
        // console.log('passed')
        let num = array[i]
        // console.log(num)
        for (let v = i - 1; v >= 0; v--){
            if (array[v] < num) {
                // console.log(array[v]+' < '+num)
                sum += 1
            }
        }
    }
    sum += 3
    if ( sum % 2 == 0 ) {
        return true
    } else {
        return false
    }
}
// alert(isCorrect([1,2,3,4,5,6,7,8,9,10,11,14,13,15,12]))
// alert(isCorrect([1,2,3,4,5,6,7,8,9,10,11,12,13,15,14]))

function randChoise(array) {
    let answer = []
    while (array.length != 0) {
        let len = array.length
        let position = randMiniInt(len)
        let removed = array.splice(position, 1)
        answer.push(removed[0])
    }
    return answer
}


function randMiniInt(limit){
    let int = (Math.random()*100).toFixed(0)
    if (int < limit) { return int
    } else {
        return randMiniInt(limit)
    }
}


function showWin(){
    let div = document.createElement('div')
    let time = document.getElementById('timer')
    let count = document.getElementById('count')
    div.classList = 'win'
    div.innerHTML = '<div class="congrats">You win! Nice play!</div>'+
    '<div class="congrats">Your time: '+time.innerHTML+'</div>'+
    '<div class="congrats">Number of steps: '+count.innerHTML.split(' ')[1]+'</div>'+
    '<div id="again" class="again congrats">Play again</div>'
    document.body.append(div)
    document.getElementById('again').addEventListener('click', ()=>{
        div.outerHTML = ''
        shuffle()
    })
}


function checkWin(){
    let desk = document.getElementById('desk')
    let rectObj = desk.getBoundingClientRect()
    let initX = rectObj.x + 20
    let initY = rectObj.y + 20
    let index = ''
    for (let y = 0; y < 5; y++){
        for (let x = 0; x < 5; x++){
            let elem = document.elementFromPoint(initX+x*100, initY+y*100)
            if (!elem.id) {
                index += elem.parentNode.id
            }
            index += elem.id
        }
    }
    if (index == 'b1b2b3b4b5b6b7b8b9b10b11b12b13b14b15empty') {
        stop = true
        showWin()
    }
}


document.getElementById('desk').addEventListener('mousedown', clickHandler)
document.getElementById('start').addEventListener('click', shuffle)
document.onmousedown = document.onkeydown = document.onmousemove = document.ontouchmove = ()=> {return false}