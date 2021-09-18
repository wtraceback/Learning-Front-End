"use strict";
var Components;
(function (Components) {
    var Header = /** @class */ (function () {
        function Header() {
            var e = "\n                <div>Header</div>\n            ";
            document.body.insertAdjacentHTML('afterbegin', e);
        }
        return Header;
    }());
    Components.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var e = "\n                <div>Content</div>\n            ";
            document.body.insertAdjacentHTML('afterbegin', e);
        }
        return Content;
    }());
    Components.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var e = "\n                <div>Footer</div>\n            ";
            document.body.insertAdjacentHTML('afterbegin', e);
        }
        return Footer;
    }());
    Components.Footer = Footer;
})(Components || (Components = {}));
/// <reference path="./components.ts" />
var Home;
(function (Home) {
    var Page = /** @class */ (function () {
        function Page() {
            new Components.Footer();
            new Components.Content();
            new Components.Header();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
