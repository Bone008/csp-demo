$(function () {
  // Super pro functionality for toggle buttons
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const lang = urlParams.get('language');
  const langSink = document.getElementById('lang')
  const iconSink = document.getElementById('langIcon')
  langSink.innerHTML = lang
  switch(lang){
    case "EN":
      // English
      iconSink.innerHTML = '<img src="en.png"></img> '
      console.log("EN");
      break;
    case "SE":
      // Swedish
      iconSink.innerHTML = '<img src="se.png"></img>' 
      // console.log("SE");
      break;
    default:
      //Set to english
      iconSink.innerHTML = '<img src="en.png"></img> '
      // console.log(lang)
  }

});