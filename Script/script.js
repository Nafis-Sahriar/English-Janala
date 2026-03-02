const loadLessons=()=>{

    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url) // promise of response
    .then(res=>res.json())//promise of json data
    .then(json=>displayLessons(json.data));

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

        <button class="btn btn-outline btn-primary">

        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}

        </button>
        `

        levelContainer.append(btnDiv);
    }
};

loadLessons();