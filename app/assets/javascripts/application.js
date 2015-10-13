// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).ready(function(){
  getIdeas();
  upvote();
});

function getIdeas(){
  $.ajax({
    type:    "GET",
    url:     "http://localhost:3000/api/v1/ideas.json",
    success: function(ideas) {
      $.each(ideas, function(index, idea){
        addIdea(idea)
      });
    }
  });
};

function addIdea(idea){
  $("#ideas").append(
    "<div class='idea' data-id='" +
    idea.id +
    "'><h3>" + idea.title +
    "</h3><p>" + idea.body +
    "</p><ul class='vote'><li><button id='downvote' class='btn btn-default btn-xs'>Thumbs Down</button></li>" +
    "<li>" + idea.quality + "</li>" +
    "<li><button id='upvote' class='btn btn-default btn-xs'>Thumbs Up</button></div></li><br>"
  )
}

function upvote(){
  $("#ideas").delegate("#upvote","click", function(){
    var idea = $(this).closest('.idea')[0].outerHTML.split("\"")[3];
    var quality = this.closest('.idea').outerHTML.split('<li>')[2]
    moveQualityUp(idea, quality.substr(0, quality.length - 5));
  });
}

function moveQualityUp(id, quality) {
  var nextQuality = checkUpQuality(quality)
  var ideaParams = {idea: {quality: nextQuality}}
  $.ajax({
    type:    "PATCH",
    url:     "http://localhost:3000/api/v1/ideas/" + id + ".json",
    data:    ideaParams,
    success: function() {
      getIdeas()
    }
  });
}

function checkUpQuality(quality) {
  if(quality == 'Swill') {
    return 'Plausible'
  }
  else if (quality == 'Plausible') {
    return 'Genius'
  }
  return quality
}
