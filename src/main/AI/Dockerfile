FROM python:3.9

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install flask-cors
# Copy the application code
COPY ./DeeplearningServer /app

CMD ["python", "app.py"]