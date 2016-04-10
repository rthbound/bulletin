// localStorage helpers:
function fetchKey(key) {
  return localStorage.getItem(key);
}

function pollLocationStored() {
  return !!fetchKey('pollLocationName');
}

function saveKey(key, value) {
  localStorage.setItem(key, value);
}

var vue = new Vue({
  el: '#app',
  methods: {
    findEvents: function() {
      url = 'https://jsonp.afeld.me/?url=https://go.berniesanders.com/page/event/search_results?zip_radius[1]=1000000&country=US&radius_unit=mi&format=json&orderby=zip_radius&zip_radius[0]=' + this.zipCode;
      $.getJSON(url, function(data) {
        debugger;
        this.events.push(data.results);
      });
    },

    findPoll: function() {
      url = 'https://ppapi.democrats.org/api?api_key=MjBhNGFhNzY5YTk5ZjkyY2JiN2I1ZjE1' + '&address=' + this.findPollData.trim();
      $.getJSON(url, function(data) {
        if (data.status !== 'success') {
          alert("Sorry! We can't find a polling location for that address. :(");
        } else {
          vue.pollLocationName = data.pollingLocation.locationName;
          vue.pollLocationLine1 = data.pollingLocation.line1;
          vue.pollLocationLine2 = data.pollingLocation.city + ', ' + data.pollingLocation.state + ' ' + data.pollingLocation.zip;
          vue.pollLocation = true;
          vue.findPollData = '';
        }
      });
    },

    getZipCode: function() {
      if (!this.zipCode) {
        this.zipCode = window.prompt('What is your zip code?', '');
      }
    },

    noPollLocation: function() {
      return !this.pollLocation;
    },
  },

  data: {
    events: [],
    findPollData: '',
    heading: 'The Bernie Bulletin',
    news: [
      { title: 'NJ Voter Affiliation Deadline', description: 'You must be registered as a Democrat by April 13!' },
      { title: 'New York Primary', description: 'The New York primary is on April 13th -- make sure know your polling location!' }
    ],
    pollLocation: pollLocationStored(),
    pollLocationName: fetchKey('pollLocationName'),
    pollLocationLine1: fetchKey('pollLocationLine1'),
    pollLocationLine2: fetchKey('pollLocationLine2'),
    zipCode: fetchKey('zipCode')
  },

  ready: function() {
    this.$watch('pollLocationName', function(value){
      saveKey('pollLocationName', value);
    });

    this.$watch('pollLocationLine1', function(value){
      saveKey('pollLocationLine1', value);
    });

    this.$watch('pollLocationLine2', function(value){
      saveKey('pollLocationLine2', value);
    });

    this.$watch('zipCode', function(value){
      saveKey('zipCode', value);
    });
  },
})
