## Manifest? Eh? What? Why?

[Many of us](https://github.com/w3c/manifest/graphs/contributors) who work on the web are actively working to narrow "the gap" between native applications and web applications.

But what is that gap? Just a few years ago, that gap was largely technological. If you wanted access to a device’s GPS, you had to write a native app. Nowadays, the situation is improving somewhat: we can now access devices' sensors like GPS, camera, and orientation sensors – though we still have a long way to go. Thanks to recent advances in the web platform we now have a platform that can compete with native applications on a more equal footing.

Nowadays, the primary gaps between native and web is not so much technological. It’s user experience. Users prefer to install apps, which live snugly on the homescreen (or possibly even the desktop, on desktop-class browsers).

Furthermore, native apps work offline by default, and integrate with the facilities provided by the underlying operating system: consider being able to see installed applications in the task switcher. Or being able to control an app’s privacy settings in the same place as apps installed from an app store. In browser land, we are still fumbling around trying to find opened tabs and having to type long and boring URLs to get anything done.

What we need is a method of "installing" web apps so they are indistinguishable from any other app installed on a user’s device. But at the same time, we don’t want to lose the powerful features that are central to the web platform: linkability, view source, and the ability to host our own stuff. 

This is generally what we, in the web community, refer to as a "[progressive web app](https://en.wikipedia.org/wiki/Progressive_web_app)".

## What is "installation"?

At its most basic, "installation" of a web app means "bookmarking" the web application to the homescreen or adding it to an application launcher. There are some pretty obvious things that you, as a developer, would need to provide to the browser so that it can treat your website as an app: the name, icons, etc. There are then more advanced features that you would need, like being able to indicate the preferred orientation and if you want your app to be fullscreen.

The Manifest specification aims to give you a standardised way to do this using JSON. In the HTML page to be "installed", simply link to a manifest file, thus:

```HTML
<link rel="manifest" href="/manifest.json">
```

But what’s in this mysterious manifest file? Glad you asked!

## A very simple manifest

A very simple manifest might just include a name and one or more icons.

```JSON
{
  "name": "Super Racer 3000",
  "icons": [{
    "src": "icon/lowres.png",
    "sizes": "64x64"
  }]
}
```

## A typical manifest

A typical manifest might look something like the following. The names of the members should be fairly self evident, but we describe their usage in detail below.

```JSON
{
  "lang": "en",
  "dir": "ltr",
  "name": "Super Racer 3000",
  "description": "The ultimate futuristic racing game from the future!",
  "short_name": "Racer3K",
  "icons": [{
    "src": "icon/lowres.webp",
    "sizes": "64x64",
    "type": "image/webp"
  },{
    "src": "icon/lowres.png",
    "sizes": "64x64"
  }, {
    "src": "icon/hd_hi",
    "sizes": "128x128"
  }],
  "scope": "/racer/",
  "start_url": "/racer/start.html",
  "display": "fullscreen",
  "orientation": "landscape",
  "theme_color": "aliceblue",
  "background_color": "red",
  "screenshots": [{
    "src": "screenshots/in-game-1x.jpg",
    "sizes": "640x480",
    "type": "image/jpeg"
  },{
    "src": "screenshots/in-game-2x.jpg",
    "sizes": "1280x920",
    "type": "image/jpeg"
  }]
}
```

## Application name

The application needs a real name or set of names (which is usually not the same as the title element of a document). For this you use the `name` and the `short_name` members.

```JSON
{
  "name": "My totally awesome photo app",
  "short_name": "Photos"
}
```

The `short_name` serves as the name for the application when displayed in contexts with constrained space (e.g., under an icon on the homescreen of a phone). 
The `name` can then be a bit longer, fully capturing the name of the application. 
This also provides an alternative way for users to search your app on their phone. 
So, typing ‘awesome’ or ‘photo’ would find the application on a user’s device.

If you omit the name, the browser can fall back to using `<meta name="application-name">`, and failing that, the `<title>` element.

Be careful though: some browsers can be quite strict about wanting you to include a `name` - and if omit them, it can invalidate your app from being a "progressive web app".

## Icons

There needs to be an icon associated with a web app, rather than the browser’s icon. To handle this, the manifest has an icons property. This takes a list of icons and their sizes, and format. Having these optional properties makes icon selection really powerful, because it provides a responsive image solution for icons – which can help avoid unnecessary downloads and helps to make sure your icons always look great across a range of devices and screen densities.

```JS
{
  "icons": [{
    "src": "icon/lowres",
    "sizes": "64x64",
    "type": "image/webp"
  }, {
    "src": "icon/hd_small",
    "sizes": "64x64"
  }, {
    "src": "icon/hd_hi",
    "sizes": "128x128",
  }]
}
```
If you omit the icons, the browser just falls back to looking for `<link rel="icon">`, the favicon.ico or, failing that, may even use a screenshot of your website.

### Icon purpose

TBW.

More information about purpose can be found in the [Web App Manifest spec](https://www.w3.org/TR/appmanifest/#purpose-member).

## Display modes and orientation
Apps need to be able to control how they are to be displayed when they start-up. If it’s a game, it might need to be in full-screen and possibly in landscape mode. In order to do this, the manifest format provides you with two properties.

```JSON
{
 "display": "fullscreen",
 "orientation": "landscape"
}
```

For the display modes, the options that you have are:

  * `fullscreen`: take over the whole screen.
  * `standalone`: opens the app with a status bar.
  * `minimal-ui`: like on iOS, the app is fullscreen, but certain actions can cause the navigation bar and back/forward buttons to reappear.
  * `browser`: opens your app with normal browser toolbars and buttons.

The nice thing with orientation is that it serves as the "default orientation" for the scope of the application. So, as you navigate from one page to another, your app stays in the correct orientation. You can override the default orientation using the [Screen Orientation API](https://w3c.github.io/screen-orientation/).

You can also style apps that are in a particular display mode by using the `display-mode` media feature:

```CSS
@media all and (display-mode: standalone){
  ...
}
```

And use JavaScript `window.matchMedia()` to test that media query in JavaScript.

```JS
if (window.matchMedia("(display-mode: standalone)").matches) {
  // do interesting UI adjustments
}
```

## Start URL

Sometimes you want to make sure that when the user starts up an app, they always go to a particular page first. The `start_url` property gives you a way of indicating this.

```JSON
{
 "start_url": "/start_screen.html"
}
```

## "Scope" of the app
Native applications have clear "boundaries": as a user, you know when you open a native application that it won’t suddenly open a different application without you noticing. When switching from one native application to another is often pretty clear that you’ve switched applications. These visual cues are often provided by the underlying operating system (think of bringing up the task manager and picking a different application – or pressing "command/alt-tab" on your desktop machine).

The web is very different: it’s a huge hypertextual system where web applications can span multiple domains: you can seamlessly jump from "gmail.com" to "docs.google.com" and as a user have no idea that you’ve jumped form one "origin" to another. In fact, the whole idea that there are boundaries to an application is totally foreign on the Web as, in reality, a web application is just a series of HTML documents (think, "a series of tubes"… no, don’t think that!).

On the web, the only reason we know that we’ve left the scope of one application and entered into another application is because the web designers have been kind enough to make their websites look uniquely different. In case where they haven’t, a lot of users have also been tricked by sites masquerading as another site (the ol’ "phishing attack").

The manifest format assist with this problem by allowing you to specify a "URL scope" for your application. This scope sets a boundary for an app. It can either be a domain or a directory within that domain.

```JSON
{
  "scope": "/myapp"
}
```

## Internationalization: lang and dir
TBW...

## Distributing your app
TBW: using description and screenshots.

## Theme color and background color
TBW...

## Adding shortcuts
Numerous operating systems grant native applications the ability to add menu items to the app icon itself. These often provide quick access to key tasks for an app. Typically, these are exposed via a right click, long tap, or a similar context menu-triggering action. For web applications, you can define a set of shortcuts to be exposed when the app is installed. Each shortcut item must have a name and a target URL. You may also include additional information, such as a shorter name, a description for the action, and one or more icons.

```JSON
"shortcuts": [
  {
    "name": "Play Later",
    "description": "View the list of podcasts you saved for later",
    "url": "/play-later",
    "icons": [
      {
        "src": "/icons/play-later.svg",
        "type": "image/svg+xml",
        "purpose": "any"
      }
    ]
  },
  {
    "name": "Subscriptions",
    "description": "View the list of podcasts you listen to",
    "url": "/subscriptions",
    "icons": [
      {
        "src": "/icons/subscriptions.svg",
        "type": "image/svg+xml",
        "purpose": "any"
      }
    ]
  },
  {
    "name": "Search",
    "description": "Search for new podcasts to listen to",
    "url": "/search",
    "icons": [
      {
        "src": "/icons/search.svg",
        "type": "image/svg+xml",
        "purpose": "any"
      }
    ]
  },
  {
    "name": "Discover",
    "description": "Browse for new podcasts to listen to",
    "url": "/discover",
    "icons": [
      {
        "src": "/icons/discover.svg",
        "type": "image/svg+xml",
        "purpose": "any"
      }
    ]
  }  
]
```

## How can I detect if the user "installed" my app?
The spec provides a way for you to detect when the user installs your apps by registering for "appinstalled" events.

```JS
function handleInstalled(ev) {
  const date = new Date(ev.timeStamp / 1000);
  console.log(`Yay! Our app got installed at ${date.toTimeString()}`);
}

// Using the event handler IDL attribute
window.onappinstalled = handleInstalled;

// Using .addEventListener()
window.addEventListener("appinstalled", handleInstalled);
```

However, for privacy reasons, you can't directly detect if your application is installed - only if the manifest is being used with your web application.

## What’s wrong with `<meta>` tags?
During the specification discussions, it was hotly debated whether to use `<meta>` tags in HTML rather than make a new format. After all, the Chrome implementation of Add to Home screen uses `<meta>` tags, and this has been the natural home for proprietary flimflam since the web began.

The reasons for including a separate file are

 * it saves loading every page of an installable app/site with tons of header info
 * once downloaded, the file sits in the browsers’s HTTP cache.

More details about [why we chose JSON instead of the html tags](https://www.w3.org/TR/appmanifest/#relationship-to-html-s-link-and-meta-elements) can be found in the spec.

## Who is implementing this

The manifest, and Progressive Web Apps are implemented in Chrome, Opera, and Samsung Internet for Android. There are positive signals from Firefox that they will support this standard too (it has been implemented in Gecko for over 2 years, but not shipping in any products yet).

## Interaction with Web Crawlers

Like other web resources, a web app manifest should be accessible to any web browser or web crawler.

If a web app developer wants to inform web crawlers of a desire for the file not to be crawled, the developer MAY do so by including the web app manifest in a robots.txt file.
This is further described in the [robots.txt](http://www.robotstxt.org/) protocol.
A web app developer could also use the `X-Robots-Tag` HTTP header.

## Attribution
The bulk of this explainer originally appeared in [HTML5 Doctor](http://html5doctor.com/) as "[The W3C App Manifest specification](http://html5doctor.com/web-manifest-specification/)", and was written by [Marcos Cáceres](https://github.com/marcoscaceres) and [Bruce Lawson](https://www.brucelawson.co.uk/). This derivative work is allowed by the [Creative Commons Attribution-Non-Commercial 2.0](https://creativecommons.org/licenses/by-nc/2.0/uk/) license of the original document. Thus, feel free to change, reuse, modify, and extend this explainer. Some authors will retain their copyright on certain articles.
