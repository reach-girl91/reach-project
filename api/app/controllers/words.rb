require "net/http"


def index
  url = "http://app.linkedin-reach.io/words"
  resp = Net::HTTP.get_response(URI.parse(url))
  words = resp.body.split("\n")
end
