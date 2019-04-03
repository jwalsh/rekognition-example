// Load the SDK and UUID
import AWS from 'aws-sdk';

import uuid from 'uuid';

// Create unique bucket name
const bucketName = `node-sdk-sample-${uuid.v4()}`;
// Create name for uploaded object key
const keyName = 'hello_world.txt';

// Create a promise on S3 service object
const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
	data => {
		const objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
		const uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
		uploadPromise.then(
			data => {
				console.log(`Successfully uploaded data to ${bucketName}/${keyName}`);
			});
	}).catch(
		err => {
			console.error(err, err.stack);
		});
