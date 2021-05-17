new Vue({
    el: "#app",
    data: {
        tmdbApiKey: "b75629beac361467f451fddc3d496e90",
        textToSearch: "",
        moviesList: [],
        tvSeriesList: []
    },


    methods: {

        makeAxiosSearch(searchType) {
            const axiosOption = {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSearch,
                    language: "it-IT"
                }
            };

            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOption)
                .then((resp) => {

                    if (searchType === "movie") {
                        this.moviesList = resp.data.results;

                    } else if (searchType === "tv") {

                        this.tvSeriesList = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name

                            return tvShow
                        });
                    }    
                })
        },

        search() {
            this.textToSearch
      
            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");
        }, 
    }
})

langFlagCountry = {
    "en":["gb","us","ca","ie","au"],
    "es":["es","ar","ct","mx"],
    "fr":["fr","be","lu","mc"],
    "pt":["pt","br","ao","cv"]
} 

