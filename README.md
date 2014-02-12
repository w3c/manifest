This repository is the home of the **Manifest** specification being worked on by 
the [Web Applications Working Group](http://www.w3.org/2008/webapps/).

## Useful links
* [The Manifest specification](http://w3c.github.io/manifest/)
* [Use cases and requirements](http://w3c-webmob.github.io/installable-webapps/) 
* [The WebApps WG homepage](http://www.w3.org/2008/webapps/)
* [The WebApps WG mailing-list](http://lists.w3.org/Archives/Public/public-webapps/)

## Goals for v1

For the first version, we aim to standardize the following: 

*A link relationship for manifests (so they can be used with `<link>`).
* A standard file name for a manifest resource (i.e., manifest.json).  
* Start URL.
* Screen orientation hinting for when launching the app.
* Different display modes: fullscreen, minimal-ui, open in browser, etc.


## Goals for v2 and beyond
* Application's name and icons - and how they interact with HTML equivs.
* Media query based orientation and display mode.
* CSS media features for display modes - `@media all and (display-mode: browser)`.
* [Define how navigation works](https://github.com/w3c/manifest/issues/142).
* URL scope for a web application (i.e., "foo.com/bar/*" is my app, other stuff opens in default browser).
* Service Worker intergration
* CSP policy tightening
* Updatable manifests - update the installed application to enable new capabilities after install.
* [Clarify how this works with HTTP's Link header](https://github.com/w3c/manifest/issues/98).
* [Inline manifests](https://github.com/w3c/manifest/issues/91) (or HTML meta equivs?).
* [Splash screens](https://github.com/w3c/manifest/issues/9) (or prerendered pages that serve as one?).