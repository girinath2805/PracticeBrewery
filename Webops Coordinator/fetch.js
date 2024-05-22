const temperaturedisplay = document.querySelector('#temperature');
const selectelement = document.querySelector('#date');


fetch('https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2023-04-10&end_date=2023-04-15&daily=temperature_2m_max&timezone=GMT')
.then((data) =>{
    console.log(data);
    return data.json();
})
.then((Objectdata) => {
    console.log(Objectdata);
    const dateselect = Objectdata.daily.time.map((date) => {
        return `<option value="${date}">${date}</option>`;
    });
    selectelement.innerHTML = dateselect.join('');

    selectelement.addEventListener('change',() => {
        const chosendate = selectelement.value;
        const temperatureindex = Objectdata.daily.indexOf(chosendate);
        const temperature = Objectdata.daily.temperature_2m_max[temperatureindex];
        temperaturedisplay.textContent = 'Temperature = ${temperature}°C';

    })

})
.catch(error=> {
    console.log(error);
})



