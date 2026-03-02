const loadLessons=()=>{

    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url) // promise of response
    .then(res=>res.json())//promise of json data
    .then(json=>displayLessons(json.data));

}

const loadLevelWord=(id)=>{
    // console.log(id);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    // console.log(url); // url ta niye ashlam

    fetch(url)
    .then(res=>res.json())
    .then(datas => displayLevelWords(datas.data))


}

const displayLevelWords=(words)=>
{
   console.log(words);

   const wordContainer = document.getElementById('word-container');
   wordContainer.innerHTML="";

   words.forEach(word => {
      
    const card = document.createElement('div');
    console.log(word);

    card.innerHTML=`
     
     <div class="bg-white rounded-xl shadow-sm text-center p-10 px-5 space-y-5">

            <h2 class="font-bold text-2xl">${word.word}</h2>

            <p class="font-semibold">Meaning / Pronunciation</p>

            <div class="fontBangla font-medium text-2xl">${word.meaning} / ${word.pronunciation}</div>

            <div class="flex justify-between">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>


    `

  wordContainer.append(card);
   });
}


const displayLessons=(lessons)=>
{
//    console.log(lessons);
    
    // Get the Container
    // Get into every lessons
    // Create Elements
    // Append into container


    const levelContainer = document.getElementById('level-containner');
    // levelContainer.innerHTML="";
    // Container ta dhore niye ashlam

    for(lesson of lessons)
    {
        const btnDiv = document.createElement('div');

        btnDiv.innerHTML=`

        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">

        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}

        </button>
        `

        levelContainer.append(btnDiv);
    }
};

loadLessons();