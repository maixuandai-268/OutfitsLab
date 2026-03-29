import { BadRequestException } from '@nestjs/common';

export const fileFilter = (req, file, callback) => {
  const isImage = file.mimetype.match(/\/(jpg|jpeg|png|webp)$/);

  const isGLB =
    file.mimetype === 'model/gltf-binary' ||
    file.originalname.toLowerCase().match(/\.(glb|gltf|obj)$/);

  if (!isImage && !isGLB) {
    return callback(
      new BadRequestException('Chỉ hỗ trợ các định dạng ảnh (jpg, jpeg, png, webp) và mô hình 3D (glb, gltf, obj)'),
      false,
    );
  }

  callback(null, true);
};