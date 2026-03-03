const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url) // promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  // console.log(id);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  // console.log(url); // url ta niye ashlam

  fetch(url)
    .then((res) => res.json())
    .then((datas) => {
      removeActive();
      const clickbtn = document.getElementById(`lesson-btn-${id}`);
      clickbtn.classList.add("active");

      displayLevelWords(datas.data);
    });
};

const manageSpinner=(status)=>
{

    if(status)
    {
        document.getElementById('loadingicon').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else
    {
        
        document.getElementById('loadingicon').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    
    }

}

const displayLevelWords = (words) => {
//   console.log(words);
manageSpinner(true);

  
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  wordContainer.classList.add("grid", "grid-cols-1", "md:grid-cols-3");

  if (words.length == 0) {
    wordContainer.classList.remove("grid", "grid-cols-1", "md:grid-cols-3");
    const empty = document.createElement("div");
    empty.innerHTML = `
       <div class=" col-span-full space-y-5 text-center">
 
             <img class="mx-auto" src="./assets/alert-error.png" alt="">
    
            <h3 class="fontBangla">এই লেসন এ এখনো কোন Vocabluary যুক্ত করা হয়নি।</h3>

            <h1 class="text-3xl font-bold fontBangla">নেক্সট Lesson এ যান</h1>
        </div>

        

      
   
    `;
    // Tried a lot, but couldn't

    wordContainer.append(empty);
    
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    console.log(word);

    card.innerHTML = `
     
     <div class="bg-white rounded-xl shadow-sm text-center p-10 px-5 space-y-5">

            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি।"}</h2>

            <p class="font-semibold">Meaning / Pronunciation</p>

            <div class="fontBangla font-medium text-2xl">${word.meaning ? word.meaning : "অর্থ খুজে পাওয়া যায়নি।"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ খুজে পাওয়া যায়নি।"}</div>

            <div class="flex justify-between">
                <button onclick="loadDetailed(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>


    `;

    wordContainer.append(card);
  });
  manageSpinner(false);
};

const removeActive = () => {
  const lesson_btn = document.querySelectorAll(".lessonBtn"); // karon jader moddhe same class ache tader sobaike lagbe.

  lesson_btn.forEach((btn) => btn.classList.remove("active")); // active class thakle remove kore dibe.
};

const displayLessons = (lessons) => {
  //    console.log(lessons);

  // Get the Container
  // Get into every lessons
  // Create Elements
  // Append into container

  const levelContainer = document.getElementById("level-containner");
  // levelContainer.innerHTML="";
  // Container ta dhore niye ashlam

  for (lesson of lessons) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `

        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lessonBtn">

        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}

        </button>
        `;

    levelContainer.append(btnDiv);
  }
};




const loadDetailed = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();

  displayWordDetailsModal(details.data);
};

const displayWordDetailsModal = (wordDetails) => {
  //   console.log(word);

  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `   <div>
              
            <h2 class="text-2xl font-bold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i>: ${wordDetails.pronunciation})</h2>

          </div>

          <div>
            <h2 class="font-bold">Meaning</h2>

            <p>${wordDetails.meaning}</p>
            
          </div>

          <div>
            <h2 class="font-bold">Examples</h2>

            <p>${wordDetails.sentence}</p>

          </div>

          <div>
            <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                 <div>
                     ${createElements(wordDetails.synonyms)}
                 </div>

            

          </div>`;

  const detailDiv = document.createElement("div");

  // word_modal.showModal(); -- I can call it like this,

  document.getElementById("word_modal").showModal(); // I can also do this, to show modal
};

loadLessons();
