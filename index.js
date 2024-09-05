
let data=[];

function fetchData() {
  fetch('data.json')
  .then(response =>{
    if(!response.ok){
      throw new Error('network response was not ok'+ response.statusText);
    }
    return response.json();
  })
  .then(jsonData=> {
    data=jsonData;
    updateTime('daily');
  })
  .catch(error=> console.error('there was a problem with the fetch operation', error));
}

function updateTime(time){
  data.forEach(item=>{
    const activityDiv=document.querySelector(`.activity-div.${item.title.toLowerCase()}`);
    if(activityDiv){
      const currentHours=activityDiv.querySelector('.div-1 h1');
      const previousHours=activityDiv.querySelector('.div-1 p');

      currentHours.innerHTML=`${item.timeframes[time].current}hrs`;
      previousHours.innerHTML=`Previous - ${item.timeframes[time].previous} hrs`;

    }
  });
}

function showDaily(){
  updateTime('daily');
}

function showWeekly(){
  updateTime('weekly');
}

function showMonthly(){
  updateTime('monthly');
}

document.addEventListener('DOMContentLoaded', ()=>{
  fetchData();
  document.getElementById('daily').checked= true;
});