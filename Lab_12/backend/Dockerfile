FROM python:3
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip3 install --upgrade pip
RUN python3 -m pip install -r requirements.txt
COPY . /code/
# expose 8000 port
EXPOSE 8000