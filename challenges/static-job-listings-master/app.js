window.onload = () => {
    $.getJSON("data.json", function(json){
    
        let jobs = json;
    
        let translate = 85;
        for (let i = 0; i < jobs.length; i++) {
    
            const job = jobs[i];
    
            const jobCard = createJobCard(job, translate);
    
            $(".job-listing")[0].innerHTML += jobCard;

            translate += 10;
            
        }

        jobs = document.querySelectorAll(".job");

        setTimeout( () => {
    
            let delay = 0;
            for (let i = 0; i < jobs.length; i++) {
                const job = jobs[i];
    
                console.log(job.style.cssText);
                job.style.cssText = `opacity: 1; transform: translateX(0px); transition: opacity .6s ease-out, transform .5s ease-out ${delay}s;`;

                delay += 0.1;
                
            }

        }, 100)

        setTimeout( () => {

            jobs.forEach(job => {
                job.style.cssText = "";
            });

        }, 2000)

    });
}



function createJobCard(job, translate) {

    const image = `
        <section class="logo">
            <img src="${job.logo}" alt="">
        </section>
    `;

    const info = `
        <section class="info">
          <div class="company">
            <span>${job.company}</span>
            <div class="pill${(job.new) ? ' new' : ''}">NEW!</div>
            <div class="pill${(job.featured) ? ' featured' : ''}">FEATURED</div>
          </div>
          <h1 class="position">${job.position}</h1>
          <div class="more">
            <span class="postedAt">${job.postedAt}</span>
            <span class="contract">${job.contract}</span>
            <span class="location">${job.location}</span>
          </div>
          <hr>
        </section>
    `;

    let tabletsList = `${job.role},${job.level}`;
    let tablets = `
        <section class="tablets">
            <div class="tablet role">${job.role}</div>
            <div class="tablet level">${job.level}</div>
    `;

    for (let i = 0; i < job.languages.length; i++) {

        const language = job.languages[i];

        tabletsList += `,${language}`;
        tablets += `<div class="tablet language">${language}</div>`;

    }
    
    for (let i = 0; i < job.tools.length; i++) {

        const tool = job.tools[i];

        tabletsList += `,${tool}`;
        tablets += `<div class="tablet tool">${tool}</div>`;

    }

    tablets += `</section>`;

    const articleJob = `
        <article class="job" data-tablets=${tabletsList} style="opacity: 0.15; transform: translateX(-${translate}px);">
            ${image}
            ${info}
            ${tablets}
        </article>
    `;

    return articleJob;
    
}