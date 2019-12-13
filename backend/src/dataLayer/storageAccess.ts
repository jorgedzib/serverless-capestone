import * as AWS  from 'aws-sdk'

  export class UploadAccess {
    constructor(
        private readonly s3: AWS.S3 = new AWS.S3({signatureVersion: 'v4'}),  
        private readonly bucketName: string = process.env.ATTACHMENT_S3_BUCKET, 
        private readonly urlExpiration: string = process.env.SIGNED_URL_EXPIRATION
        ) {}

        getUploadUrl(recipeId: string) {
            return this.s3.getSignedUrl('putObject', {
              Bucket: this.bucketName,
              Key: recipeId,
              Expires: this.urlExpiration
            })
          }

          findUrl(recipeId: string): string {
            return `https://${this.bucketName}.s3.amazonaws.com/${recipeId}`
          }
      


}

