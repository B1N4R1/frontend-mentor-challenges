// User search

    const form = document.querySelector("#searchForm");
    const noResults = document.querySelector(".no-results");

    form.onsubmit = (e) => {
        e.preventDefault();

        var inputVal = e.target.children[1].value;

        findUser(inputVal);

    }

    async function findUser(username) {
    
        try {

        const response = await fetch(`https://api.github.com/users/${username}`);
        const parsedResponse = await response.json();
    
        if (!response.ok) {
            return noResults.classList.add('show');
        }
        else{
            noResults.classList.remove('show');
        }
    
        return updateCard(parsedResponse);

        } catch (err) {

        return console.log(err);

        }

    }

    function updateCard(user){

        const name = document.querySelector(".name");
        const joinedDate = document.querySelector(".date");
        const username = document.querySelector(".username");
        const bio = document.querySelector(".bio");
        const avatar = document.querySelector(".avatar img");

        const repos = document.querySelector("#repos .stat_amount");
        const followers = document.querySelector("#followers .stat_amount");
        const following = document.querySelector("#following .stat_amount");

        const personals = document.querySelectorAll(".personal .personal_item");


        name.innerText = (user.name == null) ? `${user.login}` : `${user.name}`;
        username.innerText = `@${user.login}`;
        avatar.attributes[0].value = user.avatar_url;
        bio.innerText = (user.bio == null) ? "This profile has no bio" : user.bio;

        if (user.bio == null) {
            bio.className = "bio unavailable";
            bio.innerText = "This profile has no bio";
        }
        else{
            bio.className = "bio";
            bio.innerText = user.bio;
        }


        // Joined date
        joinedDate.innerText = dateToTextFormat(user.created_at);


        // Stats
        repos.innerText = `${user.public_repos}`
        followers.innerText = `${user.followers}`
        following.innerText = `${user.following}`


        // Personals

            // Location
            const location = personals[0];
            location.className = (user.location == null || user.location == "") ? "personal_item unavailable" : "personal_item";
            location.children[1].innerText = (user.location == null || user.location == "") ? "Not Available" : user.location;
            location.children[1].attributes[0].textContent = (user.location == null || user.location == "") ? "#" : `https://www.google.es/maps/place/${user.location}`;


            // Website
            const website = personals[1];
            website.className = (user.blog == null || user.blog == "") ? "personal_item unavailable" : "personal_item";
            website.children[1].innerText = (user.blog == null || user.blog == "") ? "Not Available" : user.blog.split('https://')[1];
            website.children[1].attributes[0].textContent = (user.blog == null || user.blog == "") ? "#" : user.blog;


            // Twitter
            const twitter = personals[2];
            twitter.className = (user.twitter_username == null || user.twitter_username == "") ? "personal_item unavailable" : "personal_item";
            twitter.children[1].innerText = (user.twitter_username == null || user.twitter_username == "") ? "Not Available" : user.twitter_username;
            twitter.children[1].attributes[0].textContent = (user.twitter_username == null || user.twitter_username == "") ? "#" : `https://twitter.com/${user.twitter_username}`;


            // Company
            const company = personals[3];
            company.className = (user.company == null || user.company == "") ? "personal_item unavailable" : "personal_item";
            company.children[1].innerText = (user.company == null || user.company == "") ? "Not Available" : user.company;
            company.children[1].attributes[0].textContent = (user.company == null || user.company == "") ? "#" : user.html_url;

    }

    function dateToTextFormat(date){

        const created_at = date.split('T')[0].split("-");
        const year = created_at[0];
        let month = created_at[1];
        const day = created_at[2];

        const d = new Date(year, month, day);
        d.setMonth(month - 1);

        month = d.toLocaleString('en', { month: 'short' })

        return `Joined ${day} ${month} ${year}`;

    }

    findUser("octocat");


// Theme toggle

    const body = document.querySelector("body");
    const theme_toggle = document.querySelector(".theme-toggle");

    theme_toggle.onclick = () =>  {

        body.className = (body.className == "light-theme") ? "dark-theme" : "light-theme";

    }