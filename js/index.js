//hw-11-01----------------------------
// Предварительная подготовка:
// Создать файл с данными в формате JSON
// Это должен быть массив объектов с двумя свойствами: title и ref
//  title - название картинки
//  ref - ссылка на картинку
//  Задание:
// • Загрузить данные из JSON-файла
// • Распарсить данные в массив
// • Вывести на страницу картинки и подписи к ним
//------------------------------------

//------------------------------------
// Ссылка на рабочую страницу:
// https://michaelazarov.github.io/homework11-01/
//------------------------------------
const request = new XMLHttpRequest ()
let images = null

request.open ( "GET", "json/images.json" )
request.send ()

new Promise (
    ( resolve, reject ) => {
        request.onreadystatechange = function () {
            this.readyState === 4 
                ? this.status === 200 
                    ? resolve( this.responseText )
                    : reject ( new Error ('Not received responseText')  )
                : null
                
        }
    }
)
 .then ( data => {         
             JSON.parse(data).forEach( item => createWindowImages (item) )
         } 
 )
 .catch ( err => console.warn ( err ) )

function createWindowImages (obj) {
  elemImg = document.body.firstElementChild.appendChild(document.createElement('img'))
  elemImg.className = "img"
  elemImg.src = obj.ref
  elemImg.style = `width: 100px; height: 100px;`  
  elemPOut = document.body.firstElementChild.appendChild(document.createElement('p'))
  elemPOut.className = "sign"
  elemPOut.innerHTML = obj.title
}

//hw-11-02----------------------------
// Задача: напилить код, который вызывает функцию sendMessage
// для каждого элемента массива messages и логирует полученные 
// сообщения в объекте log следующим образом:
// log
// {
//     22:25:57: "backspace"
//     22:25:58: "shift"
//     22:25:59: "subtract"
//     22:25:59[2]: "enter"
//     22:25:59[3]: "delete"
//     22:26:01: "control"
//     22:26:01[2]: "space"
// }
//------------------------------------

var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? log [ key + "[2]" ] ? key + "[3]" : key + "[2]" : key
}

var log = {}

var sendMessage = message => new Promise (
    resolve => setTimeout (() => resolve ( message ),  Math.random () * 7000 )
) 

messages.forEach( item => {
        sendMessage(item).then ( 
            message => log[messages.getKey()] = message 
        )
   }
)

//hw-11-03----------------------------
// Изменим условие предыдущего задания
// Массив messages, объект log и функция sendMessage остаются теми же
// Немного изменится метод getKey:
// messages.getKey = () => new Date().toLocaleString().split(", ")[1]
// Нужно напилить код рекурсивной функции recursive, 
// которая вызывает sendMessage поочередно с каждым элементом массива 
// messages, но только после того, как предыдущий месседж будет
// залогирован в объекте log
// var sendAll = () => {
//     var index = 0
//     function recursive () {
//         ...
//     }
//     recursive ()
// }
// sendAll()
//------------------------------------

//Вариант 1
var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => new Date().toLocaleString().split(", ")[1]

var log = {}

var sendMessage = message => new Promise (
    resolve => setTimeout (() => resolve ( message ),  Math.random () * 7000 )
) 

var sendAll = () => {
    var index = 0
    function recursive () { 
        if (messages.length === index) return console.log(log); 
        sendMessage(messages[index++]).then ( 
            message => {log[messages.getKey()] = message
                recursive () 
            }    
        )
    }
    recursive ()
}

sendAll()

//-----------------
//Вариант 2
var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => new Date().toLocaleString().split(", ")[1]

var log = {}

var sendMessage = message => new Promise (
    resolve => setTimeout (() => resolve ( message ),  Math.random () * 7000 )
) 

var sendAll = () => {
    var index = 0
    function recursive () { 
         sendMessage(messages[index++]).then ( 
            message => {log[messages.getKey()] = message
                if (!message) return console.log(log)
                recursive () 
            }    
        )
    }
    recursive ()
}

sendAll()
