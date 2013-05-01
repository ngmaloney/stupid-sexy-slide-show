/*jslint unparam: true, browser: true, indent: 2 */
(function(e,t,n,r){"use strict";Foundation.libs.section={name:"section",version:"4.1.3",settings:{deep_linking:!1,one_up:!0,section_selector:"[data-section]",region_selector:"section, .section, [data-section-region]",title_selector:".title, [data-section-title]",active_region_selector:"section.active, .section.active, .active[data-section-region]",content_selector:".content, [data-section-content]",nav_selector:'[data-section="vertical-nav"], [data-section="horizontal-nav"]',callback:function(){}},init:function(t,n,r){var i=this;return Foundation.inherit(this,"throttle data_options position_right offset_right"),typeof n=="object"&&e.extend(!0,i.settings,n),typeof n!="string"?(this.set_active_from_hash(),this.events(),!0):this[n].call(this,r)},events:function(){var r=this;e(this.scope).on("click.fndtn.section","[data-section] .title, [data-section] [data-section-title]",function(t){var n=e(this),i=n.closest(r.settings.section_selector);r.toggle_active.call(this,t,r),r.reflow()}),e(t).on("resize.fndtn.section",r.throttle(function(){r.resize.call(this)},30)).on("hashchange",function(){r.settings.toggled||(r.set_active_from_hash(),e(this).trigger("resize"))}).trigger("resize"),e(n).on("click.fndtn.section",function(t){e(t.target).closest(r.settings.title_selector).length<1&&e(r.settings.nav_selector).children(r.settings.region_selector).removeClass("active").attr("style","")})},toggle_active:function(t,n){var r=e(this),n=Foundation.libs.section,i=r.closest(n.settings.region_selector),s=r.siblings(n.settings.content_selector),o=i.parent(),u=e.extend({},n.settings,n.data_options(o)),a=o.children(n.settings.active_region_selector);n.settings.toggled=!0,!u.deep_linking&&s.length>0&&t.preventDefault();if(i.hasClass("active"))(n.small(o)||n.is_vertical_nav(o)||n.is_horizontal_nav(o)||n.is_accordion(o))&&(a[0]!==i[0]||a[0]===i[0]&&!u.one_up)&&i.removeClass("active").attr("style","");else{var a=o.children(n.settings.active_region_selector),f=n.outerHeight(i.children(n.settings.title_selector));if(n.small(o)||u.one_up)n.small(o)?a.attr("style",""):a.attr("style","visibility: hidden; padding-top: "+f+"px;");n.small(o)?i.attr("style",""):i.css("padding-top",f),i.addClass("active"),a.length>0&&a.removeClass("active").attr("style",""),n.is_vertical_tabs(o)&&(s.css("display","block"),a!==null&&a.children(n.settings.content_selector).css("display","none"))}setTimeout(function(){n.settings.toggled=!1},300),u.callback()},resize:function(){var t=Foundation.libs.section,n=e(t.settings.section_selector);n.each(function(){var n=e(this),r=n.children(t.settings.active_region_selector),i=e.extend({},t.settings,t.data_options(n));if(r.length>1)r.not(":first").removeClass("active").attr("style","");else if(r.length<1&&!t.is_vertical_nav(n)&&!t.is_horizontal_nav(n)&&!t.is_accordion(n)){var s=n.children(t.settings.region_selector).first();(i.one_up||!t.small(n))&&s.addClass("active"),t.small(n)?s.attr("style",""):s.css("padding-top",t.outerHeight(s.children(t.settings.title_selector)))}t.small(n)?r.attr("style",""):r.css("padding-top",t.outerHeight(r.children(t.settings.title_selector))),t.position_titles(n),t.is_horizontal_nav(n)&&!t.small(n)||t.is_vertical_tabs(n)?t.position_content(n):t.position_content(n,!1)})},is_vertical_nav:function(e){return/vertical-nav/i.test(e.data("section"))},is_horizontal_nav:function(e){return/horizontal-nav/i.test(e.data("section"))},is_accordion:function(e){return/accordion/i.test(e.data("section"))},is_horizontal_tabs:function(e){return/^tabs$/i.test(e.data("section"))},is_vertical_tabs:function(e){return/vertical-tabs/i.test(e.data("section"))},set_active_from_hash:function(){var n=t.location.hash.substring(1),r=e("[data-section]"),i=this;r.each(function(){var t=e(this),r=e.extend({},i.settings,i.data_options(t));if(n.length>0&&r.deep_linking){var s=t.children(i.settings.region_selector).attr("style","").removeClass("active");s.map(function(){return e(this).children('.content[data-slug="'+n+'"], [data-section-content][data-slug="'+n+'"]')}).parent().addClass("active")}})},position_titles:function(t,n){var r=this,i=t.children(this.settings.region_selector).map(function(){return e(this).children(r.settings.title_selector)}),s=0,o=0,r=this;typeof n=="boolean"?i.attr("style",""):i.each(function(){r.is_vertical_tabs(t)?(e(this).css("top",o),o+=r.outerHeight(e(this))):(r.rtl?e(this).css("right",s):e(this).css("left",s),s+=r.outerWidth(e(this)))})},position_content:function(t,n){var r=this,i=t.children(r.settings.region_selector),s=i.map(function(){return e(this).children(r.settings.title_selector)}),o=i.map(function(){return e(this).children(r.settings.content_selector)});if(typeof n=="boolean")o.attr("style",""),t.attr("style","");else if(r.is_vertical_tabs(t)&&!r.small(t)){var u=0,a=Number.MAX_VALUE,f=null;i.each(function(){var n=e(this),i=n.children(r.settings.title_selector),s=n.children(r.settings.content_selector),o=0;f=r.outerWidth(i),o=r.outerWidth(t)-f,o<a&&(a=o),u+=r.outerHeight(i),e(this).hasClass("active")||s.css("display","none")}),i.each(function(){var t=e(this).children(r.settings.content_selector);t.css("minHeight",u),t.css("maxWidth",a-2)}),t.css("maxWidth",f+a)}else i.each(function(){var t=e(this),n=t.children(r.settings.title_selector),i=t.children(r.settings.content_selector);r.rtl?i.css({right:r.position_right(n)+1,top:r.outerHeight(n)-2}):i.css({left:n.position().left-1,top:r.outerHeight(n)-2})}),typeof Zepto=="function"?t.height(this.outerHeight(s.first())):t.height(this.outerHeight(s.first())-2)},position_right:function(t){var n=this,r=t.closest(this.settings.section_selector),i=r.children(this.settings.region_selector),s=t.closest(this.settings.section_selector).width(),o=i.map(function(){return e(this).children(n.settings.title_selector)}).length;return s-t.position().left-t.width()*(t.index()+1)-o},reflow:function(t){var t=t||n;e(this.settings.section_selector,t).trigger("resize")},small:function(t){var n=e.extend({},this.settings,this.data_options(t));return this.is_horizontal_tabs(t)?!1:t&&this.is_accordion(t)?!0:e("html").hasClass("lt-ie9")?!0:e("html").hasClass("ie8compat")?!0:e(this.scope).width()<768},off:function(){e(this.scope).off(".fndtn.section"),e(t).off(".fndtn.section"),e(n).off(".fndtn.section")}}})(Foundation.zj,this,this.document);