# Web App Manifest Primer

This document provides non-normative guidance for developers of web app manifest files.

## Additional Examples

TODO: Add additional examples

## Interaction with Web Crawlers

Like other web resources, a web app manifest should be accessible to any web browser or web crawler.

If a web app developer wants to inform web crawlers of a desire for the file not to be crawled, the developer MAY do so by including the web app manifest in a robots.txt file.
This is further described in the <a href="http://www.robotstxt.org/">robots.txt</a> protocol.
A web app developer could also use the <code>X-Robots-Tag</code> HTTP header.
