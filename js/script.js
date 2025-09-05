const lessonLoder = async () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"
    let response = await fetch(url)
    let lessons = await response.json()
    lessonBtn(lessons.data);

}



const lessonBtn = (lessons) => {
    let lessonContainer = document.querySelector('.lesson-container')
    lessonContainer.innerHTML = ''
    lessons.forEach(lesson => {
        let div = document.createElement("div");
        div.innerHTML = `
    <button onclick='lessonWords(${lesson.level_no})' class="btn  btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
   `
        lessonContainer.append(div);
    });

}

const lessonWords = async (level_no) => {
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`
    let response = await fetch(url);
    let words = await response.json()
    lessonWordViwer(words.data);

}

const lessonWordViwer = (words) => {
    let wordContainer = document.querySelector('.word-card-container')
    wordContainer.innerHTML = ""
    words.forEach(word => {
        console.log(word);

        let cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        <div class="word-card ">
                <div class="card bg-white text-black min-h-96">
                    <div class="card-body items-center text-center">
                        <h2 class="card-title text-3xl font-bold">${word.word}</h2>
                        <p class="my-4 max-h-6">Meaning/Pronounciation</p>
                         <h2 class="card-title text-3xl font-semibold">${word.meaning? word.meaning:"' অর্থ পাওয়া যায়নি '"} / ${word.pronunciation?word.pronunciation:"' উচ্চারণ পাওয়া যায়নি '"}</h2>
                        <div class="flex justify-between w-full mt-3 px-4 absolute bottom-6">
                            <button class="btn bg-blue-100"><i class="fa-solid fa-circle-info"></i></button>
                            <button class="btn bg-blue-100"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
        wordContainer.append(cardDiv)
    })

}

lessonLoder()