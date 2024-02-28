from django.urls import path, include
from chat import views
from django.contrib.auth.views import LoginView


urlpatterns = [
	path("", views.chatPage, name="chat-page"),
	# login-section
	path("login/", LoginView.as_view(template_name="login.html"), name="login-user"),
	path("logout/", views.userLogout, name="logout-user"),
	path('register/', views.register, name="register"),
]
