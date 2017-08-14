# Run the container
docker run --name ami_bash -i -t -d monkeyd/ami_with_node bash

# Create folder in container home
docker exec -it ami_bash mkdir /home/add-hero

# Copy package json
docker cp package.json ami_bash:/home/add-hero/

# Run npm install
docker exec -it ami_bash npm install --prefix /home/add-hero

# Copy node_modules from container
rm -Rf node_modules
docker cp ami_bash:/home/add-hero/node_modules node_modules/

# Create zip
zip -r package.zip index.js node_modules

# Deploy to AWS
aws lambda create-function \
    --region us-west-1 \
    --function-name addHero \
    --zip-file fileb://package.zip \
    --role arn:aws:iam::012139981672:role/DynamoLambda \
    --environment Variables="{ \
      MONGO_DB_URL=mongodb://admin:admin@ds127173.mlab.com:27173/angular-demo \
    }" \
    --handler index.handler \
    --runtime nodejs6.10 \
    --profile default

# Delete zip once done
rm package.zip

# Remove node_modules
rm -Rf node_modules

# Clean up the container
docker exec -it ami_bash rm -Rf /home/add-hero

# Shutdown the contianer
docker stop ami_bash

# Remove the contianer
docker rm ami_bash
