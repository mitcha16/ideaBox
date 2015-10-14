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
  downvote();
  createIdea();
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
  $("#ideas").prepend(
    "<div class='idea' data-id='" +
    idea.id +
    "'><h3>" + idea.title +
    "</h3><p>" + idea.body +
    "</p><ul class='vote'><li><button id='downvote' class='btn btn-default btn-xs'>Thumbs Down</button></li>" +
    "<li class='quality'>" + idea.quality + "</li>" +
    "<li><button id='upvote' class='btn btn-default btn-xs'>Thumbs Up</button></div></li><br>"
  )
}

function upvote(){
  $("#ideas").delegate("#upvote","click", function(){
    var idea = $(this).closest('.idea')[0].outerHTML.split("\"")[3];
    var quality = this.closest('.idea').outerHTML.split('li')[4];
    var text = $(this).closest('li').prev()[0]
    moveQualityUp(idea, quality.substr(4, quality.length - 6), text);
  });
}

function downvote(){
  $("#ideas").delegate("#downvote","click", function(){
    var idea = $(this).closest('.idea')[0].outerHTML.split("\"")[3];
    var quality = this.closest('.idea').outerHTML.split('li')[4];
    var text = $(this).closest('li').next()[0]
    moveQualityDown(idea, quality.substr(4, quality.length - 6), text);
  });
}

function moveQualityUp(id, quality, text) {
  var nextQuality = checkUpQuality(quality);
  var ideaParams = {idea: {quality: nextQuality}}
  changeQuality(ideaParams, nextQuality, text, id)
}

function moveQualityDown(id, quality, text) {
  var nextQuality = checkDownQuality(quality);
  var ideaParams = {idea: {quality: nextQuality}}
  changeQuality(ideaParams, nextQuality, text, id)
}
function changeQuality(ideaParams, nextQuality, text, id) {
  $.ajax({
    type:    "PATCH",
    url:     "http://localhost:3000/api/v1/ideas/" + id + ".json",
    data:    ideaParams,
    success: function() {
      text.innerHTML = nextQuality;
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

function checkDownQuality(quality) {
  if(quality == 'Genius') {
    return 'Plausible'
  }
  else if (quality == 'Plausible') {
    return 'Swill'
  }
  return quality
}

function createIdea() {
  $("#create-idea").on("click", saveIdea);
}

function saveIdea(){
  var ideaParams = {
    idea: {
      title: $("#title").val(),
      body: $("#body").val()
    }
  }

  $.ajax({
    type: "POST",
    url:  "http://localhost:3000/api/v1/ideas.json",
    data: ideaParams,
    success: function(idea) {
      addIdea(idea);
      $("#title").empty();
      $("#body").val('Body')
    }
  })
}
