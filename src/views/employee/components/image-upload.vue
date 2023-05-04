<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
  >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'

export default {
  name: 'ImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    // 检查函数
    beforeAvatarUpload(file) {
      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG GIF BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    uploadImage(params) {
      console.log(params.file)
      // 完成初始化
      const cos = new COS({
        SecretId: 'AKIDzpSu9Axb2FEyVnrgaIrHXcT5VihRwDI9',
        SecretKey: 'e6KK5h5FAsOjsoY7TcbbVGqQt9C4kDXh'
      })
      cos.putObject({
        Bucket: 'jcy9421-1305148721', // 存储桶名称
        Region: 'ap-beijing', // 存储同地域
        Key: params.file.name,
        StorageClass: 'STANDARD',
        Body: params.file
      }, (err, data) => {
        console.log(err, data)
        if (data.statusCode === 200 && data.Location) {
          this.$emit('input', 'http://' + data.Location)
        } else {
          this.$message.error(err.Message)
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
