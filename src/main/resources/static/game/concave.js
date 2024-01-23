let concave_order = 'black'
let concave_array = []    // 1=black, 2=white

for(let y=0;y<19;y++){
    b = []
    for(let x=0;x<19;x++){
        b.push(0)
    }
    concave_array.push(b)
}

$(function(){
    let t = ""
    for(let y=0;y<19;y++){
        t += "<tr>"
        for(let x=0;x<19;x++){
            t += "<td><div class='concave-circle'></div></td>"
        }
        t += "</tr>"
    }
    document.querySelector(".concave table").innerHTML = t

    let el = document.querySelectorAll(".concave td")
    for(let i=0;i<el.length;i++){
        el[i].addEventListener("click",function(e){
            if(!el[i].innerHTML.includes("img")) {
                el[i].innerHTML = "<div class='baduk_img'><img src='/game/baduk_"+baduk_order+".png'></div>"
                concave_array[parseInt(i/19)][i%19] = baduk_order === 'black' ? 1 : 2
                baduk_order = baduk_order === 'black' ? 'white' : 'black'
            }
        })
    }
})