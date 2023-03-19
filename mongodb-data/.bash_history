mongosh -u root -p example
echo $MONGO_DB_NAME
mongosh --eval "db = db.getSiblingDB('admin'); db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');db = db.getSiblingDB('$MONGO_DB_NAME');db.createUser({
        user: '$MONGO_USER',
        pwd: '$MONGO_PASSWORD',
        roles: [{
            role: 'readWrite',
            db: '$MONGO_DB_NAME'
        }]
    });"
mongosh -u root -p example
mongosh --eval "db = db.getSiblingDB('admin'); db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');db = db.getSiblingDB('$MONGO_DB_NAME');db.createUser({
        user: '$MONGO_USER',
        pwd: '$MONGO_PASSWORD',
        roles: [{
            role: 'readWrite',
            db: '$MONGO_DB_NAME'
        }]
    });"
mongosh -u root -p example
exit
