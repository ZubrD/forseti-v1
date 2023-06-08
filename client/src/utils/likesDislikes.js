
// export function countNecessity() {
//   const spanLikes = Number(document.querySelector("#span-likes").innerHTML);
//   const spanDisLikes = Number(
//     document.querySelector("#span-dislikes").innerHTML
//   );
//   let usefulness;
//   let usefulnessColor;
//   if (spanLikes !== 0 || spanDisLikes !== 0) {
//     usefulness = Math.round((spanLikes / (spanLikes + spanDisLikes)) * 100);
//     if (usefulness > 49) {
//       usefulnessColor = "green";
//     }
//     if (usefulness < 50) {
//       usefulnessColor = "red";
//     }
//   }
//   const result = document.querySelector("#p-usefulness");
//   result.innerHTML = "Нужность данного закона составляет " + usefulness + "%";
//   result.style.color = usefulnessColor;
// }
