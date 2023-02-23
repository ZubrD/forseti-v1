export function handleClickUnnecessary(event) {
    const dislike = event.target
    const like = document.querySelector("#set-likes")

    if(dislike.classList.contains("button-not-disliked")){
        dislike.classList.remove("button-not-disliked")
        dislike.classList.add("button-disliked")
        dislike.setAttribute("disliked", "disliked")
        like.setAttribute("disabled", "disabled")
    } else if(dislike.classList.contains("button-disliked")){
        dislike.classList.remove("button-disliked")
        dislike.classList.add("button-not-disliked")
        dislike.setAttribute("disliked", "not-disliked") 
        like.removeAttribute("disabled")       
    }

}


export function handleClickNecessary(event){
    const like = event.target
    const dislike = document.querySelector("#set-dislikes")

    if(like.classList.contains("button-not-liked")){
        like.classList.remove("button-not-liked")
        like.classList.add("button-liked")
        like.setAttribute("liked", "liked")
        dislike.setAttribute("disabled", "disabled")
    } else if(like.classList.contains("button-liked")){
        like.classList.remove("button-liked")
        like.classList.add("button-not-liked")
        like.setAttribute("liked", "not-liked")
        dislike.removeAttribute("disabled")
    }
}