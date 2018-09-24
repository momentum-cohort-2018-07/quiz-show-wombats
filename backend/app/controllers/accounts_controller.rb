class AccountsController < ApplicationController
  def register
    @user = User.new(account_params)
    if @user.save
      render :login, status: 201
    else    
      render status: 422, json: {
        errors: @user.errors.full_messages
      }      
    end
  end

  def login
    @user = User.find_by(email: account_params[:email])
    if @user and @user.authenticate(account_params[:password])
      render :login, status: 200
    else
      render status: 422, json: {
        errors: ['There is no user with that email and password.']
      }
    end
  end

  private

  def account_params
    params.permit(:email, :password)
  end
end
