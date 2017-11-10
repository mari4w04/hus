$(".button-collapse").sideNav();

function getAllEvents(){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/events?_embed&per_page=11")
    .then(res=>res.json())
    .then(showEvents);
}

function getEventsByCategory(id){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/events?_embed&categories="+id)
    .then(res=>res.json())
    .then(showEvents);
};

function getSingleEventById(myId){
    console.log(myId);
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/events/"+myId+"/?_embed")
    .then(res=>res.json())
    .then(showSingleEvent);
};

function getMenu(){
  fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/categories")
  .then(e=>e.json())
  .then(showMenu);
};

function showMenu(categories){
    console.log(categories);
    let lt = document.querySelector("#linkTemplate").content;

    categories.forEach(function(category){
        if (category.count > 0){
            let clone = lt.cloneNode(true);
            let parent = document.querySelector("#categorymenu");
            clone.querySelector("a").textContent=category.name;
            clone.querySelector("a").setAttribute("href", "index.html?categoryid="+category.id);
            parent.appendChild(clone);
        }
    });

    //http://marijabelautdinova.com/wp/wp-json/wp/v2/events?categories=7
};

function showSingleEvent(json){



    document.querySelector(".single-event h1").textContent=json.title.rendered;
    document.querySelector(".single-event img").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
    document.querySelector(".single-event .date").textContent=json.acf.date;
    document.querySelector(".single-event .starting-time").textContent=json.acf.starting_time;
    document.querySelector(".single-event .doors-open span").textContent=json.acf.doors_open;
    document.querySelector(".single-event .location").textContent=json.acf.location;
    document.querySelector(".single-event .price span").textContent=json.acf.price;
    document.querySelector(".single-event .facebook-link").setAttribute("href", json.acf.facebook_link);
    document.querySelector(".single-event .ticket-link").setAttribute("href", json.acf.link_to_buy_a_ticket);
    document.querySelector(".single-event .description").innerHTML=json.content.rendered;;

};

function showEvents(data){
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content;

    data.forEach(function(theEvent){
        console.log(theEvent);
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let date = clone.querySelector(".date");
        let startingTime = clone.querySelector(".starting-time");
        //let doorsOpen = clone.querySelector(".doors-open span");
        //let location = clone.querySelector(".location");
        let description = clone.querySelector(".description");
        let smallDescription = clone.querySelector(".small-description");
        //let price = clone.querySelector(".price span");
        //let facebookLink = clone.querySelector(".facebook-link");
        //let ticketLink = clone.querySelector(".ticket-link");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");

        title.textContent = theEvent.title.rendered;
        //description.innerHTML = theEvent.content.rendered;
        //price.textContent = theEvent.acf.price;
        console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes);
        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
        date.textContent = theEvent.acf.date;
        startingTime.textContent = theEvent.acf.starting_time;
        smallDescription.textContent = theEvent.acf.small_description;
        //doorsOpen.textContent = theEvent.acf.doors_open;
        //location.textContent = theEvent.acf.location;
        //facebookLink.setAttribute("href", theEvent.acf.facebook_link);
        //ticketLink.setAttribute("href", theEvent.acf.link_to_buy_a_ticket);

        link.setAttribute("href", "event.html?id="+theEvent.id);

        list.appendChild(clone);
    });
};

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let categoryid = searchParams.get("categoryid");
//console.log(id);


getMenu();
if(id){
    getSingleEventById(id);
}
if(categoryid){
    getEventsByCategory(categoryid);
}
else {
    getAllEvents();
}
