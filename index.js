$.getJSON("challenges.json", function(challenges){
    
    const length = Object.keys(challenges).length;

    for (let i = 1; i <= length; i++) {

        const challenge = challenges[i];

        const card = createChallengeCard(challenge);

        $(".challenges").append(card);
        
    }

})

function createChallengeCard(challenge){

    const mainDIV = document.createElement("div");
    mainDIV.setAttribute("class", `challenge ${challenge["progress"].replace(" ", "-").toLowerCase()}`);
    mainDIV.setAttribute("data-position", `${challenge["id"]}`);

    const captionANCHOR = document.createElement("a");
    captionANCHOR.setAttribute("href", `${challenge["live-site"]}`);
    captionANCHOR.setAttribute("target", "_blank");
    captionANCHOR.setAttribute("class", "caption");
    captionANCHOR.setAttribute("data-progress", `${challenge["progress"]}`);

    const captionIMG = document.createElement("img");
    captionIMG.setAttribute("src", `images/challenge-${challenge["id"]}.jpeg`);
    
    captionANCHOR.appendChild(captionIMG);

    const heroDIV = document.createElement("div");
    heroDIV.setAttribute("class", "hero");

    const heroANCHOR = document.createElement("a");
    heroANCHOR.setAttribute("href", `${challenge["live-site"]}`);
    heroANCHOR.setAttribute("target", "_blank");
    heroANCHOR.innerText = challenge["title"];

    const heroUL = document.createElement("ul");
    heroUL.setAttribute("class", "languages");

    let languages = ["html", "css", "js"];
    languages.map(language => {
        
        const heroLI = document.createElement("li");
        let className = (challenge["languages"][language]) ? `language ${language}` : `language ${language} hide`;
        heroLI.setAttribute("class", `${className}`);
        heroLI.innerText = language.toUpperCase();

        heroUL.appendChild(heroLI);

    });

    const linksDIV = document.createElement("div");
    linksDIV.setAttribute("class", "links");

    let links = ["GitHub", "Frontend Mentor", "Live Site"];
    links.map(link => {

        const linkDIV = document.createElement("div");
        linkDIV.setAttribute("class", "link");

        const linkICON = document.createElement("div");
        linkICON.setAttribute("class", "link-icon");

        let linkName = link.toLowerCase().replace(" ", "-");
        const linkANCHOR = document.createElement("a");
        linkANCHOR.setAttribute("href", `${challenge[linkName]}`);

        if (challenge[linkName] != '#') {
            linkANCHOR.setAttribute("target", "_blank");
        }

        linkANCHOR.setAttribute("class", "link-name");
        linkANCHOR.innerText = link;

        linkDIV.appendChild(linkICON);
        linkDIV.appendChild(linkANCHOR);

        linksDIV.appendChild(linkDIV);

    });

    heroDIV.appendChild(heroANCHOR);
    heroDIV.appendChild(heroUL);

    mainDIV.appendChild(captionANCHOR);
    mainDIV.appendChild(heroDIV);
    mainDIV.appendChild(linksDIV);

    return mainDIV;

}