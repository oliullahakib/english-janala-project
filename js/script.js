const lessonLoder = async()=>{
    const url = "https://openapi.programming-hero.com/api/levels/all"
    let response = await fetch(url)
    let lessons = await response.json()
    lessonBtn(lessons.data);
    
}
const lessonBtn =(lessons)=>{
lessons.forEach(lesson => {
    let lessonContainer = document.querySelector('.lesson-container')
   let div = document.createElement("div");
   div.innerHTML = `
    <button class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
   `
    lessonContainer.append(div);
});

}

lessonLoder()