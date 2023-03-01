from django.db import models

## Editable Ingredient classes ##
class Size(models.Model):
    id = models.AutoField(primary_key=True)
    size = models.CharField(max_length=50)
    def __str__(self):
        return f'{self.size}' # return title in admin for clarity #

class Crust(models.Model):
    id = models.AutoField(primary_key=True)
    crust = models.CharField(max_length=50)
    def __str__(self):
        return f'{self.crust}'

class Sauce(models.Model):
    id = models.AutoField(primary_key=True)
    sauce = models.CharField(max_length=50)
    def __str__(self):
        return f'{self.sauce}'

class Cheese(models.Model):
    id = models.AutoField(primary_key=True)
    cheese = models.CharField(max_length=50)
    def __str__(self):
        return f'{self.cheese}' 

## Main Pizza class ##
class Pizza(models.Model):
    id = models.AutoField(primary_key=True)

    # optional ingredients #
    pepperoni = models.BooleanField(default=False)
    chicken = models.BooleanField(default=False)
    ham = models.BooleanField(default=False)
    pineapple = models.BooleanField(default=False)
    peppers = models.BooleanField(default=False)
    mushrooms = models.BooleanField(default=False)
    onions = models.BooleanField(default=False)

    # callback ingredients using foreignkeys #
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    crust = models.ForeignKey(Crust, on_delete=models.CASCADE)
    sauce = models.ForeignKey(Sauce, on_delete=models.CASCADE)
    cheese = models.ForeignKey(Cheese, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.size} , {self.crust} : {self.sauce}, {self.cheese}'


## Customer Class ##
class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=102)
    town = models.CharField(max_length=1024)
    postcode = models.CharField(max_length=1024)
    card_no = models.IntegerField()
    cvv = models.IntegerField()
    card_expiry_month = models.PositiveIntegerField()
    card_expiry_year = models.PositiveIntegerField()

    def __str__(self):
        return self.name