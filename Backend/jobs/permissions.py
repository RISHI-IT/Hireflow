from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        # GET / HEAD / OPTIONS → allowed
        if request.method in SAFE_METHODS:
            return True

        # PUT / PATCH / DELETE → only owner
        return obj.posted_by == request.user