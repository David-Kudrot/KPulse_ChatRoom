from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm


def chatPage(request, *args, **kwargs):
	if not request.user.is_authenticated:
		return redirect("login-user")
	context = {}
	return render(request, "chat.html", context)




def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('chat-page')  # Redirect to a success page
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})



@login_required  
def userLogout(request):
    logout(request)
    return redirect('login-user')