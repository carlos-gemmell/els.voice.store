
from oauth2client.service_account import ServiceAccountCredentials
from google.cloud import storage
import os

def list_blobs_with_prefix(bucket_name, prefix, delimiter=None):
    """Lists all the blobs in the bucket that begin with the prefix.

    This can be used to list all blobs in a "folder", e.g. "public/".

    The delimiter argument can be used to restrict the results to only the
    "files" in the given "folder". Without the delimiter, the entire tree under
    the prefix is returned. For example, given these blobs:

        /a/1.txt
        /a/b/2.txt

    If you just specify prefix = '/a', you'll get back:

        /a/1.txt
        /a/b/2.txt

    However, if you specify prefix='/a' and delimiter='/', you'll get back:

        /a/1.txt

    """
    storage_client = storage.Client(project='els-voice-store-cloud-project')

    # Note: Client.list_blobs requires at least package version 1.17.0.
    blobs = storage_client.list_blobs(bucket_name, prefix=prefix,
                                      delimiter=delimiter)

    names = [blob.name for blob in blobs]
    
    return names

if __name__ == "__main__": 
    print(list_blobs_with_prefix("els_voice_store_audio", "admin", delimiter=None))