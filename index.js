const input = document.getElementById('input');
const placeholder = input.getAttribute('data-placeholder');
const list=document.getElementById('list');
let start = 0;
let flag = false;
let key='';
let sel=0;

(input.innerHTML = ' ') && (input.innerHTML = placeholder);

let database = [
    'Dharnish', 'Kavin_Prasanth',
    'Karthik', 'Jack',
    'Jackson', 'Master',
    'Shibu', 'Seena',
    'Nathun', 'Raja',
]

//Filtering Contact for Rendering In list Suggestion
let filterContacts = (database, search) => {
    const result = database.filter((k) => {
        return k.toLowerCase().includes(search.toLowerCase());
    })
    return result;
}


function atLast(input) {
    input.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(input);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(input);
        textRange.collapse(false);
        textRange.select();
    }
}

// creating span tag in div to make the @mention feature nice
let create_span = (current) => {
    let span = document.createElement('span');
    span.innerHTML ='#'+current+' ';
    span.setAttribute('contenteditable', 'false');
    span.setAttribute('class', 'mention');
    return span;
}

let renderList = (list_array,selected) => {
    list.innerHTML='';
    if (list_array.length>4) {
        list.classList.add('sc');
        if(list.classList.contains('hi')){
            list.classList.remove('hi');
        }
    } else {
        list.classList.add('hi');
        if(list.classList.contains('sc')){
            list.classList.remove('sc');
        }
    }
    for (let i = 0; i < list_array.length; i++) {
            let li=document.createElement('li');
            li.innerText=list_array[i];
            if(i===sel)
            li.setAttribute('id','current');
            li.onclick=(e)=>{
                kk(e,true);
            };
            list.appendChild(li);

    }
}
//reusable function for both click and enter keyboard event
function kk(e,y){
    let key;
    if(start-1===input.length){
        input.textContent=input.textContent.slice(0,input.textContent-1);
    }
    else{
        key=input.innerText.slice(start-1,input.length);
        input.innerHTML=input.innerHTML.replace(key,'');
    }
    y===true?input.append(create_span(e.target.innerText)):input.append(create_span(list.children[sel].innerText));
    input.innerHTML += '&#8203;';
    flag=false;
    list.innerHTML='';
    atLast(input);
}
input.addEventListener('keydown',(e)=>{
    if(e.key==='Enter' && flag===false){
        e.preventDefault();
        list.innerHTML=input.innerHTML;
        input.innerHTML='';
    }
    else if(e.key==='Enter' && flag===true){
        e.preventDefault();
        kk(e,false);
    }
    if(e.key==='ArrowUp'){
        if(sel>0){
            sel--;
            list.children[sel].scrollIntoView();
        }
    }
    else if(e.key==='ArrowDown'){
        if(sel<list.children.length-1){
            sel++;
            list.children[sel].scrollIntoView();
        }
    }
    else{
        sel=0;
    }
})


input.addEventListener('keyup', (e) => {
    if(input.innerText.length<start && flag===true){
        start=0;
        flag=false;
        list.innerHTML='';
    }
    if (flag === true ) {
        key = e.target.innerText.substring(start, e.target.innerText.length);
        renderList(filterContacts(database, key));
    }
    if (e.key === '@') {
        start = e.target.innerText.length;
        flag = true;
    }
    if (e.key === ' ') {
        flag = false;
    }
})

input.addEventListener('focus', (e) => {
    const value = e.target.innerHTML;
    (value === placeholder) && (e.target.innerHTML = ' ');
});

input.addEventListener('blur', (e) => {
    const value = e.target.innerHTML;
    (value === ' ') && (e.target.innerHTML = placeholder);
});

