# Generated by Django 4.2.11 on 2024-04-19 12:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pet', '0007_alter_adoptionrequest_status_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pet',
            old_name='landlord',
            new_name='useraccount',
        ),
    ]
