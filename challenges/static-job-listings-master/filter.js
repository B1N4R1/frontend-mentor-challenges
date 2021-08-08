class FilterManager {

    constructor(filterListElement, jobsElement, filterType) {
        this.filterListElement = filterListElement;
        this.jobsElement = jobsElement;
        this.filterType = filterType;

        console.log(this.filterType);

    }

    createFilterCard(filterName) {

        const filterCard = `
            <div class="filter">
                <div class="name">${filterName}</div>
                <div class="remove"></div>
            </div>
        `;

        return filterCard;

    }

    addFilter(newFilter) {

        const filters = this.filterListElement.children;

        let i = 0, found = 0;
        while (i < filters.length && found == 0) {
            
            if (filters[i].innerText === newFilter.innerText) {
                found = 1;
            }
            else{
                i++;
            }

        }

        if (!found) {
            const filterElement = this.createFilterCard(newFilter.innerText);

            this.filterListElement.innerHTML += filterElement;
        }

    }

    removeFilter(filter) {

        const tablet = filter.innerText;
        const jobs = this.jobsElement.children;

        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            
            if (job.className == 'job hide') {
                
                let jobTablets = job.attributes[1].textContent;

                if (jobTablets.search(tablet) == -1) {
                    
                    job.className = 'job';

                }
                
            }

        }
        

        this.filterListElement.removeChild(filter);
    }

    removeAllFilters(){
        this.filterListElement.innerHTML = '';

        const jobs = this.jobsElement.children;

        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            
            job.className = 'job';

        }

    }

    changeFilterType(){
        
        //this.filterType = (this.filterType === 'matchAll') ? 'matchSome' : 'matchAll';

        if (this.filterType.attributes[1].textContent === 'matchAll') {
            
            this.filterType.innerText = 'Match Some';
            this.filterType.attributes[1].textContent = 'matchSome';

        }
        else{

            this.filterType.innerText = 'Match All';
            this.filterType.attributes[1].textContent = 'matchAll';

        }

        console.log(this.filterType);

    }

    apllyFilters(filters) {

        let j = 0, found = 0, ret = 0;
        const filtersCount = this.filterListElement.children.length;

        if (this.filterType.attributes[1].textContent === 'matchAll') {
            
            while(j < filtersCount){

                let filter = this.filterListElement.children[j].innerText;
                if (filters.search(filter) > -1) {
                    found++;
                }
    
                j++;
    
            }

            ret = (found === filtersCount) ? 1 : 0;

        }
        else{

            while(j < filtersCount && found == 0){

                let filter = this.filterListElement.children[j].innerText;
                if (filters.search(filter) > -1) {
                    found = 1;
                }
                else{
                    j++;
                }
        
            }

            ret = found;

        }

        return ret;

    }

    updateFilters() {
        
        console.log(this.jobsElement);
        console.dir(this.jobsElement);

        const filtersCount = this.filterListElement.children.length;

        this.filterListElement.parentElement.className = (filtersCount == 0) ? 'filters-wrapper' : 'filters-wrapper slide-in';

        if (filtersCount === 0) {
            this.filterListElement.parentElement.className = 'filters-wrapper';
        }
        else{

            this.filterListElement.parentElement.className = 'filters-wrapper slide-in';

            const jobs = this.jobsElement.children;

            for (let i = 0; i < jobs.length; i++) {
    
                const job = jobs[i];
                
                let jobTablets = job.attributes[1].textContent;
    
                if (this.apllyFilters(jobTablets)) {
                    job.className = 'job';
                }
                else{
                    job.className = 'job hide';
                }
    
            }

        }

    }

}

const jobs = document.querySelector(".job-listing");
const filters = document.querySelector(".filters");
const clear = document.querySelector(".clear");
const match = document.querySelector(".match");


const filterManager = new FilterManager(filters, jobs, match);

jobs.addEventListener("click", function(e){

    // Add Filter
    if(e.target.classList[0] === 'tablet'){

        filterManager.addFilter(e.target);
        filterManager.updateFilters();

    }

});

// Remove one filter
filters.addEventListener("click", function(e){
    
    if (e.target.classList[0] === 'remove') {
        
        filterManager.removeFilter(e.target.parentElement);
        filterManager.updateFilters();

    }

});

// Remove all filters
clear.addEventListener("click", () => {
    filterManager.removeAllFilters();
    filterManager.updateFilters();
})

match.addEventListener("click", () => {
    filterManager.changeFilterType();
    filterManager.updateFilters();
})