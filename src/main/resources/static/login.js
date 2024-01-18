$(function () {
    document.querySelector(".nickname").addEventListener("change", (e) => {findByNickname(e)});
    document.querySelector(".pw").addEventListener("change", (e) => {pwCheck(e)});

    document.querySelector(".result .ok").addEventListener("click",(e)=>{
        let ch = 1;
        const el = document.querySelectorAll("label");
        for(let i=0;i<el.length;i++){
            if(e.target.textContent != ""){
                if(el[i].className === 'nickname'){findById(el[i])}
                else if(el[i].className === 'pw'){pwCheck(el[i])}
                el[i].focus()
                break;
            }
        }
        if(ch === 1){

            $.ajax({
                url: "loginCheck",
                type: "POST",
                data: { "nickname": document.querySelector(".nickname").value, "pw": document.querySelector(".pw").value },
                success: function (success) {
                    if (success === "") {
                        alert("등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다")
                    } else {
                        location.href = '/'
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }
    })
})
function pwCheck(e) {
    if (e.target.value === "") {
        e.target.style.border = "1px solid red"
        e.target.nextElementSibling.style.color = 'red'
        e.target.nextElementSibling.textContent = '비밀번호를 입력해주세요'
    } else {
        e.target.style.border = "1px solid blue"
        e.target.nextElementSibling.textContent = ''
    }
}
function findByNickname(e) {
    if (e.target.value === "") {
        e.target.style.border = "1px solid red"
        e.target.nextElementSibling.style.color = 'red'
        e.target.nextElementSibling.textContent = '닉네임을 입력해주세요'
    } else {
        e.target.style.border = "1px solid blue"
        e.target.nextElementSibling.textContent = ''
    }
}