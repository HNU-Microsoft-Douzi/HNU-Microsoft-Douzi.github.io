jQuery(document).ready(function(){
		avio_faq();
		avio_portfolio();	
		avio_dd_menu();

}); 
		function avio_portfolio(){
			jQuery(".jcap-caption").hover(function(){
			    img_wdt = jQuery('.jcap').width() -40;
			    img_hgt = jQuery('.jcap').height() -40;
				jQuery(this).css({backgroundImage: "none"})
				.stop(true, true).animate({height: img_hgt, width: img_wdt}, 300)
				.children('div').stop(true, true).delay(200).fadeIn(1);
			}, function(){
				jQuery(this).delay(100).css({backgroundImage: ""})
				.animate({height: '10px', width: '10px'}, 300)
				.children('div').hide(10);	
			});
		}
		function avio_faq() {
			jQuery("a.faqa").toggle(function(){
				jQuery(this).next('p').slideDown(100);
				jQuery(this).prev('span').removeClass('plus').addClass('min');
			},function(){
				jQuery(this).next('p').slideUp(100);
				jQuery(this).prev('span').removeClass('min').addClass('plus');				
			});
		}       
		function avio_dd_menu(){	
			jQuery("ul#header-menu li").hover(function(){
				jQuery(this).stop().find('ul:first').css({visibility: "visible",display: "none"}).animate({height: 'toggle'}, 200);
			}, function(){
				jQuery('ul:first',this).css('visibility', 'hidden');
			});
		    jQuery('.second-lvl').parent("li").addClass('arrowdown');
		    jQuery('.third-lvl').parent("li").addClass('arrowright');
			jQuery(".second-lvl").hover(function(){
				jQuery(this).parent("li").addClass("active");							
			}, function(){
				jQuery(this).parent("li").removeClass("active");	
			});
		}
		