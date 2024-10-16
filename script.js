
document.addEventListener("DOMContentLoaded", (e) => {
    const colors = [
        'linear-gradient(182deg, #8f1313, #000000)', // Gradient 1
        'linear-gradient(182deg, #007364, #000000)', // Gradient 2
        'linear-gradient(182deg, #0500e3, #000000)', // Gradient 3
    ];
    const imageContainer = document.querySelector(".image_container");
    function getRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }
    
    const randomId = getRandomNumber();
    function homePoster(){
        fetch(`http://localhost:3000/netflixTitles/${randomId}`)
        .then((r) => r.json())
        .then((data) => {
            imageContainer.innerHTML = `
            <img src="${data.thumbnail}" alt="" class="flash_iamge">
            <div class="under_contents">
                <div class="genrees">
                    <span class="genre">${data.genre}</span>
                </div>
                <div class="action_buttons">
                    <button class="play" id="image_click">
                        <div class="icon"><i class="fa-solid fa-play"></i></div>
                        <div class="namer_action" >Play</div>
                    </button>
                    <button class="list" >
                        <div class="icon"><i class="fa-solid fa-plus"></i></div>
                        <div class="namer_action">My List</div>
                    </button>
                </div>
            </div>`;
            const previewPostBtn =  document.querySelector(".play");
            previewPostBtn.addEventListener("click", () => movieSplash(data.id))
        })
    }
    homePoster()
    const movieLists = document.querySelector(".list_of_shows");
    function listTittles(){
        fetch(`http://localhost:3000/netflixTitles`)
        .then((r) => r.json())
        .then((title) => title.forEach((titles) => {
            let listItems = document.createElement("div")
            listItems.classList.add("list_container");
            listItems.innerHTML = ` 
                <div class="list_container">
                    <img src="${titles.thumbnail}" alt="${titles.title}" id="showtittle" class="image_list">
                </div>`;
            const image_preview =  listItems.querySelector("#showtittle");
            image_preview.addEventListener("click", () => movieSplash(titles.id))
            listItems.append()
            movieLists.appendChild(listItems)
        }))
    }
    listTittles()
    const hotlist = document.querySelector(".hotnelist");
    function hotAndNew(){
        fetch(`http://localhost:3000/netflixTitles`)
        .then((r) => r.json())
        .then((hot) => hot.forEach((titles) => {
            let hotList = document.createElement("div")
            hotList.classList.add("container-list");
            hotList.innerHTML = ` 
                <div class="indexno">${titles.id}</div>
                <div class="rest_container">
                    <img src="${titles.thumbnail}" id="image" alt="" class="thumbima">
                    <div class="movie_name" id="hotname">${titles.title}</div>
                    <div class="moveieDesc" id="hostdesc">${titles.description}.</div>
                    <div class="arayofgenres">${titles.genre} </div>
                </div>`;
            const image_preview =  hotList.querySelector(".rest_container");
            image_preview.addEventListener("click", () => movieSplash(titles.id))
            hotList.append()
            hotlist.appendChild(hotList)
        }))
    }
    hotAndNew()
    const mylistList = document.getElementById("MylistOfTitles");
    function Mylists(){
        fetch(`http://localhost:3000/mylist`)
        .then((r) => r.json())
        .then((list) => list.forEach((data) => {
            const myListContainer = document.createElement("div")
            myListContainer.classList.add("list_container");
            myListContainer.innerHTML = ` <img src="${data.thumbnail}" alt="${data.title}" id="image_click" class="image_list">`
            myListContainer.querySelector("#image_click").addEventListener("click", () => movieSplash(data.id))
            mylistList.appendChild(myListContainer)
        }))
    }
    Mylists()
    
    const homeBtn = document.getElementById("home");
    const hotBtn = document.getElementById("hot");
    const mylistBtn = document.getElementById("mylist");
    const homeScreen = document.getElementById("homescreen");
    const hotscreen = document.getElementById("hotscreen");
    const mylistscreen = document.getElementById("mylistscreen");

    const showScreen = (screenToShow, activeBtn) => {
        // Hide all screens
        [homeScreen, hotscreen, mylistscreen].forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = "none";
        });
    
        // Show the selected screen
        screenToShow.style.display = "block";
        requestAnimationFrame(() => {
            screenToShow.classList.add('active');
        });
    
        // Change button colors
        [homeBtn, hotBtn, mylistBtn].forEach(btn => {
            if (btn === activeBtn) {
                btn.style.color = "white"; // Active button color
            } else {
                btn.style.color = "grey"; // Inactive button color
            }
        });
    };
    
    // Button click handlers
    homeBtn.onclick = () => showScreen(homeScreen, homeBtn);
    hotBtn.onclick = () => showScreen(hotscreen, hotBtn);
    mylistBtn.onclick = () => showScreen(mylistscreen, mylistBtn);
    
    // Initial screen
    showScreen(homeScreen, homeBtn);
    

    function movieSplash(data){
        fetch(`http://localhost:3000/netflixTitles/${data}`)
        .then((r) => r.json())
        .then((data) => {
            const app = document.querySelector(".phone-container");
            const splash = document.createElement("div");
            splash.classList.add("splach_movie_details");
            const rating = data.rating;
            function getAge(rating){
                if(rating === "TV-MA"){
                    age = 18;
                }else if(rating === "TV-14"){
                    age = 14;
                }
                return age;
            }
            splash.innerHTML = `<div class="contanetssplash">
                <div class="image_holder">
                    <img src="${data.thumbnail}" alt="" class="splasher">
                    <div class="x-btton"><i id="remove" class="fa-solid fa-x"></i></div>
                </div>
                
                <div class="all_contents">
                    <div class="movie_headeing">${data.title}</div>
                    <div class="flex_threflex">
                        <div class="yearofpro">${data.releaseYear}</div>
                        <div class="rating_container">${getAge(rating)}</div>
                        <div class="numerofseasons">${data.seasons  } Seasons</div>
                    </div>
                    <div class="action_buttons">
                        <button class="addtomylist" id="addtomylist">
                            <i class="fa-solid fa-plus"></i> Add to My list
                        </button>
                    </div>
                    <div class="movie_desct">
                        <p class="description">${data.description}</p>
                    </div>
                    <div class="smalll-decs">
                        <div class="castslist">Casts: ${data.cast}.</div>
                    </div>
                </div>
            </div>`;
            const moviedata = {
                "id": data.id,
                "thumbnail": data.thumbnail
            }
            fetch(`http://localhost:3000/mylist/${data.id}`) // Replace with your actual endpoint
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Assuming the data is an array of objects
                    splash.querySelector("#addtomylist").innerHTML = `<i class="fa-solid fa-x"></i> Remove from Mylist`;
                    splash.querySelector("#addtomylist").addEventListener("click", (e) =>  {
                        e.preventDefault()  
                        removeFromList(data.id)
                    })
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    splash.querySelector("#addtomylist").addEventListener("click", (e) =>  {
                        e.preventDefault()  
                        addtolist(moviedata)
                    })
                    
                });
            app.append(splash)
            const closeButton = splash.querySelector("#remove");
            closeButton.onclick = () => splash.remove(); 
        })
        
    }
    function addtolist(moviedata){
        fetch("http://localhost:3000/mylist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(moviedata) 
            // Send the new ticket data
        })
        .then(response => response.json()) 
        // Parse the response
        .then(data => {
            document.querySelector("#addtomylist").innerHTML = `<i class="fa-solid fa-check"></i> Added To Mylist`;
            document.querySelector("#addtomylist").disabled = true;
            document.querySelector("#addtomylist").style.color = "green";
            document.querySelector("#addtomylist").style.background = "white";
            // Log the created ticket
            const movie_list = document.getElementById("MylistOfTitles");
            const listtodadd = document.createElement("div")
            listtodadd.classList.add("list_container");
            listtodadd.innerHTML = ` <img src="${moviedata.thumbnail}"  id="image_click" class="image_list">`
            listtodadd.querySelector("#image_click").addEventListener("click", () => movieSplash(moviedata.id))
            movie_list.appendChild(listtodadd)
        })
    }
    function removeFromList(id){
        fetch(`http://localhost:3000/mylist/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
            // Send the new ticket data
        })
        .then(response => response.json()) 
        // Parse the response
        .then(data => {
            document.querySelector("#addtomylist").innerHTML = `<i class="fa-solid fa-plus"></i> Add To Mylist`;

            // Log the created ticket
        })
    }
    function checkIdExists(idToCheck) {
        
    }
  // Correctly select the delete button and set up the onclick event
    let deletePosterBtn = document.querySelector(".cancel_icon");
    deletePosterBtn.onclick = deletePoster;

    function deletePoster() {
        imageContainer.remove();
    }


});
