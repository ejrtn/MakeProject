let folderClick = ""

document.querySelector("#tree-sub1").addEventListener("click", function (e) {
    document.querySelector(".vocabulary").style.display = 'inline'
    document.querySelector(".season").style.display = 'none'
})
document.querySelector("#tree-sub2").addEventListener("click", function (e) {
    document.querySelector(".vocabulary").style.display = 'none'
    document.querySelector(".season").style.display = 'flex'
})
document.querySelector(".vocabulary input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (document.querySelector(".vocabulary img").alt === e.target.value) {
            document.querySelector(".vocabulary .result2").textContent = 'success';
            document.querySelector(".vocabulary .result2").style.color = 'green';
            this.value = '';
            RandomPicture();
        } else {
            document.querySelector(".vocabulary .result2").textContent = document.querySelector(".vocabulary img").alt;
            document.querySelector(".vocabulary .result2").style.color = 'red';
            this.value = '';
        }
    }
})

function RandomPicture() {
    $.ajax({
        type: 'post',
        url: 'RandomPicture',
        contentType: "application/json",
        success: function (data) {
            document.querySelector(".vocabulary img").src = data['url'];
            document.querySelector(".vocabulary img").alt = data['fileName'];
        },
        error: function (error) {
            console.log(error)
        }
    })
}
RandomPicture();

function englishVideoFolderList(path){
    $.ajax({
        type: 'post',
        url: 'englishVideoFolderList',
        data:{path:path},
        success: function (data) {
            for(let i=0;i<data.length;i++){
                let el = "<li>"+data[i]+"</li>"
                if(i == 0){
                    folderClick = data[i]
                    englishVideoFileList(data[i])
                }
                document.querySelector(".video-folder-list").innerHTML += el
            }
            let folders = document.querySelector(".video-folder-list").childNodes

            for(let i=0;i<folders.length;i++){
                folders[i].addEventListener("click",function(e){
                    for(let f=0;f<folders.length;f++){
                        folders[f].style.color = '#eeeeee'
                    }
                    folders[i].style.color = 'yellow'
                    folderClick = folders[i].textContent
                    document.querySelector(".vocabulary").style.display = 'none'
                    document.querySelector(".season").style.display = 'flex'
                    englishVideoFileList(e.target.textContent);
                })
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function englishVideoFileList(path){
    $.ajax({
        type: 'post',
        url: 'englishVideoFileList',
        data:{path:path},
        success: function (data) {
            for(let i=0;i<data.length;i++){
                document.querySelector(".video-list").innerHTML += "<p>"+data[i]+"</p>"
            }
            englishVideo(data[0])
            document.querySelector(".video-list").childNodes[0].style.color = 'yellow'

            let files = document.querySelector(".video-list").childNodes
            for(let i=0;i<files.length;i++){
                files[i].addEventListener("click",function(e){
                    for(let f=0;f<files.length;f++){
                        files[f].style.color = '#eeeeee'
                    }
                    files[i].style.color = 'yellow'
                    englishVideo(files[i].textContent)
                })
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function englishVideo(path){
    document.querySelector("video").src=encodeURI("/englishVideo/"+folderClick+"/"+path)
    document.querySelector("video track").src=encodeURI("/englishSubtitle/"+folderClick+"/"+path)
}


englishVideoFolderList("/");

