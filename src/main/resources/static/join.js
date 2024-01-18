$(function () {
    document.querySelector(".nickname").addEventListener("change", (e) => {findByNickname(e)});
    document.querySelector(".pw").addEventListener("change", (e) => {pwCheck(e)});
    document.querySelector(".pwd").addEventListener("change", (e) => {pwdCheck(e)});
    document.querySelector(".result .ok").addEventListener("click",(e)=>{
        let ch = 1;
        const el = document.querySelectorAll("label");
        for(let i=0;i<el.length;i++){
            if(e.target.textContent != ""){
                if(el[i].className === 'nickname'){findById(el[i])}
                else if(el[i].className === 'pw'){pwCheck(el[i])}
                else if(el[i].className === 'pwd'){pwdCheck(el[i])}
                el[i].focus()
                break;
            }
        }
        if(ch === 1){
            document.querySelector("form #nickname").value = document.querySelector(".nickname").value
            document.querySelector("form #pw").value = document.querySelector(".pw").value
            document.querySelector("form").submit()
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
function pwdCheck(e) {
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
        $.ajax({
            url: "findByNickname",
            type: "POST",
            data: { "nickname": e.target.value },
            success: function (success) {
                if (success === "") {
                    e.target.style.border = "1px solid red"
                    e.target.nextElementSibling.style.color = 'red'
                    e.target.nextElementSibling.textContent = '중복된 닉네임이 있습니다'
                } else {
                    e.target.style.border = "1px solid blue"
                    e.target.nextElementSibling.textContent = ''
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}