const apikey="38ec574937bbbe675179d9c58936be06";
const apiurl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchbox=document.querySelector('.search input');
const searchbtn=document.querySelector('.search button');
const icon= document.querySelector('.weathericon');

async function check(city){
    const response=await fetch(apiurl +city+`&appid=${apikey}`);

    if(response.status==404){
        document.querySelector('.weather').style.display='none';
        document.querySelector('.error').style.display='block';
        document.querySelector('.error').style.color='red';

    }
    else{
        var data=await response.json();
    

    document.querySelector('.city').innerHTML=data.name;
    document.querySelector('.temp').innerHTML=data.main.temp +'°C';
    document.querySelector('.humidity').innerHTML=data.main.humidity +'%';
    document.querySelector('.wind').innerHTML=data.wind.speed +' Km/h';

    if(data.weather[0].main=="Clouds"){
        icon.src='images/clouds.png';

    }
     else if(data.weather[0].main=="Clear"){
        icon.src='images/clear.png';

    }
     else if(data.weather[0].main=="Rain"){
        icon.src='images/rain.png';

    }
    else if(data.weather[0].main=="Drizzle"){
        icon.src='images/drizzle.png'

    }
    else if(data.weather[0].main=="Mist"){
        icon.src='images/mist.png'

    }

    document.querySelector('.weather').style.display='block';
    document.querySelector('.error').style.display='none';

}

    }
    
searchbtn.addEventListener('click',()=>{
    check(searchbox.value); 
})
 

