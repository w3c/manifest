# Web App Manifest Primer

This document provides non-normative guidance for developers of web app manifest files.

## Additional Examples

TODO: Add additional examples

## Interaction with Web Cralwers

Like other web resources, a web app manifest should be accessible to any web browser or web crawler.

If a web app developer wants to inform web crawlers of a desire for the file not to be crawled, the developer MAY do so by including the web app manifest in a robots.txt file.
This is further described in the [robots.txt](http://www.robotstxt.org/) protocol.
A web app developer could also use the `X-Robots-Tag` HTTP header.
