require 'sinatra/base'

module Interactor
  class Application < Sinatra::Base
    get '/' do
      'hi'
    end
  end
end
