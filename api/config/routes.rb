Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

##create routes here to display all the words
## the create an index presenter to index all the words

## in the controller of the words, create a index method
get '/words', to: 'words#index'

end
