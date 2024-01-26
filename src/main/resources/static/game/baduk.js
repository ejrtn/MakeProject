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

                die = baduk_check(i)
                console.log(die)
                if(die != '착수 불가'){

                    baduk_array[parseInt(i/19)][i%19] = baduk_order === 'black' ? 1 : 2
                    die_cnt = 0

                    for(key in die){
                        y = key.split(",")[0]
                        x = key.split(",")[1]
                        document.querySelectorAll(".baduk tr")[y].querySelectorAll("td")[x].innerHTML = "<div class='baduk-circle'></div>"
                        baduk_array[y][x] = 0
                        die_cnt += 1
                    }

                    
                    el[i].innerHTML = "<div class='baduk_img'><img src='/game/baduk_"+baduk_order+".png'></div>"
                    baduk_order = baduk_order === 'black' ? 'white' : 'black'
                    document.documentElement.style.setProperty('--baduk-circle-color', baduk_order);
                    document.querySelector(".baduk_die_"+baduk_order).textContent = parseInt(document.querySelector(".baduk_die_"+baduk_order).textContent) + die_cnt
                }
            }
        })


    }

})

// 딴돌 체크
function baduk_check(i){
    let new_baduk_array = baduk_array
    new_baduk_array[parseInt(i/19)][i%19] = baduk_order === 'black' ? 1 : 2
    result = {}
    for(let y=0;y<19;y++){
        for(let x=0;x<19;x++){
            let check = baduk_left_check(y,x,new_baduk_array[y][x],'left')
            if(check=='close') check = baduk_right_check(y,x,new_baduk_array[y][x],'right')
            if(check=='close') check = baduk_up_check(y,x,new_baduk_array[y][x],'up')
            if(check=='close') check = baduk_down_check(y,x,new_baduk_array[y][x],'down')
            if(check=='close'){
                result[y+","+x+","+baduk_order]=new_baduk_array[y][x]
            }
        }
    }

    if(Object.keys(result).length > 1){
        let ch = 1
        for(key in result){
            if(result[key] != result[Object.keys(result)[0]]){
                for(key in result){
                    y = key.split(",")[0]
                    x = key.split(",")[1]
                    if(key.split(",")[2] === 'black' && result[key] == 1){
                        delete result[key]
                    }
                    if(key.split(",")[2] === 'white' && result[key] == 2){
                        delete result[key]
                    }
                }
                ch = 0
                break;
            }
        }
        if(ch == 1) result = click_impossible(result);
    }else{
        result = click_impossible(result);
    }
    console.log(result)
    return result;
}

// 착수 불가
function click_impossible(result){
    let ch = true

    for(key in result){
        y = key.split(",")[0]
        x = key.split(",")[1]
        if(key.split(",")[2] === 'black' && result[key] == 1){
            ch = false
        }
        if(key.split(",")[2] === 'white' && result[key] == 2){
            ch = false
        }
    }
    if(!ch){
        alert("착수 불가")
        result = {}
        return "착수 불가"
    }
    return result;
}

// 오른쪽 라인 딴돌 확인
function baduk_right_check(y,x,num,start_type){
    if(num == 1){
        let check = 'open'
        if(x+1 < 19){
            if(baduk_array[y][x+1] == 2) {
                check = 'close'
            }else if(baduk_array[y][x+1]==1){
                check = baduk_right_check(y,x+1,num,start_type)
                if(check=='close' && start_type != 'down') check = baduk_up_check(y,x+1,num,start_type)
                if(check=='close' && start_type != 'up') check = baduk_down_check(y,x+1,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }else if(num == 2){
        let check = 'open'
        if(x+1 < 19){
            if(baduk_array[y][x+1] == 1){
                check = 'close'
            }else if(baduk_array[y][x+1]==2){
                check = baduk_right_check(y,x+1,num,start_type)
                if(check=='close' && start_type != 'down') check = baduk_up_check(y,x+1,num,start_type)
                if(check=='close' && start_type != 'up') check = baduk_down_check(y,x+1,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }
    return 'open'
}

// 왼쪽 라인 딴돌 확인
function baduk_left_check(y,x,num,start_type){
    if(num == 1){
        let check = 'open'
        if(x-1 > -1){
            if(baduk_array[y][x-1] == 2){
                check = 'close'
            }else if(baduk_array[y][x-1]==1){
                check = baduk_left_check(y,x-1,num,start_type)
                if(check=='close' && start_type != 'down') check = baduk_up_check(y,x-1,num,start_type)
                if(check=='close' && start_type != 'up') check = baduk_down_check(y,x-1,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }else if(num == 2){
        let check = 'open'
        if(x-1 > -1){
            if(baduk_array[y][x-1] == 1){
                check = 'close'
            }else if(baduk_array[y][x-1]==2){
                check = baduk_left_check(y,x-1,num,start_type)
                if(check=='close' && start_type != 'down') check = baduk_up_check(y,x-1,num,start_type)
                if(check=='close' && start_type != 'up') check = baduk_down_check(y,x-1,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }
    return 'open'
}

// 위쪽 라인 딴돌 확인
function baduk_up_check(y,x,num,start_type){
    if(num == 1){
        let check = 'open'
        if(y-1 > -1){
            if(baduk_array[y-1][x] == 2){
                check = 'close'
            }else if(baduk_array[y-1][x]==1){
                check = baduk_up_check(y-1,x,num,start_type)
                if(check=='close' && start_type != 'left') check = baduk_right_check(y-1,x,num,start_type)
                if(check=='close' && start_type != 'right') check = baduk_left_check(y-1,x,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }else if(num == 2){
        let check = 'open'
        if(y-1 > -1){
            if(baduk_array[y-1][x] == 1){
                check = 'close'
            }else if(baduk_array[y-1][x]==2){
                check = baduk_up_check(y-1,x,num,start_type)
                if(check=='close' && start_type != 'left') check = baduk_right_check(y-1,x,num,start_type)
                if(check=='close' && start_type != 'right') check = baduk_left_check(y-1,x,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }
    return 'open'
}

// 아래쪽 라인 딴돌 확인
function baduk_down_check(y,x,num,start_type){
    if(num == 1){
        let check = 'open'
        if(y+1 < 19){
            if(baduk_array[y+1][x] == 2){
                check = 'close'
            }else if(baduk_array[y+1][x]==1){
                check = baduk_down_check(y+1,x,num,start_type)
                if(check=='close' && start_type != 'left') check = baduk_right_check(y+1,x,num,start_type)
                if(check=='close' && start_type != 'right') check = baduk_left_check(y+1,x,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }else if(num == 2){
        let check = 'open'
        if(y+1 < 19){
            if(baduk_array[y+1][x] == 1){
                check = 'close'
            }else if(baduk_array[y+1][x]==2){
                check = baduk_down_check(y+1,x,num,start_type)
                if(check=='close' && start_type != 'left') check = baduk_right_check(y+1,x,num,start_type)
                if(check=='close' && start_type != 'right') check = baduk_left_check(y+1,x,num,start_type)
            }
        }else{
            check = 'close'
        }
        return check
    }
    return 'open'
}