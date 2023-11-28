class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json:@users
  end

  def create
    @user = User.new(users_params)
    if @user.save
      render json:@user, status: :created
    else
      render json:@user.errors, status: :unprocessable_entity
    end
  end

  private

    def users_params
      params.require(:user).permit(:name,:password)
    end
end
