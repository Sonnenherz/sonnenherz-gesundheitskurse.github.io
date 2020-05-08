# from https://stackoverflow.com/questions/15976495/how-to-url-encode-in-jekyll-liquid
# _plugins/url_encode.rb
# kann benutzt werden: <a href="{{ site.category_dir }}/{{ category | url_encode }}">
require 'liquid'
require 'uri'

# Percent encoding for URI conforming to RFC 3986.
# Ref: http://tools.ietf.org/html/rfc3986#page-12
module URLEncoding
  def url_encode(url)
    return URI.escape(url, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
  end
end

Liquid::Template.register_filter(URLEncoding)