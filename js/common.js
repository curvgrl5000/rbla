/*-------------------------------------------------------------------------

	Theme Name: EGO - html - v.1
	
	For any questions concerning this theme please refer to documention or
	our forum at support.udfrance.com.

/*------------------------------------------------------------------------

//GENERAL FUNCTONS ///////////////////////////////////////////////////////

-------------------------------------------------------------------------*/

jQuery(document).ready(function(){
						   
	
	/*vars used throughout*/
	var thumb = jQuery('.thumb,.round-thumb'),
		thumbW,
		thumbH,
		thumbCaption,
		target,
		hoverSpeed=500,
		hoverEase='easeOutExpo',
	 	targetNetwork =jQuery('ul.socialSmall li a'),
		toggleMenu =jQuery('.mobileMenuToggle'),
		lightboxTransition = 'fade',				//Set lightbox transition type
	 	overlayOpacity =0.8,						//Fancybox overlay opacity
	 	overlayColor = '#000',						//Fancybox overlay color	
	 	videoWidth = 663,							//Fancybox video width
	 	videoHeight = 465;							//Fancybox video height
		lazyload = true;


	
	//LAZY LOADING -------------------------------------------------------------------------/
		

  	jQuery(function() {
		
		 if(lazyload==false || isMobile == true) return false;
			 
          jQuery("img.lazy").lazyload({
             placeholder : "images/blank.gif",
             effect : "fadeIn"
          });
		  
     });
	
	
	//MOBILE MENU -----------------------------------------------------------------------/
	
	
	toggleMenu.on('click', function(event) {
									
		if(jQuery(this).parent().find('ul.navigation').is(':hidden')){
		
			jQuery(this).parent().find('ul.navigation').slideDown();
			jQuery(this).addClass('open');

			
		}else{
			
			jQuery(this).parent().find('ul.navigation').slideUp();
			jQuery(this).removeClass('open');
		
			
		}
		
		event.preventDefault();
									
	});
	

	//ROLLOVER SPECIFIC ---------------------------------------------------------------------/
		
		
	/*general
	-------------------*/
			
	thumb.on({

		 mouseenter: function () {
				 
			 //check if device is mobile 
			 //or within an inactive filter category
			 //or if its video content in which case do nothing
			 if(isMobile == true) return false;
			 
			 thumbW = thumb.find('a').find('img').width();
			 thumbH = thumb.find('a').find('img').height();
			 
			//get refrences needed
		 	thumbCaption = jQuery(this).find('a').attr('title');
			
			//add rolloverscreen
			if(!jQuery(this).find('a').find('div').hasClass('thumb-rollover')) jQuery(this).find('a').append('<div class="thumb-rollover"></div>');
			
			
			//set it to the image size and fade in
			hoverScreen = jQuery('.thumb-rollover')
			hoverScreen.css({width:thumbW,height:thumbH});

			
			//make sure caption is filled out
			if (typeof thumbCaption !== 'undefined' && thumbCaption !== false && jQuery(this).find(hoverScreen).is(':empty')) {
				
				//construct rollover & animate
   				jQuery(this).find(hoverScreen).append('<div class="thumbInfo">'+thumbCaption+'</div>');
				target = jQuery(this).find(hoverScreen);
				target.stop().animate({opacity:1},hoverSpeed, hoverEase);
			}
			
		}, 
		
		  mouseleave: function () {
		
			if(isMobile == true) return false;
			
			//animate out
			jQuery(this).find(hoverScreen).animate({opacity:0},hoverSpeed,hoverEase,function(){
	
					//delete rollover
				   jQuery(this).remove();
				
			});
			
		
		 }
	
	  });
	
	
	//LIGHTBOX SPECIFIC ---------------------------------------------------------------------/

	/*lightbox-img
	-------------------------------*/
	
	jQuery('a.lightbox').fancybox({
										   
			'transitionIn'		: lightboxTransition,
			'transitionOut'		: lightboxTransition,
			'titlePosition' 	: 'over',
			'padding'			    : '0',																		
			'overlayOpacity'    : overlayOpacity,
			'overlayColor'      : overlayColor,
			'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {  
						
		
			var obj = currentArray[ currentIndex ] //get current image
			var target = jQuery(obj).parent();		   //get its container	
		
		
			//CASE 1: thumb has associated html content
			if(jQuery(target).next().hasClass('fancybox-html')){
					
					
				//check if stack order should be displayed
									
				if (jQuery(target).next().length && jQuery(obj).attr('rel')){
										
						return  '<span id="fancybox-title-over">' + '<div class="fancybox-num"> Image:'+(currentIndex + 1) + ' / ' + currentArray.length+'</div>'+(jQuery(target).next().html()) + '</span>';
										
				}else {
											
						return  '<span id="fancybox-title-over">' + (jQuery(target).next().html()) + '</span>';
										
				}
									
								
			//CASE 2:  thumb is a part of a group and has a title only
			} else if(jQuery(obj).attr('rel') && jQuery(obj).attr('title')){
		
					return  '<span id="fancybox-title-over">' + '<div class="fancybox-num"> Image:'+ (currentIndex + 1) + ' / ' + currentArray.length + '</div> '+ (title.length?''+title:'') + '</span>';
									
								
			//CASE 3: thumb has no info but belongs to group
			} else if(jQuery(obj).attr('rel')) {
								
					return  '<span id="fancybox-title-over">' + '<div class="fancybox-num" style="margin-bottom:0px"> Image:'+(currentIndex + 1) + ' / ' + currentArray.length+'</div>'+'</span>';
								
								
			//CASE 4: thumb has a title only
			} else if(jQuery(obj).attr('title')) {
								
				//if image is not associated with group, hide image numbering
				return  '<span id="fancybox-title-over">' +(title.length ?''+title :'') + '</span>';
									
								
				//CASE 5: no info & does not belong to group
				}else{
									
				// hide title overlay
				jQuery('#fancybox-title-over').hide();
									
				}
							
			},
						
						
			//animate image info on complete
			'onComplete':function(){
						
				//check for smallest breakpoints		
				if(jQuery(window).width()<=767){
	
			
					jQuery('.fancybox-title-over').css({display:'none'});
					
				}else{
				
					jQuery('.fancybox-title-over').hide().fadeIn('slow');
				
				}
						
			}
						
			});
	
	
	/*lightbox-media
	-------------------------------*/
	
	jQuery('a.media').fancybox({
								   
        'transitionIn'        : lightboxTransition,
        'transitionOut'       : lightboxTransition,
		'padding'			  : '0',	
		'titlePosition'		  : 'outside',
		'width'			      : videoWidth,
		'height'			  : videoHeight,
		'overlayOpacity'      : overlayOpacity,
		'overlayColor'        : overlayColor,
        'autoscale'           : false,
        'type'                : 'iframe',
		'swf'           	  : {
		'wmode'               : 'transparent',
		'allowfullscreen'  	: 'true'},
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {  
						
		
			var obj = currentArray[ currentIndex ] //get current image
			var target = jQuery(obj).parent();		   //get its container	
		
			if(jQuery(target).next().hasClass('fancybox-html')){
					
	
				return  '<span>' + (jQuery(target).next().html()) + '</span>';
						
			
			};
		},
		
		//animate image info on complete
		'onComplete':function(){
						
				//check for smallest breakpoints		
				if(jQuery(window).width()<=767){
			
					jQuery('.fancybox-title-outside').css({display:'none'});
					
				}else{
				
					jQuery('.fancybox-title-outside').hide().fadeIn('slow');
					
				}
						
			}

       }); 
	
	
	
});