"use strict";

function defer(method) {
    if (window.jQuery) method();else setTimeout(function () {
        defer(method);
    }, 50);
}
defer(function () {
    var outline = "<style>\n        .nh-container { width: 100%; }\n        .nh-header { width: 100%; }\n        .nh-row {\n            margin-bottom: 5px;\n            display: table;\n        }\n        .nh-row:after {\n            visibility: hidden;\n            display: block;\n            font-size: 0;\n            content: \" \";\n            clear: both;\n            height: 0;\n        }\n        .nh-img-cell {\n            padding-right: 10px;\n            max-width: 100px;\n            display: table-cell;\n        }\n        @media (max-width: 480px) {\n            .nh-row {\n                display: block;\n            }\n            .nh-img-cell {\n                display: block;\n                width: 100%;\n                max-width: 100%;\n            }\n            .nh-content-cell {\n                display: block;\n                width: 100%:;\n            }\n        }\n        .nh-img {\n            width: 100%;\n            height: auto;\n        }\n        .nh-content-cell {\n            display: table-cell;\n            width: auto;\n        }\n        .nh-footer { margin-top: 30px; text-align: center; }\n        .nh-powered-by { font-size: x-small; padding-top: 10px;}\n        .nh-logo-img { max-width: 200px; }\n    </style>\n\n    <!-- WIDGET_CONTENT -->\n    <div class=\"nh-container\">\n        <div class=\"nh-header\">\n            <h2>Find a Naturopathic Dr.</h2>\n            <p>Sorry, Dr. Lauren is not local, but here are some nearby Naturopathic Doctors</p>\n        </div>\n        <div id=\"nh-body\">\n        </div>\n        <div class=\"nh-footer\">\n            <a class=\"nh-logo\" href=\"http://www.natural.healthcare\" title=\"Find a Natural Doctor\">\n                <div class=\"nh-catchphrase\">Find a Natural Doctor</div>\n                <div class=\"nh-powered-by\">Powered By:</div>\n                <img class=\"nh-logo-img\" src=\"http://www.natural.healthcare/images/logo-light.png\" title=\"Find a Natural Doctor\" />\n            </a>\n        </div>\n    </div>";

    var template = "<div class=\"nh-row\">\n            <div class=\"nh-img-cell\">\n                <a href=\"\" title=\"\" target=\"_blank\">\n                    <img class=\"nh-img\" src=\"\" title=\"\" />\n                </a>\n            </div>\n            <div class=\"nh-content-cell\">\n                <a href=\"\" title=\"\" target=\"_blank\">\n                    <p class=\"nh-name\"></p>\n                </a>\n                <p class=\"nh-distance\"></p>\n            </div>\n    </div>";
    jQuery("#nh-widget").append(jQuery(outline));

    var baseUrl = 'https://www.natural.healthcare';
    jQuery.ajax({
        url: "https://api.natural.healthcare/v1/listings/search",
        success: function success(results) {
            jQuery(results).each(function () {
                var templateRow = jQuery(template).clone();
                templateRow.find('img').attr('src', this.featured_image);
                templateRow.find('a').attr('href', baseUrl + this.path);
                templateRow.find('a').attr('title', this.name);
                templateRow.find('.nh-name').text(this.name);
                templateRow.find('.nh-distance').text("Within ~30mi");
                templateRow.appendTo(jQuery('#nh-body'));
            });
        }
    });
});