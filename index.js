$.getJSON("challenges.json", function(json){
    
    const challenges = json["challenges"];

    const length = Object.keys(challenges).length;

    challenges.sort((a, b) => new Date(b.date) - new Date(a.date));

    for (let i = 0; i < length; i++) {

        const challenge = challenges[i];

        const card = createChallengeCard(challenge);

        $(".challenges").append(card);
        
    }

})

function createChallengeCard(challenge){

    const challengeID = challenge["id"];
    const progress = challenge["progress"];
    const live_site = challenge["links"]["Live Site"];

    const caption = `                
        <a href="${live_site}" target="_blank" class="caption" rel="noreferrer" data-progress="${progress}">
            <img src="images/challenge-${challengeID}.jpeg" alt="challenge-${challengeID}" loading="lazy">
        </a>`;


    const title = challenge["title"];
    const date = challenge["date"];

    let hero = `                
        <div class="hero">
            <a href="${live_site}" target="_blank" rel="noreferrer">${title}</a>
            <p class="date">${convertDate(date)}</p>
            <ul class="languages">`;

    const languages = challenge["languages"];

    languages.map(language => {
        hero += `<li class="language ${language}">${language.toUpperCase()}</li>`;
    })

    hero += `</ul>
        </div>`;

    let links = `<div class="links">`;
    const linksData = challenge["links"];

    for (const name in linksData) {
        if (Object.hasOwnProperty.call(linksData, name)) {
            const url = linksData[name];
            
            links += `<div class="link">
                         <div class="link-icon"></div>
                         <a href="${url}" rel="noreferrer" target="_blank" class="link-name">
                             ${name}
                         </a>  
                      </div>`;

        }
    }

    links += `</div>`;

    const card = `<div class="challenge ${progress.toLowerCase()}">
                      ${caption}
                      ${hero}
                      ${links}
                  </div>`;

    return card;

}


function convertDate(date){

    let curDate = new Date(date);
    let newDate = curDate.toDateString();

    return newDate;

}