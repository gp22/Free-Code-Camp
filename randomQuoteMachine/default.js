
function getQuote() {
  var request = new XMLHttpRequest();
  var proxy = 'http://crossorigin.me/';
  var api = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  var url = proxy + api;

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = this.responseXML;
      return response;
    }
  }

  request.open('GET', url, true);
  request.send();
}
