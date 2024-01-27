
let bloks = {
    1:{
        1:[[0,0],[0,1],[1,0],[1,1]],
        'color':"#ffffff"
    },
    2:{
        1:[[0,1],[0,2],[0,3],[0,4]],
        2:[[0,1],[1,1],[2,1],[3,1]],
        'color':"#ff0000"
    },
    3:{
        1:[[0,0],[0,1],[1,1],[1,2]],
        2:[[0,1],[1,0],[1,1],[2,0]],
        'color':"#00ff00"
    },
    4:{
        1:[[0,1],[0,2],[1,0],[1,1]],
        2:[[0,0],[1,0],[1,1],[2,1]],
        'color':"#ffff00"
    },
    5:{
        1:[[1,0],[2,0],[2,1],[2,2]],
        2:[[0,0],[0,1],[1,0],[2,0]],
        3:[[0,0],[0,1],[0,2],[1,2]],
        4:[[0,2],[1,2],[2,1],[2,2]],
        'color':"#ff9800"
    },
    6:{
        1:[[1,2],[2,0],[2,1],[2,2]],
        2:[[0,0],[1,0],[2,0],[2,1]],
        3:[[0,0],[0,1],[0,2],[1,0]],
        4:[[0,1],[0,2],[1,2],[2,2]],
        'color':"#0000ff"
    },
    7:{
        1:[[0,1],[1,0],[1,1],[1,2]],
        2:[[1,1],[0,1],[1,2],[2,1]],
        3:[[1,0],[1,1],[1,2],[2,1]],
        4:[[0,1],[1,0],[1,1],[2,1]],
        'color':"#9c27b0"
    }
}


let array_background = []
let array = []
let down_ing = true
let speed = 500
let level_max = 5
let level = 1
let random;       // 블록 랜덤생성 하기 위한 값
let intervalID;
let size = 25;
let move_y = 0;
let move_x = 9;
let blok_turn = 1;

for(let y=0;y<34;y++){
    a = []
    for(let x=0;x<20;x++){
        if( (x === 0 || x === 19) || y === 33 ){
            a.push({'data':1,'color':'#ffffff'})
        }else{
            a.push({'data':0,'color':'#ffffff'})
        }
    }
    array_background.push(a);
}

function create_array(){
    let result = []

    for(let y=0;y<34;y++){
        a = []
        for(let x=0;x<20;x++){
            if( (x === 0 || x === 19) || y === 33 ){
                a.push(1)
            }else{
                a.push(0)
            }
        }
        result.push(a);
    }
    return result;
}

function create_table(color){
    let t = ''
    for(let y=1;y<33;y++){
        t += '<tr>'
        for(let x=1;x<19;x++){
            if(array[y][x] === 1){
                t += '<td style="background-color:'+color+'"> </td>'
            }else{
                t += '<td> </td>'
            }
        }
        t += '</tr>'
    }
    return t
}
array = create_array();
document.querySelector('.new-blok').innerHTML=create_table("#121213") // 초기화


function blok_move(ran,x,y,c,k) {
    if(c > 4){
        c = 1
    }
    let result = null;
    if(ran==1) result = clash_check(ran,x,y,1,k);
    if(ran == 2 || ran == 3 || ran == 4) result = clash_check(ran,x,y,c%2+1,k);
    if(ran == 5 || ran == 6 || ran == 7) result = clash_check(ran,x,y,c,k);


    if(result === 1){
        if(ran==1) blok(ran,x,y,1);
        if(ran == 2 || ran == 3 || ran == 4) blok(ran,x,y,c%2+1);
        if(ran == 5 || ran == 6 || ran == 7) blok(ran,x,y,c);
        
        move_y = y
        move_x = x
        blok_turn = c
    }else if(result === -1){
        down_ing = false
        if(ran==1) blok_save(ran,x,y,1);
        if(ran == 2 || ran == 3 || ran == 4) blok_save(ran,x,y,c%2+1);
        if(ran == 5 || ran == 6 || ran == 7) blok_save(ran,x,y,c);

        move_y = 0;
        move_x = 9;
        random = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    }
    
    if(result != -1){
        document.querySelector('.new-blok').innerHTML=create_table(bloks[random]['color']) // 초기화
    }
    return result
}

function tetris_loop(){
    intervalID = setInterval(function(){
        blok_move(random,move_x,move_y+1,blok_turn,'down');
        level += 1
        if(level < 20){
            speed = 500
        }else if(level < 40){
            speed = 400
        }else if(level < 60){
            speed = 300
        }else{
            speed = 200
        }
    }, speed);
}

