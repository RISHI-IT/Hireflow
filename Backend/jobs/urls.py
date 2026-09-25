from django.urls import path

from .views import (
    JobListCreateView,
    JobDetailView,
    MyJobsView,
    ApplicationCreateView,
    MyApplicationsView,
    RecruiterApplicationsView,
    ApplicationStatusUpdateView,
)


urlpatterns = [
    # Jobs
    path("jobs/", JobListCreateView.as_view()),
    path("jobs/<int:pk>/", JobDetailView.as_view()),
    path("my-jobs/", MyJobsView.as_view()),

    # Applications
    path("applications/", ApplicationCreateView.as_view()),
    path("my-applications/", MyApplicationsView.as_view()),
    path(
        "recruiter-applications/",
        RecruiterApplicationsView.as_view()
    ),
    path(
        "applications/<int:pk>/status/",
        ApplicationStatusUpdateView.as_view()
    ),
]