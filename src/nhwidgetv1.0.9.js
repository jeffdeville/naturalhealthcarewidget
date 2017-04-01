function defer(method) {
    if (window.jQuery)
        method();
    else
        setTimeout(function() { defer(method) }, 50);
}
defer(function(){
    var outline = `<style>
        .nh-container { width: 100%; }
        .nh-header { width: 100%; }
        .nh-row {
            width: 100%;
            margin-bottom: 5px;
            display: table;
            border-bottom: solid thin #ebeaea;
        }
        .nh-row:after {
            visibility: hidden;
            display: block;
            font-size: 0;
            content: " ";
            clear: both;
            height: 0;
        }
        .nh-img-cell {
            padding-right: 10px;
            width: 100px;
            display: table-cell;
        }
        @media (max-width: 480px) {
            .nh-row {
                display: block;
            }
            .nh-img-cell {
                display: block;
                width: 100%;
                max-width: 100%;
            }
            .nh-content-cell {
                display: block;
                width: 100%;
            }
        }
        .nh-img {
            width: 100%;
            height: auto;
        }
        .nh-content-cell {
            display: table-cell;
            width: auto;
        }
        .nh-footer { margin-top: 30px; text-align: center; }
        .nh-powered-by { font-size: x-small; padding-top: 10px;}
        .nh-logo-img { max-width: 200px; margin-bottom: 15px;}
    </style>

    <!-- WIDGET_CONTENT -->
    <div class="nh-container">
        <div class="nh-header">
            <h2>Find a Naturopathic Dr.</h2>
            <p>Sorry, Dr. Lauren is not local, but here are some nearby Naturopathic Doctors</p>
        </div>
        <div id="nh-body">
        </div>
        <div class="nh-footer">
            <a class="nh-logo" href="http://www.natural.healthcare" title="Find a Natural Doctor">
                <div class="nh-catchphrase">Find a Natural Doctor</div>
                <div class="nh-powered-by">Powered By:</div>
                <img class="nh-logo-img" src="http://www.natural.healthcare/images/natural-healthcare-logo.png" title="Find a Natural Doctor" />
            </a>
        </div>
    </div>`

    var template = `<div class="nh-row">
            <div class="nh-img-cell">
                <a href="" title="" target="_blank">
                    <img class="nh-img" src="" title="" />
                </a>
            </div>
            <div class="nh-content-cell">
                <a href="" title="" target="_blank">
                    <p class="nh-name"></p>
                </a>
                <p class="nh-location"></p>
                <p class="nh-distance"></p>
                <a href="" title="" target="_blank">
                    More Info
                </a>
            </div>

    </div>`
    jQuery("#nh-widget").append(jQuery(outline));

    // var baseUrl = 'https://www.natural.healthcare';
    var baseUrl = 'http://www.lvh.me:4000';
    jQuery.ajax({
        url: "http://api.lvh.me:4000/v1/listings/search",
        // url: "https://api.natural.healthcare/v1/listings/search",
        success: function(results) {
            jQuery(results).each(function() {
                var templateRow = jQuery(template).clone();
                templateRow.find('img').attr('src', "http://d1sjsgooadp5yf.cloudfront.net/kevin-passero.jpg");
                templateRow.find('a').attr('href', baseUrl + this.path);
                templateRow.find('a').attr('title', this.name);
                templateRow.find('.nh-name').text(this.name);
                templateRow.find('.nh-distance').text("~30mi");
                templateRow.find('.nh-location').text(this.city + ", " + this.state);
                templateRow.appendTo(jQuery('#nh-body'));
            });
        }
    });
});