function tetris_start(){
    random = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    speed = 500;
    move_y = 0;
    move_x = 9;

    array = create_array();
    array_background = [];
    for(let y=0;y<34;y++){
        a = []
        for(let x=0;x<20;x++){
            if( (x === 0 || x === 19) || y === 33 ){
                a.push({'data':1,'color':'#ffffff'})
            }else{
                a.push({'data':0,'color':'#ffffff'})
            }
        }
        array_background.push(a);
    }
    document.querySelector('.old-blok').innerHTML=create_table(bloks[random]['color']) // 초기화
    tetris_loop();
}

document.querySelector(".tetris_start").addEventListener("click",function(){
    if(!tetris_ing){
        let talkMsg={"type" : "TALK","roomId":roomIds.tetris ,"sender":nickname,"message":"start tetris?"};
        socket.send(JSON.stringify(talkMsg));
    }
})

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return; // 이미 이벤트가 실행되는 중이라면 아무 동작도 하지 않습니다.
    }

    switch (event.key) {
        case "Down": // IE/Edge에서 사용되는 값
        case "ArrowDown":
            // "아래 화살표" 키가 눌렸을 때의 동작입니다.
            // 블록이 밑으로 빨리 내려오기
            if(page_click === 'tetris') tetris_loop();
            break;
        default:
            return; // 키 이벤트를 처리하지 않는다면 종료합니다.
    }

    // 두 번 동작하는 것을 막기 위해 기본 동작을 취소합니다.
    event.preventDefault();
    },
    true,
)

window.addEventListener("keydown", function (event) {
    
    switch (event.key) {
        
        case "Down": // IE/Edge에서 사용되는 값
        case "ArrowDown":
            // "아래 화살표" 키가 눌렸을 때의 동작입니다.
            // 블록이 밑으로 빨리 내려오기
            if(page_click === 'tetris'){
                clearInterval(intervalID)
                blok_move(random,move_x,move_y+1,blok_turn,'down');
            }

            break;
        case "Up": // IE/Edge에서 사용되는 값
        case "ArrowUp":
            // "위 화살표" 키가 눌렸을 때의 동작입니다.
            // 블록 시계방향으로 회전
            if(page_click === 'tetris') blok_move(random,move_x,move_y,blok_turn+1,'up');
            break;
        case "Left": // IE/Edge에서 사용되는 값
        case "ArrowLeft":
            // "왼쪽 화살표" 키가 눌렸을 때의 동작입니다.
            // 블록 왼쪽으로 이동
            if(page_click === 'tetris') blok_move(random,move_x-1,move_y,blok_turn,'left')
            break;
        case "Right": // IE/Edge에서 사용되는 값
        case "ArrowRight":
            // "오른쪽 화살표" 키가 눌렸을 때의 동작입니다.
            // 블록 오른쪽으로 이동
            if(page_click === 'tetris') blok_move(random,move_x+1,move_y,blok_turn,'right')
            break;
        case "Space":
        case " ":
            if(page_click === 'tetris'){
                while(1){
                    let result = null;
                    if(random==1) result = clash_check(random,move_x,move_y+1,1,'down');
                    if(random == 2 || random == 3 || random == 4) result = clash_check(random,move_x,move_y+1,blok_turn%2+1,'down');
                    if(random == 5 || random == 6 || random == 7) result = clash_check(random,move_x,move_y+1,blok_turn,'down');

                    if(result === 1){
                        move_y += 1
                    }

                    if(result === -1){
                        blok_move(random,move_x,move_y,blok_turn,'space')
                        break;
                    }
                    if(result === 0){
                        break;
                    }
                }
            }
            break;
        default:
            return; // 키 이벤트를 처리하지 않는다면 종료합니다.
    }

    // 두 번 동작하는 것을 막기 위해 기본 동작을 취소합니다.
    event.preventDefault();
    },
    true,
);

/**
 * bloks값을 토대로 블록 생성 및 회전
 * 
 * @param {number} key 블록 선택값
 * @param {number} x x축 이동 값
 * @param {number} y y축 이동 값
 * @param {number} c 블록 선택 후 회전값
 * */
function blok(key,x,y,c){
    array = create_array(bloks[key]['color']);
    array[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])] = 1
    array[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])] = 1
    array[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])] = 1
    array[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])] = 1
}

/**
 * 블록 위치 저장 함수
 * 
 * 
 * */
function blok_save(key,x,y,c){
    
    array_background[(y+bloks[key][c][0][0]-1)][(x+bloks[key][c][0][1])]['data'] = 1
    array_background[(y+bloks[key][c][0][0]-1)][(x+bloks[key][c][0][1])]['color'] = bloks[key]['color']
    array_background[(y+bloks[key][c][1][0]-1)][(x+bloks[key][c][1][1])]['data'] = 1
    array_background[(y+bloks[key][c][1][0]-1)][(x+bloks[key][c][1][1])]['color'] = bloks[key]['color']
    array_background[(y+bloks[key][c][2][0]-1)][(x+bloks[key][c][2][1])]['data'] = 1
    array_background[(y+bloks[key][c][2][0]-1)][(x+bloks[key][c][2][1])]['color'] = bloks[key]['color']
    array_background[(y+bloks[key][c][3][0]-1)][(x+bloks[key][c][3][1])]['data'] = 1
    array_background[(y+bloks[key][c][3][0]-1)][(x+bloks[key][c][3][1])]['color'] = bloks[key]['color']

    line_clear()
    
    background_ui();
    down_ing = true
}

