# populate the database using
# python manage.py seed

from django.core.management.base import BaseCommand
from university.models import *
import pandas as pd
import random
import names

# python manage.py seed --mode=refresh

""" Clear all data and creates addresses """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'

from collections import defaultdict
from django.apps import apps


class BulkCreateManager(object):
    """
    This helper class keeps track of ORM objects to be created for multiple
    model classes, and automatically creates those objects with `bulk_create`
    when the number of objects accumulated for a given model class exceeds
    `chunk_size`.
    Upon completion of the loop that's `add()`ing objects, the developer must
    call `done()` to ensure the final set of objects is created for all models.
    """

    def __init__(self, chunk_size=100):
        self._create_queues = defaultdict(list)
        self.chunk_size = chunk_size

    def _commit(self, model_class):
        model_key = model_class._meta.label
        model_class.objects.bulk_create(self._create_queues[model_key])
        self._create_queues[model_key] = []

    def add(self, obj):
        """
        Add an object to the queue to be created, and call bulk_create if we
        have enough objs.
        """
        model_class = type(obj)
        model_key = model_class._meta.label
        self._create_queues[model_key].append(obj)
        if len(self._create_queues[model_key]) >= self.chunk_size:
            self._commit(model_class)

    def done(self):
        """
        Always call this upon completion to make sure the final partial chunk
        is saved.
        """
        for model_name, objs in self._create_queues.items():
            if len(objs) > 0:
                self._commit(apps.get_model(model_name))


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    """Deletes all the table data"""
    print("Clearing all data")
    Grade.objects.all().delete()
    Degree.objects.all().delete()
    Cohort.objects.all().delete()
    Module.objects.all().delete()
    Student.objects.all().delete()


def create_students(n, co):
    students = []
    for i in range(0, n):
        fname = names.get_first_name()
        lname = names.get_last_name()
        students.append(Student.objects.create(first_name=fname, last_name=lname, cohort=co))
    return students

def create_data():
    structure_file = pd.read_csv("modules.csv")
    groups = structure_file.groupby(['Course', 'CTitle'])
    for name, group in groups:
        deg = Degree.objects.create(full_name=name[1], shortcode=name[0])
        print("Created degree {}".format(deg))
        modgroup = group.groupby(["Year"])
        for year, mods in modgroup:
            cohort = Cohort.objects.create(id="{}{}".format(deg.shortcode, year), year=year, degree=deg)
            print("Created cohort {}".format(cohort))
            students = create_students(random.randint(10, 50), cohort)
            print("Created {} students".format(len(students)))
            for index, row in mods.iterrows():
            # create modules
                code = row['Code']
                title = row['Title']
                exam = row['Exam']
                ca = row['CA']
                mx = Module.objects.filter(code=code)
                if mx.exists():
                    m = mx.first()
                    m.delivered_to.add(cohort)
                else:
                    m = Module.objects.create(code=code, full_name=title, ca_split=ca)
                    m.delivered_to.add(cohort)
                m.save()
                print("Upserted module {}".format(m))
                for s in students:
                    if m.ca_split==100:
                        ca_grade= random.randint(0,100)
                        Grade.objects.create(student=s, module=m, ca_mark=ca_grade, cohort=cohort)
                    elif m.ca_split==0:
                        exam_grade = random.randint(0,100)
                        Grade.objects.create(student=s, module=m, exam_mark=exam_grade, cohort=cohort)
                    else:
                        ca_grade = random.randint(0,100)
                        exam_grade = random.randint(0,100)
                        Grade.objects.create(student=s, module=m, exam_mark=exam_grade, ca_mark=ca_grade, cohort=cohort)
                print("Addded grades for students to {}".format(m))
    print("done")





def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear
    :return:
    """
    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    # Creating 15 addresses
    create_data()


