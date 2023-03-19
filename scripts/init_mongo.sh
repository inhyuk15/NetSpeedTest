# #!/bin/bash

echo $MONGO_DB_NAME
# Wait for MongoDB to start
until mongosh --eval "print(\"waited for connection\")"
do
    sleep 1
done

# # Create MongoDB user and database
mongosh --eval "
    db = db.getSiblingDB('admin');
    db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
    db = db.getSiblingDB('$MONGO_DB_NAME');
    db.createUser({
        user: '$MONGO_USER',
        pwd: '$MONGO_PASSWORD',
        roles: [{
            role: 'readWrite',
            db: '$MONGO_DB_NAME'
        }]
    });
"
    