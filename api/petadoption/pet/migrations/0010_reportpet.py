# Generated by Django 4.2.11 on 2024-04-22 18:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pet', '0009_rename_location_adoptionrequest_address_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReportPet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('report_message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('pet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reports', to='pet.pet')),
                ('reporter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reported_reports', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
