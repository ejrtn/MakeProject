let sdoku_data = []

$(function(){
    document.addEventListener("click",function(e){
        if(e.target.className != "sdoku_write" && document.querySelectorAll(".sdoku_write").length > 0){
            document.querySelector(".sdoku_write").remove()
        }

    })
    document.querySelector(".sdoku-start").addEventListener("click",function(){
        let empty_number = document.querySelector(".sdoku-empty-number").value;
        if(empty_number >= 10 && empty_number <= 70){
            $.ajax({
                url: "sdoku_start",
                type: "POST",
                data:{empty:document.querySelector(".sdoku-empty-number").value},
                success: function (success) {
                    sdoku_data = success
                    sdoku_ui();
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }else{ 
            alert("범위를 넘어갔습니다")
        }
    })

    document.querySelector(".sdoku-reset").addEventListener("click",function(){sdoku_ui()})



    
})


function sdoku_ui(){
    let t = ''
    for(let y=0;y<sdoku_data.length;y++){
        t += "<tr>"
        for(let x=0;x<sdoku_data.length;x++){
            if(sdoku_data[y][x] === 0){
                t += "<td><input type='text' class='sdoku-write' oninput='this.value = this.value.replace(/[^0-9]/g, \"\")' maxlength='1'></td>"
            }else{
                t += "<td class='no_click'>"+sdoku_data[y][x]+"</td>"
            }
            
        }
        t += "</tr>"
    }
    document.querySelector(".sdoku table").innerHTML = t;

    let tr = document.querySelectorAll("tr")
    for(let y=0;y<tr.length;y++){
        let td = tr[y].querySelectorAll("td")
        for(let x=0;x<td.length;x++){
            if(td[x].innerHTML.includes("input")){
                td[x].querySelector(".sdoku-write").addEventListener("change",function(){duplicationCheck(this,y,x)})
                td[x].querySelector(".sdoku-write").addEventListener("keyup", function (event) {

                    if (event.defaultPrevented) {
                        return; // 이미 이벤트가 실행되는 중이라면 아무 동작도 하지 않습니다.
                    }

                    switch (event.key) {
                        case "Enter": // IE/Edge에서 사용되는 값
                        case "ArrowEnter":
                            duplicationCheck(this,y,x)

                            break;
                        default:
                            return; // 키 이벤트를 처리하지 않는다면 종료합니다.
                    }

                    // 두 번 동작하는 것을 막기 위해 기본 동작을 취소합니다.
                    event.preventDefault();
                    },
                    true,
                )
            }
        }
    }
}

function duplicationCheck(e,yy,xx){

    let el = document.querySelectorAll(".sdoku table tr");
    let yx;
    let result = []
    for(let y=0;y<el.length;y++){
        let r = []
        let el2 = el[y].querySelectorAll("td")
        for(let x=0;x<el2.length;x++){
            if(el2[x].innerHTML.includes("input")){
                r.push(el2[x].querySelector("input").value === '' ? '0' : el2[x].querySelector("input").value)
            }else{
                r.push(el2[x].textContent)
            }
            
        }
        result.push(r)
    }
    result[yy][xx] = '0'

    $.ajax({
        url: "duplication_check",
        type: "POST",
        data : {
            'result' : result,
            'x' : parseInt(xx),
            'y' : parseInt(yy),
            'num' : parseInt(e.value)
        },
        success: function (success) {
            if(success){
                e.style.color = '#eeeeee'
                if(game_result()){
                    alert("성공")
                }
            }else{
                e.style.color = '#ff0000'
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function game_result(){
    let tr = document.querySelectorAll("tr")
    for(let y=0;y<tr.length;y++){
        let td = tr[y].querySelectorAll("td")
        for(let x=0;x<td.length;x++){
            if(td[x].innerHTML.includes("input") && td[x].querySelector("input").value === ''){
                return false;
            }
        }
    }
    return true;
}