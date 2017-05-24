;(function($){
	//默认参数
	var defaults = {
		pageSize:9,
		itemSelector_base: '.easy-paging-item',
        itemSelector_filter: '.easy-paging-item',
		itemDisplay:'block',
		pagerSelector:'.easy-pager',
		beforeToPageCallback:null,
		afterToPageCallback:null,
		alwaysShowPager:false,
        prevHtml:"prev",
        nextHtml:"next"
	};	

	$.extend({
		easyPaging:function(options){
			var opts=$.extend({},defaults,options);
            var items_count=$(opts.itemSelector_filter).length;
            var pageCount =	parseInt(items_count/opts.pageSize)+(items_count%opts.pageSize==0?0:1);
	        var pager=$(opts.pagerSelector);

            var currentPage=function(){
			    return parseInt(pager.find(".active").data("page"));
		    };
		    var prevPage=function(){
			    var current=currentPage();
			    if(current==1) return;
			    var prev_page=current-1;
			    toPage(prev_page);
		    };
		    var nextPage=function(){
			    var current=currentPage();
			    var max_page=parseInt(pager.find(".pager-nums a:last").data("page"));
			    if(current==max_page) return;
			    var next_page=current+1;
			    toPage(next_page);
		    };
		    var toPage=function(index){
				if(opts.beforeToPageCallback!=null){
					opts.beforeToPageCallback(this,opts.itemSelector_base,opts.itemSelector_filter);
				}
				
			    pager.find(".pager-nums a.active").removeClass("active");
			    pager.find(".pager-nums a:eq("+(index-1)+")").addClass("active");
			    $(opts.itemSelector_base).hide();//隱藏所有 item
			    $(opts.itemSelector_filter).slice((index-1)*opts.pageSize,index*opts.pageSize).css("display",opts.itemDisplay);//顯示當前頁 item
				
				if(opts.afterToPageCallback!=null){
					opts.afterToPageCallback(this,opts.itemSelector_base,opts.itemSelector_filter);
				}
		    };
			
			
			
		    if(opts.alwaysShowPager || items_count>opts.pageSize){
				pager.show();
			}else{
				pager.hide();
			}
			
			pager.html("");
			pager.append('<a class="prev">'+opts.prevHtml+'</a>');	
			var pager_nums='<div class="pager-nums">';
			for(i=1;i<=pageCount;i++){
				pager_nums+=('<a data-page="'+i+'">'+i+'</a>');
			}	
			pager_nums+="</div>";
			pager.append(pager_nums);
			pager.append('<a class="next">'+opts.nextHtml+'</a>');		
			
			pager.find("a").off("click");
			pager.find("a").on("click",function(){
				if($(this).hasClass("prev")) prevPage();
				else if($(this).hasClass("next")) nextPage();
				else{
					var page=parseInt($(this).text());
					toPage(page);
				}
			});
			toPage(1);
			
			return {
				options:opts,
				currentPage:currentPage,
				nextPage:nextPage,
				prevPage:prevPage,
				toPage:toPage
			};
			
		}
	});
})(window.jQuery);