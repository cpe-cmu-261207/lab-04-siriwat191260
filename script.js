const firstDiv = document.createElement('div')
firstDiv.setAttribute('class', 'max-w-lg mx-auto text-xl')
const secondDiv = document.createElement('div')
secondDiv.setAttribute('class', 'max-w-lg mx-auto p-1 text-xl bg-gray-200 rounded-xl shadow-md')

// Input
let currentInput = ""
const listInput = (ev) => {
    currentInput = ev.target.value
}

// Enter
const input = document.getElementById("myinput")
input.addEventListener('keyup', (ev) => {
    if (ev.key === 'Enter') {
        ev.preventDefault()
        document.getElementById('mybutton').click()
    }
})

let listadd = { dolist:[]}

if (localStorage.length === 0) {
    window.localStorage.setItem('done', 0)
    window.localStorage.setItem('list', 0)
}

// addlist
const addlist = (backup) => {
    
    const task = document.createElement('p')
    task.setAttribute('class', 'group flex justify-between p-2 border-b-2 transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out rounded-xl hover:shadow-lg bg-white')
    const span = document.createElement('p')
    const btndiv = document.createElement('div')
    btndiv.setAttribute('class', 'space-x-4')
    if (currentInput != "") {
        span.innerHTML = currentInput
        if(backup === 0)
        {
            listadd.dolist.push(currentInput)
            localStorage.listadd = JSON.stringify(listadd)
        }
        task.append(span)
        input.value=""
        currentInput = ""

        // done button
        const donBtn = document.createElement('button')
        donBtn.setAttribute('class', 'text-white group-hover:bg-green-200 group-hover:text-black pr-4 pl-4 text-lg rounded-lg  transform hover:-translate-y-1 hover:scale-100 transition duration-500 rounded-xl')
        donBtn.innerHTML = "Done"
        donBtn.addEventListener('click', () => {
            const del = document.createElement('del')
            let test = localStorage.getItem('done')
            window.localStorage.setItem('key' + test,[ span.innerHTML])
            del.innerHTML = localStorage.getItem('key' + test)
            test++
            window.localStorage.setItem('done', test)
            
            listadd.dolist.splice(listadd.dolist.indexOf(del.innerHTML),1)
            localStorage.listadd = JSON.stringify(listadd)
            del.append(document.createElement('br'))
            secondDiv.prepend(del)
            firstDiv.removeChild(task)

        })

        
        //delete button
        const delBtn = document.createElement('button')
        delBtn.setAttribute('class', 'text-white  group-hover:bg-red-300 group-hover:text-black pr-3 pl-3  text-lg rounded-lg transform hover:-translate-y-1 hover:scale-100 transition duration-500  rounded-xl')
        delBtn.innerHTML = "Delete"
        delBtn.addEventListener('click', () => {
            listadd.dolist.splice(listadd.dolist.indexOf(span.innerHTML),1)
            localStorage.listadd = JSON.stringify(listadd)
            firstDiv.removeChild(task)
        })

        btndiv.append(donBtn)
        btndiv.append(delBtn)
        task.append(btndiv)
        firstDiv.prepend(task)
        document.body.append(firstDiv)
        document.body.append(secondDiv)
    }
    else {
        alert("List cannot be empty")
    }
}


const DoneList = () =>{
    for (let i = 0; i <localStorage.getItem('done'); i++) {
        if (localStorage.getItem('key' + i )!== null) {
            const del1 = document.createElement('del')
            del1.innerHTML = localStorage.getItem('key' + i)
            del1.append(document.createElement('br'))
            secondDiv.prepend(del1)
        }
    }
    document.body.append(secondDiv)
}
const Dolist = () => {
    if(localStorage.listadd)
    {
        listadd = JSON.parse(localStorage.listadd)
    }
    for(let i = 0 ; i< listadd.dolist.length;i++)
    {
        currentInput = listadd.dolist[i]
        addlist(1)
    }
}

Dolist()
DoneList()