from rest_framework import serializers
from .models import Job, Application


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['posted_by', 'created_at']


class ApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.CharField(
        source='applicant.username',
        read_only=True
    )

    applicant_email = serializers.CharField(
        source='applicant.email',
        read_only=True
    )

    job_title = serializers.CharField(
        source='job.title',
        read_only=True
    )

    job_company = serializers.CharField(
        source='job.company',
        read_only=True
    )

    class Meta:
        model = Application
        fields = [
            'id',
            'applicant',
            'applicant_name',
            'applicant_email',
            'job',
            'job_title',
            'job_company',
            'status',
            'applied_at',
        ]
        read_only_fields = [
            'id',
            'applicant',
            'applicant_name',
            'applicant_email',
            'job_title',
            'job_company',
            'status',
            'applied_at',
        ]
        
class ApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']