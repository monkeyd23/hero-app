# Run the container
docker run --name ami_bash -i -t -d monkeyd/ami_with_node bash

# Create folder in container home
docker exec -it ami_bash mkdir /home/authorize

# Copy package json
docker cp package.json ami_bash:/home/authorize/

# Run npm install
docker exec -it ami_bash npm install --prefix /home/authorize

# Copy node_modules from container
rm -Rf node_modules
docker cp ami_bash:/home/authorize/node_modules node_modules/

# Create zip
zip -r package.zip index.js node_modules

# Deploy to AWS
aws lambda update-function-code \
    --function-name heroAppAuthorize \
    --zip-file fileb://package.zip

# Delete zip once done
rm package.zip

# Remove node_modules
rm -Rf node_modules

# Clean up the container
docker exec -it ami_bash rm -Rf /home/authorize

# Shutdown the contianer
docker stop ami_bash

# Remove the contianer
docker rm ami_bash
