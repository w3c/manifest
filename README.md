This repository is the home of the **Manifest** specification being worked on by 
the [Web Applications Working Group](http://www.w3.org/2008/webapps/).

## Useful links
* [The Manifest specification](http://w3c.github.io/manifest/)
* [Use cases and requirements](http://w3c-webmob.github.io/installable-webapps/) 
* [The WebApps WG homepage](http://www.w3.org/2008/webapps/)
* [The WebApps WG mailing-list](http://lists.w3.org/Archives/Public/public-webapps/)

## Goals for v1

For the first version, we aim to standardize the following: 

* A link relationship for manifests (`<link rel="manifest" href="...">`).
* The well-known URI for a manifest resource (`/.well-known/manifest.json` if no link relationship).
* Application's name and icons and how they interact with HTML equivalents.
* Display mode hinting (browser, minimal-ui, standalone, fullscreen).
* Screen orientation hinting.
* Start URL.

## Goals for v2 and beyond
* A way of for scripts to check if the application was launched from a bookmark (i.e., similar to Safari's navigator.standalone). 
* Media query based orientation and display mode.
* [CSS media features for display modes](https://github.com/w3c/manifest/issues/155) - `@media all and (display-mode: browser)`.
* [Define how navigation works](https://github.com/w3c/manifest/issues/142).
* [URL scope for a web application](https://github.com/w3c/manifest/issues/114) (i.e., "foo.com/bar/*" is my app, other stuff opens in default browser).
* [Service Worker integration](https://github.com/w3c/manifest/issues/161).
* [CSP policy tightening](http://w3c.github.io/manifest-csp/).
* Updatable manifests - update the installed application to enable new capabilities after install.
* [Clarify how this works with HTTP's Link header](https://github.com/w3c/manifest/issues/98).
* [Inline manifests](https://github.com/w3c/manifest/issues/91) (or HTML meta equivs?).
* [Splash screens](https://github.com/w3c/manifest/issues/9) (or prerendered pages that serve as one?).
* Make installable apps sharable.
