import ruleService from "../services/rule.service";

export async function handleClickNecessary(event) {
  const like = event.target;
  const dislike = document.querySelector("#set-dislikes");
  const user = like.getAttribute("username");
  const ruleNumber = like.getAttribute("rule-number");
  const spanLikes = Number(document.querySelector("#span-likes").innerHTML);

  if (like.classList.contains("button-not-liked")) {
    await ruleService.setPrefer(ruleNumber, user); // голосование "Да" за нужность закона
    document.querySelector("#span-likes").innerHTML = spanLikes + 1; // Увеличиваю на единицу отображение количества проголосовавших
    countPrefer()
    like.classList.remove("button-not-liked");
    like.classList.add("button-liked");
    like.setAttribute("liked", "liked");
    dislike.setAttribute("disabled", "disabled");
  } else if (like.classList.contains("button-liked")) {
    await ruleService.unSetPrefer(ruleNumber, user); // отмена голосования "Да" за нужность закона
    document.querySelector("#span-likes").innerHTML = spanLikes - 1; // Уменьшаю на единицу отображение количества проголосовавших
    countPrefer()
    like.classList.remove("button-liked");
    like.classList.add("button-not-liked");
    like.setAttribute("liked", "not-liked");
    dislike.removeAttribute("disabled");
  }
}

export async function handleClickUnnecessary(event) {
  const dislike = event.target;
  const like = document.querySelector("#set-likes");
  const user = like.getAttribute("username");
  const ruleNumber = like.getAttribute("rule-number");
  const spanDisLikes = Number(
    document.querySelector("#span-dislikes").innerHTML
  );

  if (dislike.classList.contains("button-not-disliked")) {
    await ruleService.setNotPrefer(ruleNumber, user); // голосование "Нет" за нужность закона
    document.querySelector("#span-dislikes").innerHTML = spanDisLikes + 1; // Увеличиваю на единицу отображение количества проголосовавших
    countPrefer()
    dislike.classList.remove("button-not-disliked");
    dislike.classList.add("button-disliked");
    dislike.setAttribute("disliked", "disliked");
    like.setAttribute("disabled", "disabled");
  } else if (dislike.classList.contains("button-disliked")) {
    await ruleService.unSetNotPrefer(ruleNumber, user); // голосование "Нет" за нужность закона
    document.querySelector("#span-dislikes").innerHTML = spanDisLikes - 1; // Уменьшаю на единицу отображение количества проголосовавших
    countPrefer()
    dislike.classList.remove("button-disliked");
    dislike.classList.add("button-not-disliked");
    dislike.setAttribute("disliked", "not-disliked");
    like.removeAttribute("disabled");
  }
}

function countPrefer() {
  const spanLikes = Number(document.querySelector("#span-likes").innerHTML);
  const spanDisLikes = Number(
    document.querySelector("#span-dislikes").innerHTML
  );
  let usefulness
  let usefulnessColor
  if (spanLikes !== 0 || spanDisLikes !== 0) {
    usefulness = Math.round(
      (spanLikes / (spanLikes + spanDisLikes)) * 100 
    );
    if (usefulness > 49) {
      usefulnessColor = "green";
    }
    if (usefulness < 50) {
      usefulnessColor = "red";
    }
  }
  const result = document.querySelector("#p-usefulness")
  result.innerHTML = "Нужность данного закона составляет " + usefulness + "%"
  result.style.color = usefulnessColor
}
