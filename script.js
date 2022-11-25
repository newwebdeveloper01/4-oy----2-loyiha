"use strict";
const URL="https://restcountries.com/v2/";



const faechCountries= async ()=>{
    const countries= await fetch(`${URL}all`);
    const natija=await countries.json(); 
     
    
    setTimeout(() => {
       $('.wrapper').innerHTML="";

      countriesRelease(natija); 
    }, 1500)
     $('.wrapper').innerHTML = `<span class="loader"></span>`;
 
    selectFill(natija)    
}
faechCountries();


function countriesRelease( data=[]){
    data.forEach( (el)=>{
        const card=crElement('div','card shadow-lg',`<img src="${el.flags.svg ? el.flags.svg : "https://picsum.photos/id/122/267/160" }" alt="flag" class="card-top-img">
        <div class="card-body p-4">
           <h3 class="card-title">${el.name}</h3>
           <ul class="card-list p-0">
              <li class="card-list-item list-unstyled"><strong>Population: </strong> ${el.population} </li>
              <li class="card-list-item list-unstyled"><strong>Region: </strong> ${el.region} </li>
              <li class="card-list-item list-unstyled"><strong>Capital: </strong> ${el.capital} </li>
  
           </ul>
  
           <button class="btn btn-primary" data-id="${el.name}">READ MORE . . .</button>
        </div>`);
        $('.wrapper').appendChild(card);
    })
}





// select ga option qo'shish
function selectFill(data){
    const massiv=[]
    data.forEach((el)=>{
        if(!massiv.includes(el.region)){
            massiv.push(el.region);
        }

    })

    massiv.sort();
    massiv.unshift('All');
    massiv.forEach((el)=>{
        const option=crElement('option','item',el);
        $('#region').appendChild(option);
    })
}





// search ni ishlatish


$('#filmName').addEventListener('keypress',(el)=>{
    if(el.target.value.trim().length!==0 && el.keyCode===13){
        $('.wrapper').innerHTML = `<span class="loader"></span>`;
        
        setTimeout(() => {
       $('.wrapper').innerHTML="";
        sortCountries(el.target.value);
        }, 1500)
    }    
})


// cuuntries name filter

async function sortCountries(country){
    const davlat=await fetch(`${URL}name/${country}`);
    const data =await davlat.json();
    if(davlat.status===404){
        $('.info').innerHTML = "<h1 class='text-center w-100'> BUNDAY DAVLAT YO'Q</h1>"
    }
    else{
        $('.info').innerHTML = `<h1 class='text-center w-100'> Qidiruv natijasi:${data.length}</h1>`;
      countriesRelease(data)
    }
} 



// region sort qilish
 
async function regionCort(region){
    $('.wrapper').innerHTML="";
    if(region==="all"){
        const davlat=await fetch(`${URL}all`);
        const data= await davlat.json();
       if(davlat.status===404) {
        $('.info').innerHTML = "<h1 class='text-center w-100'>NOT FOUND 404</h1>"

       }
       else{
        $('.info').innerHTML = `<h1 class='text-center w-100'> Qidiruv natijasi:${data.length}</h1>`;
         countriesRelease(data)
       }
    }
    else{
        const davlat=await fetch(`${URL}region/${region}`);
        const data= await davlat.json();
        // console.log(data);
        if(davlat.status===404) {
            $('.info').innerHTML = "<h1 class='text-center w-100'>NOT FOUND 404</h1>"
    
           }
           else{
            $('.info').innerHTML = `<h1 class='text-center w-100'> Qidiruv natijasi:${data.length}</h1>`;
             countriesRelease(data)
           }
    }
}

$('#region').addEventListener('change',(el)=>{
    $('.wrapper').innerHTML = ` <div class="d-flex justify-content-center align-items-center m-5 h-100 w-100"><span class="loader"></span> </div>`;
    
    setTimeout(() => {
       $('.wrapper').innerHTML = ""

    regionCort(el.target.value.toLowerCase());
     }, 1500)
} )