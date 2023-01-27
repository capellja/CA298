# Generated by Django 4.1.5 on 2023-01-26 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('author', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('title', models.CharField(max_length=100)),
                ('snyopsis', models.TextField()),
            ],
        ),
    ]