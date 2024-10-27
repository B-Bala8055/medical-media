import { S3Client, PutObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.S3_REGION
})

const genFileName = (fileName) => crypto.randomUUID() + "." + fileName.split(".").pop()

export async function uploadSingleFile(media) {

    const fileName = genFileName(media.name)

    const mediaFileCheck = media instanceof Blob ? true : false;

    if (mediaFileCheck === false || media.size === 0) {
        return null
    }

    if (typeof media?.size !== 'undefined' && media?.size > Number(process.env.MEDIA_SIZE_LIMIT_BYTES)) {
        return null
    }

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: await (media.arrayBuffer()),
        ContentType: media.type
    })

    try {
        const data = await s3Client.send(command)

        let link = null

        if (data.$metadata.httpStatusCode === 200) {
            console.log("Upload success")
            link = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`
        }
        return link
    } catch (err) {
        console.log(err)
        return null
    }

}

export async function uploadFileList(mediaFiles) {

    const success = []
    let fail = 0

    for (let i = 0; i < mediaFiles.length; i++) {
        const mediaFileCheck = mediaFiles[i] instanceof Blob ? true : false;

        if (mediaFileCheck === false || mediaFiles[i].size === 0 || mediaFiles[i]?.size > Number(process.env.MEDIA_SIZE_LIMIT_BYTES)) {
            fail++
            continue
        }

        const fileName = genFileName(mediaFiles[i].name)

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: await (mediaFiles[i].arrayBuffer()),
            ContentType: mediaFiles[i].type
        })

        try {
            const data = await s3Client.send(command)

            let link = null

            if (data.$metadata.httpStatusCode === 200) {
                link = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`
                success.push(link)
            } else {
                fail++
            }
        } catch (err) {
            console.log(err)
            fail++
        }
    }
    console.log(success, fail)
    return { success, fail }
}

export async function deleteSingleFile(link) {

    if (typeof link === 'undefined') {
        return false
    }

    const fileName = link.split("/").pop()

    if (typeof fileName === 'undefined') {
        // throw new Error("Cannot delete file")
        return false
    }

    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName
    })

    try {
        await s3Client.send(command)
        return true
    } catch (error) {
        // throw new Error("Cannot delete file")
        return false
    }

}

export async function deleteMultipleFiles(links) {

    if (typeof links === 'undefined' || links.length === 0) {
        return false
    }
    console.log("Got links ", links)
    const fileNames = []

    for (let i = 0; i < links.length; i++) {

        const fileName = links[i].split("/").pop()

        if (typeof fileName === 'undefined') {
            continue
        }

        fileNames.push({ Key: fileName })

    }
    console.log("files to delete ", fileNames)

    const command = new DeleteObjectsCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: { Objects: fileNames }
    })

    try {
        await s3Client.send(command)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}