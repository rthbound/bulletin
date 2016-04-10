require 'sinatra/base'
require 'tilt/erb'

module Interactor
  class Application < Sinatra::Base
    get '/' do
      erb :index
    end
  end
end
