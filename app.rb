require 'sinatra/base'
require 'tilt/erb'

module Interactor
  class Application < Sinatra::Base
    get '/' do
      erb :index
    end

    get '/redo' do
      erb :redo
    end
  end
end
