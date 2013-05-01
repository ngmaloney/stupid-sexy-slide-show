Slider = Backbone.View.extend

  events:
    'click a.next': 'nextSlide'
    'click a.prev': 'prevSlide'
    'click .navigation a': 'navigateTo'

  initialize: (options) ->
    @collection = options.collection
    @template = options.template
    @bind 'transition', @updateNav

  render: ->
    content = @template({slides: @collection.toJSON()})
    @$el.html(content)
    @renderNav()
    @$el.find('li:first').fadeIn =>
      @trigger('transition')
    @$el.removeClass('loading')

  transition: (from, to) ->
    unless $(from).is(to)
      $(from).fadeOut "fast", =>
        $(to).fadeIn "fast"
        @trigger('transition')

  nextSlide: (e) ->
    e.preventDefault()
    from = @$el.find('.slides li:visible')
    if $(from).next().length > 0
      to = $(from).next()
    else
      to = $(from).prevAll().last()
    @transition(from, to)

  prevSlide: (e) ->
    e.preventDefault()
    from = @$el.find('.slides li:visible')
    if $(from).prev().length > 0
      to = $(from).prev()
    else
      to = $(from).nextAll().last()
    @transition(from, to)

  navigateTo: (e) ->
    e.preventDefault()
    from = @$el.find('li:visible')
    to = @$el.find($(e.target).attr('href'))
    @transition(from, to)

  renderNav: ->
    content = ""
    items = @$el.find('li.slide .title').each (index, elem) =>
      content += """<span class="index">#{index + 1}:</span> <a href="#slide-#{index}">#{$(elem).text()}</a>"""
    @$el.find('.navigation').html(content)

  updateNav: ->
    id = @$el.find('.slides li:visible').attr('id')
    if id
      elem = @$el.find('.navigation a[href=#' + id + ']')
      @$el.find('.navigation a').removeClass('active')
      @$el.find(elem).addClass('active')

  truncateString: (text, length) ->
    $.trim(text).substring(0,length).split(" ").slice(0, -1).join(" ") + "..."

class StupidSexySlideShow
  constructor: (options) ->
    new Slider(options).render()

window.StupidSexySlideShow ||= {}
window.StupidSexySlideShow = StupidSexySlideShow
