var Slide, Slider, Slides, StupidSexySlideShow,
  _this = this;

Slide = Backbone.Model.extend({});

Slides = Backbone.Collection.extend({
  model: Slide,
  initialize: function(models, options) {}
});

Slider = Backbone.View.extend({
  events: {
    'click a.next': 'nextSlide',
    'click a.prev': 'prevSlide',
    'click .navigation a': 'navigateTo'
  },
  initialize: function(options) {
    this.collection = options.collection;
    this.bind('transition', this.updateNav);
    return this.template = options.template;
  },
  render: function() {
    var content,
      _this = this;
    content = this.template({
      slides: this.collection.toJSON()
    });
    this.$el.html(content);
    this.renderNav();
    this.$el.find('li:first').fadeIn(function() {
      return _this.trigger('transition');
    });
    return this.$el.removeClass('loading');
  },
  transition: function(from, to) {
    var _this = this;
    if (!$(from).is(to)) {
      return $(from).fadeOut("fast", function() {
        $(to).fadeIn("fast");
        return _this.trigger('transition');
      });
    }
  },
  nextSlide: function(e) {
    var from, to;
    e.preventDefault();
    from = this.$el.find('.slides li:visible');
    if ($(from).next().length > 0) {
      to = $(from).next();
    } else {
      to = $(from).prevAll().last();
    }
    return this.transition(from, to);
  },
  prevSlide: function(e) {
    var from, to;
    e.preventDefault();
    from = this.$el.find('.slides li:visible');
    if ($(from).prev().length > 0) {
      to = $(from).prev();
    } else {
      to = $(from).nextAll().last();
    }
    return this.transition(from, to);
  },
  navigateTo: function(e) {
    var from, to;
    e.preventDefault();
    from = this.$el.find('li:visible');
    to = this.$el.find($(e.target).attr('href'));
    return this.transition(from, to);
  },
  renderNav: function() {
    var content, items,
      _this = this;
    content = "";
    items = this.$el.find('li.slide .title').each(function(index, elem) {
      return content += "<span class=\"index\">" + (index + 1) + ":</span> <a href=\"#slide-" + index + "\">" + ($(elem).text()) + "</a>";
    });
    return this.$el.find('.navigation').html(content);
  },
  updateNav: function() {
    var elem, id;
    id = this.$el.find('.slides li:visible').attr('id');
    if (id) {
      elem = this.$el.find('.navigation a[href=#' + id + ']');
      this.$el.find('.navigation a').removeClass('active');
      return this.$el.find(elem).addClass('active');
    }
  },
  truncateString: function(text, length) {
    return $.trim(text).substring(0, length).split(" ").slice(0, -1).join(" ") + "...";
  }
});

StupidSexySlideShow = (function() {

  function StupidSexySlideShow(options) {
    new Slider(options).render();
  }

  return StupidSexySlideShow;

})();

window.StupidSexySlideShow || (window.StupidSexySlideShow = {});

window.StupidSexySlideShow = StupidSexySlideShow;

