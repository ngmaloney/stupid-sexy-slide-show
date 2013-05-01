(function(){var e,t;e=Backbone.View.extend({events:{"click a.next":"nextSlide","click a.prev":"prevSlide","click .navigation a":"navigateTo"},initialize:function(e){return this.collection=e.collection,this.template=e.template,this.bind("transition",this.updateNav)},render:function(){var e,t=this;return e=this.template({slides:this.collection.toJSON()}),this.$el.html(e),this.renderNav(),this.$el.find("li:first").fadeIn(function(){return t.trigger("transition")}),this.$el.removeClass("loading")},transition:function(e,t){var n=this;if(!$(e).is(t))return $(e).fadeOut("fast",function(){return $(t).fadeIn("fast"),n.trigger("transition")})},nextSlide:function(e){var t,n;return e.preventDefault(),t=this.$el.find(".slides li:visible"),$(t).next().length>0?n=$(t).next():n=$(t).prevAll().last(),this.transition(t,n)},prevSlide:function(e){var t,n;return e.preventDefault(),t=this.$el.find(".slides li:visible"),$(t).prev().length>0?n=$(t).prev():n=$(t).nextAll().last(),this.transition(t,n)},navigateTo:function(e){var t,n;return e.preventDefault(),t=this.$el.find("li:visible"),n=this.$el.find($(e.target).attr("href")),this.transition(t,n)},renderNav:function(){var e,t,n=this;return e="",t=this.$el.find("li.slide .title").each(function(t,n){return e+='<span class="index">'+(t+1)+':</span> <a href="#slide-'+t+'">'+$(n).text()+"</a>"}),this.$el.find(".navigation").html(e)},updateNav:function(){var e,t;t=this.$el.find(".slides li:visible").attr("id");if(t)return e=this.$el.find(".navigation a[href=#"+t+"]"),this.$el.find(".navigation a").removeClass("active"),this.$el.find(e).addClass("active")},truncateString:function(e,t){return $.trim(e).substring(0,t).split(" ").slice(0,-1).join(" ")+"..."}}),t=function(){function t(t){(new e(t)).render()}return t}(),window.StupidSexySlideShow||(window.StupidSexySlideShow={}),window.StupidSexySlideShow=t}).call(this);