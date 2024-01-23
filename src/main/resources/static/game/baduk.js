let baduk_order = 'black'
let baduk_array = []    // 1=black, 2=white

for(let y=0;y<19;y++){
    b = []
    for(let x=0;x<19;x++){
        b.push(0)
    }
    baduk_array.push(b)
}

$(function(){
    let t = ""
    for(let y=0;y<19;y++){
        t += "<tr>"
        for(let x=0;x<19;x++){
            t += "<td><div class='baduk-circle'></div></td>"
        }
        t += "</tr>"
    }
    document.querySelector(".baduk table").innerHTML = t

    let el = document.querySelectorAll(".baduk td")
    for(let i=0;i<el.length;i++){
        el[i].addEventListener("click",function(e){
            if(!el[i].innerHTML.includes("img")) {
                el[i].innerHTML = "<div class='baduk_img'><img src='/game/baduk_"+baduk_order+".png'></div>"
                baduk_array[parseInt(i/19)][i%19] = baduk_order === 'black' ? 1 : 2
                baduk_order = baduk_order === 'black' ? 'white' : 'black'
                document.documentElement.style.setProperty('--baduk-circle-color', baduk_order);
            }
        })


    }

})

function baduk_check(){
    for(let y=0;y<19;y++){
        for(let x=0;x<19;x++){

            if(baduk_array[y][x] === 1){

            }else if(baduk_array[y][x] === 2){

            }else{

            }

        }
    }
}