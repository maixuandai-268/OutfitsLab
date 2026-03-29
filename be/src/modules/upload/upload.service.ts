import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
// @ts-ignore
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
    constructor(@Inject('CLOUDINARY') private readonly cloudinaryInstance: any) {}

    async uploadFile(file: Express.Multer.File) {
        const isGLB =
            file.mimetype === 'model/gltf-binary' ||
            file.originalname.toLowerCase().match(/\.(glb|gltf|obj)$/);

        // Xử lý lỗi font tiếng Việt của Multer và tạo tên file an toàn cho Cloudinary
        const utf8Name = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const safeName = utf8Name
            .normalize('NFD') // Tách dấu ra khỏi chữ
            .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
            .replace(/\s+/g, '-') // Đổi khoảng trắng thành gạch ngang
            .replace(/[^a-zA-Z0-9\-]/g, ''); // Bỏ ký tự đặc biệt
        
        const fileName = `${Date.now()}-${safeName}`;

        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: 'outfitslab',
                        resource_type: isGLB ? 'raw' : 'image',

                        public_id: isGLB ? `${fileName}.glb` : undefined,
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary Upload Error:', error);
                            const errorMsg = error.message.includes('File size limit') 
                                ? 'File quá nặng! (Cloudinary Free giới hạn 10-20MB cho file 3D). Hãy thử file nhỏ hơn.' 
                                : `Lỗi Cloudinary: ${error.message}`;
                            return reject(new InternalServerErrorException(errorMsg));
                        }

                        if (!result?.secure_url || !result?.public_id) {
                            return reject(
                                new InternalServerErrorException('Upload thất bại (Không có phản hồi từ server)'),
                            );
                        }

                        resolve({
                            url: result.secure_url,
                            public_id: result.public_id,
                            type: isGLB ? 'model' : 'image',
                        });
                    },
                )
                .end(file.buffer);
        });
    }


    async uploadMultiple(files: Express.Multer.File[]) {
        return Promise.all(files.map((file) => this.uploadFile(file)));
    }

    async deleteFile(publicId: string, resourceType: 'image' | 'raw' = 'image') {
        return cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
    }


    async updateFile(
        file: Express.Multer.File,
        oldPublicId: string,
        resourceType: 'image' | 'raw',
    ) {
        await this.deleteFile(oldPublicId, resourceType);
        return this.uploadFile(file);
    }
}