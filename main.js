const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": null,
        "author": {
            "name": "Alessandro Sainato",
            "image": null
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const mainEle=document.getElementById("container")
for (let i = 0; i < posts.length; i++) {

    let elementHTML
    let x = document.createElement("div")
    x.className="post"
    elementHTML=`<div class="post__header">
    <div class="post-meta">                    
        <div class="post-meta__icon">`
    if (posts[i].author.image==null) {
        elementHTML+=`<p>${getInitials(posts[i].author.name)}`
    }else{
        elementHTML+=`<img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">`
    }
    elementHTML +=`                  
        </div>
        <div class="post-meta__data">
            <div class="post-meta__author">${posts[i].author.name}</div>
            <div class="post-meta__time">${getTimeAgo(getTimeElapsed(posts[i].created))}</div>
        </div>                    
    </div>
    </div>
    <div class="post__text">${posts[i].content}</div>
    <div class="post__image">`
    if (posts[i].media==null) {
        elementHTML+=``
    }else{
        elementHTML+=`<img src="${posts[i].media}" alt="">`
    }
    elementHTML+=`
    </div>
    <div class="post__footer">
    <div class="likes js-likes">
        <div class="likes__cta">
            <a class="like-button  js-like-button" href="#" data-postid="${posts[i].id}">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
            </a>
        </div>
        <div class="likes__counter">
            Piace a <b id="like-counter-1" class="js-likes-counter">${posts[i].likes}</b> persone
        </div>
    </div> 
    </div>`
    x.innerHTML=elementHTML
    mainEle.append(x)
}

let liked=[]
const likeBtn=document.querySelectorAll(".like-button")
for (let i = 0; i < likeBtn.length; i++) {
    const oneLike = likeBtn[i];
    ///funziona sia in console che nel valore dell'oggetto, ma il numero su schermo non cambia
    
    oneLike.addEventListener("click",function(event){
        event.preventDefault()
        let currentPostId=Number(this.getAttribute("data-postid"))
        console.log(currentPostId)
        let newLikeCount
        if (liked.includes(currentPostId)){
            oneLike.classList.remove("like-button--liked")
            const indexID=liked.indexOf(currentPostId)
            liked.splice(indexID, 1)
            console.log(indexID)
            console.log(liked)
            console.log(posts[currentPostId-1].likes)
            newLikeCount=posts[currentPostId-1].likes-=1

        } else {
            oneLike.classList.add("like-button--liked")
            const indexID=liked.indexOf(currentPostId)
            liked.push(Number(currentPostId))
            console.log(liked)
            newLikeCount=posts[currentPostId-1].likes+=1
            posts[currentPostId-1].likes=newLikeCount
        }
        posts[currentPostId-1].likes=newLikeCount
        console.log(posts[currentPostId-1])
    })
}

function getTimeElapsed(elemDate) {
    const todayDate=new Date()
    console.log(todayDate)
    const postDate=new Date(elemDate)
    console.log(postDate)
    const timeDiff= todayDate.getTime()-postDate.getTime()
    console.log(timeDiff)
    console.log(Math.floor(timeDiff/(1000*60*60*24)))
    return Math.floor(timeDiff/(1000*60*60*24))
}

function getTimeAgo(days) {
    let years
    let months
    let daysElapsed
    if (days>=365){
        years=Math.floor(days/365)
        months=Math.floor((days%365)/30)
        return `created ${years} years and ${months} months ago`
    }else if(days>=90){
        months=Math.floor((days%365)/30)
        return `created ${months} months ago`
    }else{
        months=Math.floor((days%365)/30)
        daysElapsed=Math.floor(days%30)
        return `created ${months} months and ${daysElapsed} days ago`
    }
    
}

function getInitials(nome) {
    let nomeArray=nome.split(" ")
    console.log(nomeArray)
    let iniziali = ""
    for (let i = 0; i < nomeArray.length; i++) {
        let element = nomeArray[i];
        iniziali += element.charAt(0)
    }
    return iniziali
}

function refereshLikeNumber(postIndex) {
    
}