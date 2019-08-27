
from oauth2client.service_account import ServiceAccountCredentials
from google.cloud import storage
import os

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    storage_client = storage.Client(project='els-voice-store-cloud-project')
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print('File {} uploaded to {}.'.format(
        source_file_name,
        destination_blob_name))


if __name__ == "__main__": 
    upload_blob("els_voice_store_audio", "./server.py", "server.py")
