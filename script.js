new Vue({
    el: "#app",
    data: {
        tmdbApiKey: "b75629beac361467f451fddc3d496e90",
        textToSearch: "",
        moviesList: [],
        tvSeriesList: [],
        loading: false 

    },

    computed: {
        fullList() {
            return this.moviesList.concat(this.tvSeriesList)
        }
    }, 

    methods: {

        makeAxiosSearch(searchType) {

            this.loading = true;

            const axiosOption = {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSearch,
                    language: "it-IT",
                }
            };

            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOption)
                .then((resp) => {

                    this.loading = false;

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

            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOption)
                .then(resp => {

                    if (searchType === "movie") {
                        this.moviesList = resp.data.results;

                    } else if (searchType === "tv") {

                        this.tvSeriesList = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name;
                            tvShow.tvSeries = true

                            return tvShow
                        });
                    }
                })
        },

        getStar(movie) {
            const vote = (Math.round(vote_average) / 2)
            return vote
        },

        getFlag(movie) {
            const langFlagsMap = {
                en: ["gb", "us", "ca", "ie", "au"],
                es: ["es", "ar", "ct", "mx"],
                fr: ["fr", "be", "lu", "mc"],
                pt: ["pt", "br", "ao", "cv"]
            };

            if (langFlagsMap[movie.original_language]) {
                return langFlagsMap[movie.original_language];
            } else {
                return movie.original_language;
            }

        },

        getImgSearch(movie) {

            if (movie.poster_path) {
                return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            } else {
                return "../img/poster_placeholder.svg"
            }
        },

        search() {
            this.textToSearch

            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");
        },
    }
})



