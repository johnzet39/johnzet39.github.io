
$(document).ready(function () {

    //NAVIGATION
    //##################################################

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('#navigation').addClass('navigation-bg');
        } else {
            $('#navigation').removeClass('navigation-bg');
        }
    });

    //MAIN ARROW DOWN
    //##################################################

		var arrowLive = function () {
			var arrow = $(".smooth-scroll");
			if (arrow.hasClass("lift")) {
				arrow.removeClass("lift");
			} else {
				arrow.addClass("lift");
			}
		};
        setInterval(arrowLive, 800);

    //SMOOTH SCROLL
    //##################################################

		$('#arrow_link').on('click', function (e) {
            var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });

    //SCROLL WITH ACTIVE MENU
    //##################################################
    // Cache selectors
    var lastId;
    var topMenu = $(".navbar");
    var topMenuHeight = topMenu.outerHeight() - 27;
        // All list items
    var menuItems = topMenu.find("a");
        // Anchors corresponding to menu items
    var scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
        e.preventDefault();
        var href = $(this).attr("href");
        var offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight;
        $('html, body').stop().animate({ 
            scrollTop: offsetTop
        }, 300); 
    });

    // Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop + window.innerHeight/2 )
                return this;
        });
        
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
            }              
        });


    //MODAL WINDOWS
    //##################################################

    // Open window
    const openEls = document.querySelectorAll('[data-modaltarget]');
    const isVisible = "is-visible";
    
    for(const el of openEls) {
        el.addEventListener("click", function() {
            clearModal();
            const modalId = this.dataset.modaltarget;
            document.getElementById(modalId).classList.add(isVisible);
            $('body').addClass('no-scroll');
            // $('.modaal-content').html($('#'+$(this).attr('data-project')).html());
            if ($(this).attr('data-content').length > 0 && $(this).attr('data-content') != null)
            {
                $('.modaal-content').load($(this).attr('data-content'));
            }
            $('.modaal-header__title').text($(this).attr('data-title'));
        });
    }

    function clearModal(){
        $('.modaal-content').html('');
        $('.modaal-header__title').text('');
    }

    // Close window
    const closeEls = document.querySelectorAll("[data-close]");
    
    for (const el of closeEls) {
    el.addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
        $('body').removeClass('no-scroll');
    });
    }

    //Secondly by clicking on everything outside of the modal
 
    document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modaal.is-visible")) {
        document.querySelector(".modaal.is-visible").classList.remove(isVisible);
        $('body').removeClass('no-scroll');
    }
    });

    //By pressing the Esc key
 
    document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector(".modaal.is-visible")) {
        document.querySelector(".modaal.is-visible").classList.remove(isVisible);
        $('body').removeClass('no-scroll');
    }
    });

});