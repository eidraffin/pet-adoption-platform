# Generated by Django 4.2.11 on 2024-04-18 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pet', '0003_alter_pet_adoption_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='adoption_status',
            field=models.CharField(choices=[('Available', 'Available'), ('Not available', 'Not available')], default='Available', max_length=25),
        ),
    ]