const lessonLoder = async () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"
    let response = await fetch(url)
    let lessons = await response.json()
    lessonBtn(lessons.data);

}

// Active functionalitiy
document.querySelector('.lesson-container').addEventListener('click', (e) => {
    if (e.target.className.includes('lesson-btn')) {
        let lessonAllButton = e.target.parentNode.parentNode.querySelectorAll('.lesson-btn');
        lessonAllButton.forEach(button => {
            button.classList.remove('bg-[#422AD5]','text-white')
        });;
        e.target.classList.add('bg-[#422AD5]','text-white')
    }

})


const lessonBtn = (lessons) => {
    let lessonContainer = document.querySelector('.lesson-container')
    lessonContainer.innerHTML = ''
    lessons.forEach(lesson => {
        let div = document.createElement("div");
        div.innerHTML = `
    <button id='lesson-btn-${lesson.level_no}' onclick='lessonWords(${lesson.level_no})' class="btn lesson-btn btn-outline btn-primary "> <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
   `
        lessonContainer.append(div);
    });

}

const lessonWords = async (level_no) => {
    showLoading()
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`
    let response = await fetch(url);
    let words = await response.json()
    lessonWordViwer(words.data);
    

}

const lessonWordViwer = (words) => {
    let wordContainer = document.querySelector('.word-card-container')
    if(words.length ===0){
       wordContainer.innerHTML = `
       <div class="flex flex-col items-center justify-center col-span-3">
                <img class="max-w-40" src="./assets/alert-error.png" alt="alert-error">
                <p class="text-sm bangla-font text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-4xl font-medium">নেক্সট Lesson এ যান</h1>
            </div>
       `
       hideLoading()
        return
    }
    wordContainer.innerHTML = ""
    words.forEach(word => {

        let cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        <div class="word-card ">
                <div class="card bg-white text-black min-h-96">
                    <div class="card-body items-center text-center">
                        <h2 class="card-title text-3xl font-bold">${word.word}</h2>
                        <p class="my-4 max-h-6">Meaning/Pronounciation</p>
                         <h2 class="card-title text-3xl font-semibold">${word.meaning ? word.meaning : "' অর্থ পাওয়া যায়নি '"} / ${word.pronunciation ? word.pronunciation : "' উচ্চারণ পাওয়া যায়নি '"}</h2>
                        <div class="flex justify-between w-full mt-3 px-4 absolute bottom-6">
                            <button onclick ='getWordDetail(${word.id})' class="btn bg-blue-100"><i class="fa-solid fa-circle-info"></i></button>
                            <button class="btn bg-blue-100"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
        wordContainer.append(cardDiv)
        hideLoading()
    })

}

const getWordDetail= async(id)=>{
   let url = `https://openapi.programming-hero.com/api/word/${id}`
    let response = await fetch(url);
    let wordDetails= await response.json();
    showWordDetail(wordDetails.data);
    
}
const showWordDetail = (wordDetails)=>{
    document.getElementById('main-word').innerHTML = `${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i>:${wordDetails.pronunciation})`;
    document.getElementById('word-meaning').innerText = wordDetails.meaning;
    document.getElementById('word-example').innerText = wordDetails.sentence;
     document.getElementById('synonum').innerHTML = showSynonyms(wordDetails.synonyms);
    
    document.getElementById('word_modal').showModal();
}
const showSynonyms = (synonymus)=>{
   let element = synonymus.map(synonym =>{
        let span =document.createElement('span');
       return span.innerHTML =`<button class="btn bg-[#EDF7FF]">${synonym}</button>`;
    })
   return element.join(" ");
    
}

showLoading = ()=>{
    document.getElementById('loading').classList.remove('hidden')
    document.getElementById('word-card-container').classList.add('hidden')
}
hideLoading = ()=>{
    document.getElementById('word-card-container').classList.remove('hidden')
    document.getElementById('loading').classList.add('hidden')
}
lessonLoder()