// 백그라운드 ui 생성
function background_ui(){
    t = ''
    for(let y=1;y<33;y++){
        t += '<tr>'
        for(let x=1;x<19;x++){
            if(array_background[y][x]['data']==1){
                t += '<td style="background-color:'+array_background[y][x]['color']+'"> </td>'
            }else{
                t += '<td> </td>'
            }
        }
        t += '</tr>'
    }
    document.querySelector('.old-blok').innerHTML=t
}

function clash_check(key,x,y,c,k){

    if(array_background[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])]['data'] === 1
        || array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
        || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
        || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){

        if(k === 'down'){
            
            if(key === 1){
                if(array_background[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])]['data'] != 1 
                    || array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] != 1){
                    return -1
                }
            }else if(key === 2){
                if(array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                                return -1
                }
            }else if(key === 3){
                if(array_background[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])]['data'] === 1
                    || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                    || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                        return -1
                }else if(array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }
            }else if(key === 4){
                if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                    || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                    || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }
            }else if(key === 5){
                if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                        || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                        || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                            return -1
                }else if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }
            }else if(key === 6){
                if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                        || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                        || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                            return -1
                }else if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                                return -1
                }else if(array_background[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }
            }else{
                if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                        || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                        || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][0][0])][(x+bloks[key][c][0][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][2][0])][(x+bloks[key][c][2][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }else if(array_background[(y+bloks[key][c][1][0])][(x+bloks[key][c][1][1])]['data'] === 1
                            || array_background[(y+bloks[key][c][3][0])][(x+bloks[key][c][3][1])]['data'] === 1){
                    return -1
                }
            }
        }
        return 0
    }
    return 1
}

function line_clear(){
    let ch = false
    for(let x=1;x<19;x++){
        if(array_background[0][x]['data'] === 1){
            ch = true
        }
    }
    if(ch){
        alert("게임 오버")
        clearInterval(intervalID)
    }


    let s_array = []
    for(let y=1;y<33;y++){
        let c = 0
        for(let x=1;x<19;x++){
            if(array_background[y][x]['data'] === 1){
                c += 1
            }
        }
        if(c === 18){
            s_array.push(y)
            for(let x=1;x<19;x++){
                if(array_background[y][x]['data'] === 1){
                    array_background[y][x]['data'] = 0
                    array_background[y][x]['color'] = '#ffffff'
                }
            }
        }
    }

    if(s_array.length>0){
        let new_array_background = []
        for(let y=0;y<s_array.length;y++){
            a = []
            for(let x=0;x<20;x++){
                if(x===0 || x===19) a.push({'data':1,'color':'#ffffff'})
                else a.push({'data':0,'color':'#ffffff'})
            }
            new_array_background.push(a);
        }
        
        for(let y=0;y<34;y++){
            if(y < s_array[0] || y > s_array[s_array.length-1]) new_array_background.push(array_background[y]);
        }
        array_background = new_array_background
        document.querySelector(".line-cnt").textContent = parseInt(document.querySelector(".line-cnt").textContent) + s_array.length
        tetris_send(s_array)
    }
}

function tetris_send(content){

    result = ""
    for(let c=0;c<content.length;c++){
        let s_array = []
        let r = []
        for(let i=0;i<20;i++){
            r.push(1)
        }
        for(let i=0;i<5;i++){
            let ran = Math.floor(Math.random() * 18) + 1
            let ch = 1
            for(let a=0;a<s_array.length;a++){
                if(s_array[a] == ran){
                    ch = 0;
                }
            }
            if(ch == 1){
                s_array.push(ran)
                r[ran] = 0
            }else{
                i--;
            }
        }
        result += JSON.stringify(r)+"/"
    }



    let talkMsg={"type" : "TALK","roomId":roomIds.tetris ,"sender":nickname,"message":JSON.stringify(result)+"line_clear"};
    socket.send(JSON.stringify(talkMsg));
}

document.querySelector(".tetris_ok").addEventListener("click",function(){
    document.querySelector(".tetris_modal p").style.display = "none"
    let talkMsg={"type" : "TALK","roomId":roomIds.tetris ,"sender":nickname,"message":"tetris ok"};
    socket.send(JSON.stringify(talkMsg));
})
document.querySelector(".tetris_no").addEventListener("click",function(){
    let talkMsg={"type" : "TALK","roomId":roomIds.tetris ,"sender":nickname,"message":"tetris no"};
    socket.send(JSON.stringify(talkMsg));
})