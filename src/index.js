// Your code here

const baseUrl = 'http://localhost:3000';

const elements = {
    filmTitle : document.getElementById('title'),
    filmDescription : document.getElementById('film-info'),
    runningTime : document.getElementById('runtime'),
    filmImage : document.getElementById('poster'),
    showingTime : document.getElementById('showtime'),
    availableTickets : document.getElementById('ticket-num'),
    filmList : document.getElementById("films")
};

const {
    filmTitle,
    filmDescription,
    runningTime,
    filmImage,
    showingTime,
    availableTickets,
    filmList,
} = elements;

document.addEventListener('DOMContentLoaded',() => {
    
    //The following function displays details of a single film i.e. film name, film description, showing time, available tickets and showing time. 
    function detailsOfOneFilm(filmId){
        fetch(`${baseUrl}/films/${filmId}`)
        .then(response=>response.json())
        .then(data=>{

            filmImage.src = data.poster;
            filmTitle.innerText = data.title;
            filmDescription.innerText = data.description;
            runningTime.innerText = data.runtime;
            showingTime.innerText = data.showtime;
            
           availableTickets.innerText = `Available tickets :  (${data.capacity - data.tickets_sold})`;//Calculate the number of tickets remaining
           

            const buyTicket = document.getElementById('buy-ticket');
            let tickets = Number(data.capacity - data.tickets_sold);

            //Listen and handle the events of the buy ticket button
            //If tickets are availbale, a user can buy a ticket by clicking the but ticket button. For every click of the buy ticket button,
            //the number of tcikets available is decremented by one. In case there are no available tickets, the buy ticket button is hidden from the user and
            //a message is displayed advising the user that there are no tickets available
            buyTicket.addEventListener('click',event => {
                
            event.preventDefault();            

                //const remainingTickets =tickets-1
                tickets--;

                if(tickets<=0){
                    availableTickets.innerText =`All tickets sold out! No`;
                    event.target.remove();
                }else {
                    availableTickets.innerText = `Available tickets : (${tickets})`;
                }
            });
        })
    };

    //The following finction displays a list of all the films available
    function listOfAllFilms(){
        fetch(`${baseUrl}/films`)
        .then(response => response.json())
        .then(data=>{
            filmList.innerHTML = " ";
            data.forEach(film=>{
                const listItem = document.createElement("li");
                listItem.textContent = film.title;
                listItem.addEventListener("click",()=>detailsOfOneFilm(film.id));
                filmList.appendChild(listItem);
            });
        })
    }
    
    detailsOfOneFilm(1); // returns details of the first film
    listOfAllFilms(); //returns details of all the available films
});



