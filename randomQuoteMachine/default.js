
function getQuote() {
  var xhr = new XMLHttpRequest();
  var proxy = 'http://crossorigin.me/';
  var api = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  var url = proxy + api;

  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = xhr.response;
      // console.log(response);
      return xhr;
    }
  }
}
