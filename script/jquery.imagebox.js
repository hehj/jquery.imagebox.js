/**
 * imagebox - jQuery plugins
 * 
 * Copyright 2015 hehangjie [ hehangjie@hotmail.com ] 
 * 
 * Dependencies:
 *   fancybox
 */
(function($) {     
	$.fn.imagebox = function(dataOptions,cssOptions) {   
		var dataDefaults = {
				requestUrl:'',
				idField:'id',
				urlField: 'url',
				descriptionField: 'description',
				toolbarArray : [{"key":"CHECK ALL","bindFunction":"$.fn.imagebox.checkAll()"},{"key":"CHECK NONE","bindFunction":"$.fn.imagebox.checkNone()"}],
				menuArray : [{"key":"EDIT","bindFunction":"imageEdit"},{"key":"DELETE","bindFunction":"imageDel"}]
		};
		var cssDefaults = {    
				toolbar:'show',
				background: '#EFEFEF',
				borderBottom: '1px dashed #ccc',
				padding: '8px 8px 8px 8px',
				width: '140px',
				height: '140px',
				float: 'left',	
		};    

		var cssOpts = $.extend(cssDefaults, cssOptions);   
		var dataOpts = $.extend(dataDefaults, dataOptions);  
	    var $this = $(this);
	    
	    $.ajax({
			url : dataOpts.requestUrl,
			context : document.body,
			success : function(data, type) { 
				var dataObj = eval("(" + data + ")");// 转换为json对象
				var html = "";
				html +='<div class="imagetoolbar">';
				$.each(
						dataOpts.toolbarArray,
						function(idy, menu) {
							html += '<a href="#" onclick="'+menu.bindFunction+'">'+menu.key+'</a>&nbsp;';
				});
				html += '</div>';
				$.each(
					dataObj.rows,
					function(idx, item) {
						html +='<div class="imagebox">';
						//a img begin
						html +='<a rel="images_group" href="';
						html += item[dataOpts.urlField];
						html +='" title="'+item[dataOpts.descriptionField]+'"> <img alt="" src="';
						html += item.url;
						html +='" width="'+cssOpts.width+'" height="'+cssOpts.height+'" /></a>';
						//a img end 
						//menu DIV Begin
						html += '<div class="absmenu"><ul class="absul">';
						$.each(
								dataOpts.menuArray,
								function(idy, menu) {
									html += '<li><a href="#" onclick="'+menu.bindFunction+'('+item[dataOpts.id]+')">'+menu.key+'</a></li>';
						});
						html += '</ul></div>';
						//menu DIV End
						//checkbox begin
						html += '<div class="abschk">';
						html += '<input name="chkItem" type="checkbox" value="'+item[dataOpts.idField]+'" />';
						html += '</div>';
						//checkbox end
						html +='</div>';
					});

				$this.html(html);
				var $imagetoolbar =  $('.imagetoolbar');
				//$imagetoolbar.css("background",cssOpts.background);
				$imagetoolbar.css("padding",cssOpts.padding);
				$imagetoolbar.css("border-bottom",cssOpts.borderBottom);
				
				var $imagebox =  $('.imagebox');
			    $imagebox.css("width",cssOpts.width);
			    $imagebox.css("height",cssOpts.height);
			    $imagebox.css("background",cssOpts.background);
			    $imagebox.css("padding",cssOpts.padding);
			    $imagebox.css("border-bottom",cssOpts.borderBottom);
			    $imagebox.css("float",cssOpts.float);
			    $imagebox.css("position","relative");
			    
			    var $absmenu = $('.absmenu');
			    $absmenu.css("position","absolute");
			    $absmenu.css("background",'#FFFFFF');
			    $absmenu.css("left","10px");
			    $absmenu.css("top","15px");
			    $absmenu.hide();
			    
			    var $absul = $('.absul');
			    $absul.css("font-size","5px");
			    $absul.css("margin","5px 15px 5px 5px");
			    $absul.css("list-style-type","none");
			    
			    var $abschk = $('.abschk');
			    $abschk.css("position","absolute");
			    $abschk.css("left","10px");
			    $abschk.css("top","5px");
			    
			    if(cssOpts.toolbar!='show'){		    	
					$imagetoolbar.hide();
					$abschk.hide(); 
				}
			    
			    $('a[rel=images_group]').fancybox({
					'transitionIn' : 'fade', 
					'transitionOut' : 'fade', 
					'titlePosition' : 'over', 
					'titleFormat' : function(title, currentArray,
							currentIndex, currentOpts) { //可以自定义标题的格式
						return '<span id="fancybox-title-over">Image '
								+ (currentIndex + 1) + ' / '
								+ currentArray.length
								+ (title.length ? ' &nbsp; ' + title : '')
								+ '</span>';
						}
			    });
			    
			    $(".imagebox").mouseenter(function(){
			    	$(this).find(".absmenu").show();
			    	$(this).css("background","#9999FF");
			    });
			    
			    $(".imagebox").mouseleave(function(){
			    	$(this).css("background","#EFEFEF");
			    	$(this).find(".absmenu").hide();
			    });
			    
			}
		});	    
	};   
	
	$.fn.imagebox.checkAll = function(){
		$("[name = chkItem]:checkbox").attr("checked", true);
	}
	
	$.fn.imagebox.checkNone = function(){
		$("[name = chkItem]:checkbox").attr("checked", false);
	}
})(jQuery);    