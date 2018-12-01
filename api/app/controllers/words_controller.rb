require "net/http"

class WordsController < ApplicationController
  def index
    url = "http://app.linkedin-reach.io/words"
    resp = Net::HTTP.get_response(URI.parse(url))
    words = resp.body.split("\n")
    render :json => (words)
  end
end
