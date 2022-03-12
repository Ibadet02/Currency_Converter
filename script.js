const select_1=document.querySelector(".select-1")
const select_2=document.querySelector(".select-2")
const searchs=[select_1,select_2]
const first_field=document.querySelector(".first-field")
const second_field=document.querySelector(".second-field")
const ul=document.getElementsByTagName("ul")
const input1=document.getElementById("howmuch1")
const input2=document.getElementById("howmuch2")
var rect1=select_1.getBoundingClientRect()
var rect2=select_2.getBoundingClientRect()
ul[0].style.width=select_1.offsetWidth+"px"
ul[1].style.width=select_2.offsetWidth+"px"
ul[0].style.top=`${rect1.bottom}px`
ul[1].style.top=`${rect2.bottom}px`
window.addEventListener("resize",function(){
    var rect1=select_1.getBoundingClientRect()
    var rect2=select_2.getBoundingClientRect()
    ul[0].style.width=select_1.offsetWidth+"px"
    ul[1].style.width=select_2.offsetWidth+"px"
    ul[0].style.top=`${rect1.bottom}px`
    ul[1].style.top=`${rect2.bottom}px`
})
function resetValue(our_target){
}
fetch("http://api.currencylayer.com/live?access_key=73bf56e7d27046f947f1da3b4156f833&format=1")
    .then(response=>response.json())
    .then(data=>Object.keys(data.quotes).map(el=>el.replace("USD","")).forEach(el=>{
        const list=this.document.createElement("li")
        const strong=this.document.createElement("strong")
        list.appendChild(strong)
        strong.innerText=el
        list.style.width="100%"
        list.style.cursor="pointer"
        var new_list=list.cloneNode(true)
        ul[1].appendChild(list)
        ul[0].appendChild(new_list)
    }))

window.addEventListener("click",function(e){
    if(e.target!=select_1){
        select_1.style.background="#ccc"
        select_1.style.cursor="pointer"
        select_1.parentElement.querySelector("ul").style.display="none"
        
    }
    if(e.target!=select_2){
        select_2.style.background="#ccc"
        select_2.style.cursor="pointer"
        select_2.parentElement.querySelector("ul").style.display="none"
    }
    if(e.target==select_1 || e.target==select_2){
        e.target.parentElement.querySelector("ul").style.display="block"
        e.target.style.cursor="text"
        e.target.style.background="white"
        e.target.parentElement.querySelector("ul").querySelectorAll("li").forEach(list=>{
            list.addEventListener("click",function(){
                e.target.value=list.querySelector("strong").innerText
                
            })
        })
        e.target.addEventListener("keyup",function(){
            var lists=e.target.parentElement.querySelector("ul").querySelectorAll("li")
            var strong,txt_value
            var filter=e.target.value.toUpperCase()
            lists.forEach(list=>{
                strong=list.querySelector("strong")
                txt_value=strong.textContent || strong.innerText
                if(txt_value.toUpperCase().indexOf(filter)>-1){
                    list.style.display="block"
                }
                else{
                    list.style.display="none"
                }
            })
        })
    }
})
input1.addEventListener("keyup",function(){
    var val1="USD"+select_1.value
    var val2="USD"+select_2.value
    fetch("http://api.currencylayer.com/live?access_key=73bf56e7d27046f947f1da3b4156f833&format=1")
    .then(response=>response.json())
    .then(data=>{
        var res1=1/data.quotes[val1]*input1.value
        var res2=1/data.quotes[val2]
        input2.value=res1/res2
    })
})
input2.addEventListener("keyup",function(){
    var val1="USD"+select_1.value
    var val2="USD"+select_2.value
    fetch("http://api.currencylayer.com/live?access_key=73bf56e7d27046f947f1da3b4156f833&format=1")
    .then(response=>response.json())
    .then(data=>{
        var res2=1/data.quotes[val2]*input2.value
        var res1=1/data.quotes[val1]
        input1.value=res2/res1
    })
})

