# Generated by Django 3.2.15 on 2023-03-06 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ca298shop', '0002_item_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='type',
            field=models.CharField(choices=[('Tops', 'Tops'), ('Bottoms', 'Bottoms'), ('Shoes', 'Shoes'), ('Coats', 'Coats')], default='Tops', max_length=50),
        ),
    ]
