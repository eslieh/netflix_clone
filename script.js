document.addEventListener("DOMContentLoaded", (e) => {
    const apiKey = "589f8d3ada4c0c32b6db7671025e3162"; // Replace with your TMDB API key
    const imageContainer = document.querySelector(".image_container");

    // Random number generator to get random movie IDs
    function getRandomNumber() {
        return Math.floor(Math.random() * 1000) + 1; // Adjust range as needed
    }

    const randomId = getRandomNumber();

    // Fetch home poster from TMDB
    function homePoster() {
        fetch(`https://api.themoviedb.org/3/movie/${randomId}?api_key=${apiKey}`)
            .then((r) => r.json())
            .then((data) => {
                imageContainer.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="" class="flash_iamge">
                <div class="under_contents">
                    <div class="genrees">
                        <span class="genre">${data.genres.map(genre => genre.name).join(', ')}</span>
                    </div>
                    <div class="action_buttons">
                        <button class="play" id="image_click">
                            <div class="icon"><i class="fa-solid fa-play"></i></div>
                            <div class="namer_action">Play</div>
                        </button>
                        <button class="list">
                            <div class="icon"><i class="fa-solid fa-plus"></i></div>
                            <div class="namer_action">My List</div>
                        </button>
                    </div>
                </div>`;
                
                const previewPostBtn = document.querySelector(".play");
                previewPostBtn.addEventListener("click", () => movieSplash(data.id));
            });
    }

    homePoster();

    // Fetch and list popular movies from TMDB
    const movieLists = document.querySelector(".list_of_shows");

    function listTittles() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
            .then((r) => r.json())
            .then((response) => {
                response.results.forEach((titles) => {
                    let listItems = document.createElement("div");
                    listItems.classList.add("list_container");
                    listItems.innerHTML = ` 
                        <div class="list_container">
                            <img src="https://image.tmdb.org/t/p/w500/${titles.poster_path}" alt="${titles.title}" id="showtittle" class="image_list">
                        </div>`;
                    const image_preview = listItems.querySelector("#showtittle");
                    image_preview.addEventListener("click", () => movieSplash(titles.id));
                    movieLists.appendChild(listItems);
                });
            });
    }

    listTittles();

    // Fetch and list hot and new movies from TMDB
    const hotlist = document.querySelector(".hotnelist");

    function hotAndNew() {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
            .then((r) => r.json())
            .then((response) => {
                let index = 1;  // Initialize index counter
    
                response.results.forEach((titles) => {
                    let hotList = document.createElement("div");
                    hotList.classList.add("container-list");
    
                    // Update hotList with index instead of titles.id
                    hotList.innerHTML = ` 
                        <div class="indexno">${index}</div> <!-- Display index here -->
                        <div class="rest_container">
                            <img src="https://image.tmdb.org/t/p/w500/${titles.poster_path}" id="image" alt="" class="thumbima">
                            <div class="movie_name" id="hotname">${titles.title}</div>
                            <div class="moveieDesc" id="hostdesc">${titles.overview}</div>
                            <div class="arayofgenres">${titles.genre_ids.join(', ')} </div>
                        </div>`;
                    
                    // Attach click event listener for movie details
                    const image_preview = hotList.querySelector(".rest_container");
                    image_preview.addEventListener("click", () => movieSplash(titles.id));
                    
                    hotlist.appendChild(hotList);
                    
                    // Increment the index for the next movie
                    index++;
                });
            });
    }
    

    hotAndNew();

    // Fetch and list My List movies from local db.json
    const mylistList = document.getElementById("MylistOfTitles");

    function Mylists() {
        fetch(`http://localhost:3000/mylist`)
            .then((r) => r.json())
            .then((list) => {
                list.forEach((data) => {
                    const myListContainer = document.createElement("div");
                    myListContainer.classList.add("list_container");
                    myListContainer.innerHTML = ` <img src="${data.thumbnail}" alt="${data.title}" id="image_click" class="image_list">`;
                    myListContainer.querySelector("#image_click").addEventListener("click", () => movieSplash(data.id));
                    mylistList.appendChild(myListContainer);
                });
            });
    }

    Mylists();

    // Navigation buttons for switching screens
    const homeBtn = document.getElementById("home");
    const hotBtn = document.getElementById("hot");
    const mylistBtn = document.getElementById("mylist");
    const homeScreen = document.getElementById("homescreen");
    const hotscreen = document.getElementById("hotscreen");
    const mylistscreen = document.getElementById("mylistscreen");

    const showScreen = (screenToShow, activeBtn) => {
        [homeScreen, hotscreen, mylistscreen].forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = "none";
        });

        screenToShow.style.display = "block";
        requestAnimationFrame(() => {
            screenToShow.classList.add('active');
        });

        [homeBtn, hotBtn, mylistBtn].forEach(btn => {
            btn.style.color = btn === activeBtn ? "white" : "grey";
        });
    };

    homeBtn.onclick = () => showScreen(homeScreen, homeBtn);
    hotBtn.onclick = () => showScreen(hotscreen, hotBtn);
    mylistBtn.onclick = () => showScreen(mylistscreen, mylistBtn);

    showScreen(homeScreen, homeBtn);

    // Fetch movie details and display them
    function movieSplash(movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
            .then((r) => r.json())
            .then((data) => {
                const app = document.querySelector(".phone-container");
                const splash = document.createElement("div");
                splash.classList.add("splach_movie_details");
                splash.innerHTML = `
                <div class="contanetssplash">
                    <div class="image_holder">
                        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="" class="splasher">
                        <div class="x-btton"><i id="remove" class="fa-solid fa-x"></i></div>
                    </div>
                    <div class="all_contents">
                        <div class="movie_headeing">${data.title}</div>
                        <div class="flex_threflex">
                            <div class="yearofpro">${new Date(data.release_date).getFullYear()}</div>
                            <div class="rating_container">${data.vote_average}</div>
                            <div class="numerofseasons">${data.runtime} mins</div>
                        </div>
                        <div class="action_buttons">
                            <button class="addtomylist" id="addtomylist">
                                <i class="fa-solid fa-plus"></i> Add to My list
                            </button>
                        </div>
                        <div class="movie_desct">
                            <p class="description">${data.overview}</p>
                        </div>
                    </div>
                </div>`;

                const moviedata = {
                    "id": data.id,
                    "title": data.title,
                    "thumbnail": `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                };

                fetch(`http://localhost:3000/mylist/${data.id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Not in My List');
                        }
                        return response.json();
                    })
                    .then(() => {
                        splash.querySelector("#addtomylist").innerHTML = `<i class="fa-solid fa-x"></i> Remove from Mylist`;
                        splash.querySelector("#addtomylist").addEventListener("click", (e) => {
                            e.preventDefault();
                            removeFromList(data.id);
                        });
                    })
                    .catch(() => {
                        splash.querySelector("#addtomylist").addEventListener("click", (e) => {
                            e.preventDefault();
                            addtolist(moviedata);
                        });
                    });

                app.append(splash);
                const closeButton = splash.querySelector("#remove");
                closeButton.onclick = () => splash.remove();
            });
    }

    // Add to My List in local db.json
    function addtolist(moviedata) {
        fetch("http://localhost:3000/mylist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(moviedata)
        })
        .then(response => response.json())
        .then(() => {
            document.querySelector("#addtomylist").innerHTML = `<i class="fa-solid fa-check"></i> Added To Mylist`;
            document.querySelector("#addtomylist").disabled = true;
        });
    }

    // Remove from My List in local db.json
    function removeFromList(id) {
        fetch(`http://localhost:3000/mylist/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            document.querySelector("#addtomylist").innerHTML = `<i class="fa-solid fa-plus"></i> Add To Mylist`;
        });
    }

    // Correctly select the delete button and set up the onclick event
    let deletePosterBtn = document.querySelector(".cancel_icon");
    deletePosterBtn.onclick = deletePoster;

    function deletePoster() {
        imageContainer.remove();
    }
});
