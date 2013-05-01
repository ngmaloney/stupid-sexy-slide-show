Introduction
=============

Stupid Sexy Slide Show is a minimalistic javascript content slider built for easy integration with Backbone apps. It is template agnostic meaning it will work with any Backbone compatible template library. All styling is handled via CSS.

Dependencies
============
* JQuery
* Backbone
* Underscore

Usage
=====

    slides = new Backbone.Collection([
      {title: "Slide 1", image: "images/slides/slide1.jpg"},
      {title: "Slide 2", image: "images/slides/slide2.jpg"},
      {title: "Slide 3", image: "images/slides/slide3.jpg"},
      {title: "Slide 4", image: "images/slides/slide4.jpg"}
    ])

    template = Handlebars.compile($('#slideshow-template').html())

    slideshow = new StupidSexySlideShow({el: '#slideshow1', collection: slides, template: template})
