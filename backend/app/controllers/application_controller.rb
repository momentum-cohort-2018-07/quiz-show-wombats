class ApplicationController < ActionController::API
  helper_method :current_user

  def authenticate_user
    unless current_user
      head :forbidden
    end
  end

  def current_user
    return unless http_auth_token
    @current_user ||= User.find_by(auth_token: http_auth_token)
    @current_user
  end

  def http_auth_token
    if request.headers['Authorization'].present?
      return request.headers['Authorization'].split(' ').last
    end
    nil
  end
end
