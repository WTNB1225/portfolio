class Api::V1::LoginController < ApplicationController
  def create
    user = User.find(params[:name])
    if user && user.authenticate(params[:password])
      render status: :created
    else
      render status: :forbidden
    end
  end
end
