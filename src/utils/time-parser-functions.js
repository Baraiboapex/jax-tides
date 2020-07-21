import moment from 'moment';

//Time parser for normal time. For example: 00:00 is 12:00 a.m. and 23:00 is 11:00 p.m. 
export function parseNormalTime(time, clockOnly){
    const date = time.toString().slice(0,11);
    time = time.toString().slice(11,time.length).match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return (clockOnly !== "clock_only" ?  date + ' ' + time.join ('') : time.join('')); // return adjusted time or original string
}

export function getCurrentFullDay(){
  const today = new Date();

  const full = today.getFullYear().toString() + "-" + 
  (today.getMonth()+1 >= 10 ? (today.getMonth()+1).toString() : "0"+(today.getMonth()+1).toString()) + "-" + 
  (today.getDate() >= 10 ? (today.getDate()).toString() : "0"+(today.getDate()).toString() ) + " " +
  (today.getHours() >= 10 ? today.getHours().toString() : "0"+today.getHours().toString()) + ":" + 
  (today.getMinutes() >= 10 ? today.getMinutes().toString() : "0"+today.getMinutes().toString());

  return full;
};

export function getCurrent24HourTime(){
  const today = new Date();

  const current24HourTime = (today.getHours() >= 10 ? today.getHours().toString() : "0"+today.getHours().toString())+ ":" + 
  (today.getMinutes() >= 10 ? today.getMinutes().toString() : "0"+today.getMinutes().toString());

  return current24HourTime;
}

export function getFullDateForAPI(){
  const today = new Date();

  const fullDateForAPI = today.getFullYear().toString() + 
  (today.getMonth()+1 >= 10 ? (today.getMonth()+1).toString() : "0"+(today.getMonth()+1).toString()) +
  (today.getDate() >= 10 ? (today.getDate()).toString() : "0"+(today.getDate()).toString() );

  return fullDateForAPI;
}

export function isEOD(times){
    const allTimes = times.map(time => moment(time.t));
    const latestTime = moment.max(allTimes);
    return moment(new Date()).valueOf() > latestTime;
};

export function getNextDayDateForAPI(){
  const today = new Date();
  const nextDay = new Date().setDate(today.getDate() + 1);
  
  return moment(nextDay).format("YYYYMMDD");
}

export function getFullDateForAPIWithClockTime(){
  const today = new Date();

  const fullDateForAPIWithClockTime = today.getFullYear().toString() + 
  (today.getMonth()+1 >= 10 ? (today.getMonth()+1).toString() : "0"+(today.getMonth()+1).toString()) + 
  (today.getDate() >= 10 ? (today.getDate()).toString() : "0"+(today.getDate()).toString() ) + " " +
  (today.getHours() >= 10 ? today.getHours().toString() : "0"+today.getHours().toString())+ ":" + 
  (today.getMinutes() >= 10 ? today.getMinutes().toString() : "0"+today.getMinutes().toString());

  return fullDateForAPIWithClockTime;
}

export function latestTime(arr){
  const nextTime = arr.map(time => time.t.replace(/-/gi,'/'))
  .map(s => moment(s, "YYYY/MM/DD HH:mm"))
  .sort(m=>m.valueOf())
  .find(m=>m.isAfter());

  const whatToReturn = (nextTime !== undefined ? 
    arr.filter(item => item.t.replace(/-/gi,'/') === nextTime._i)[0] 
    :
    arr.filter(item => item.t ===  moment(arr[arr.length - 1].t, "YYYY/MM/DD HH:mm")._i)[0]
  );

  return whatToReturn;
}
