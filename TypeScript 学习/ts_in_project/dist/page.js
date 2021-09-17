"use strict";
var Header = /** @class */ (function () {
    function Header() {
        var e = "\n            <div>Header</div>\n        ";
        document.body.insertAdjacentHTML('afterbegin', e);
    }
    return Header;
}());
var Content = /** @class */ (function () {
    function Content() {
        var e = "\n            <div>Content</div>\n        ";
        document.body.insertAdjacentHTML('afterbegin', e);
    }
    return Content;
}());
var Footer = /** @class */ (function () {
    function Footer() {
        var e = "\n            <div>Footer</div>\n        ";
        document.body.insertAdjacentHTML('afterbegin', e);
    }
    return Footer;
}());
var Page = /** @class */ (function () {
    function Page() {
        new Footer();
        new Content();
        new Header();
    }
    return Page;
}());
