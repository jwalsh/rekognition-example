const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');


const bucketName = `rekognition-${uuidv4()}`;
const keyName = 'hello_world.txt';

const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'})
	.createBucket({Bucket: bucketName})
	.promise();

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
