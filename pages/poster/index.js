import Poster from '../../miniprogram_npm/wxa-plugin-canvas/poster/poster';
import PosterConfig from '../poster/PosterConfig'

const pageOptions = {
  // 页面数据
  data: {
    posterUrl: '',
    name: '',
    grade: '2023',
    posterConfig: null,
    grades: [],
    changeGradeShow: false,
    swiperURL: [],
    photoAlbumAccess: false,
    posterShow: false,
    generateEnabled: true,
    nameErrorMsg: '',
    savingLoading: false,
    saved: false
  },

  // 保存图片到相册
  savePoster() {
    var that = this

    that.setData({
      savingLoading: true
    })

    // 拉取用户是否获取相册权限
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        if (res.authSetting['scope.writePhotosAlbum']) {
          // 保存操作
          wx.saveImageToPhotosAlbum({
            filePath: that.data.posterUrl,
            success(res) {
              that.setData({
                posterShow: false,
                savingLoading: false,
                saved: true
              })
            }
          })
        } else {
          wx.authorize({
            scope: "scope.writePhotosAlbum",
            success(res) {
              // 保存操作
              wx.saveImageToPhotosAlbum({
                filePath: that.data.posterUrl,
                success(res) {
                  that.setData({
                    posterShow: false,
                    savingLoading: false,
                    saved: true
                  })
                }
              })
            },
            fail(res) {
              // 提示打开权限
              wx.showToast({
                title: '保存失败,请点击右上角省略号打开相册权限',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                savingLoading: false
              })
            }
          })
        }
      }
    })

  },

  // 根据配置生成海报
  generatePoster() {
    if (this.checkName()) {
      this.setData({
        generateEnabled: false
      })
      // 设置对应的名字和年级
      PosterConfig.setInfo(this.data.name, this.data.grade)
      let config = PosterConfig.getConfig()
      console.log(config.texts)
      this.setData({
        posterConfig: config
      }, () => {
        Poster.create();
      })
    }
  },

  // 生成成功
  onPosterSuccess(e) {
    var that = this
    const { detail } = e;
    // 显示预览界面
    that.setData({
      posterUrl: detail,
      posterShow: true,
      generateEnabled: true
    })
  },

  onPosterFail(e) {
    console.log(e.detail)
    wx.showToast({
      title: '生成失败，请重试',
      icon: 'none',
      duration: 2000
    })
    this.setData({
      generateEnabled: true
    })
  },

  // 检查称呼是否为空
  checkName() {
    if (this.data.name == '') {
      this.setData({
        nameErrorMsg: '昵称不能为空'
      })
      return false
    } else if (this.data.name.length >= 5) {
      this.setData({
        nameErrorMsg: '昵称不能超过4个字符'
      })
      return false
    }
    else {
      this.setData({
        nameErrorMsg: ''
      })
      return true
    }
  },

  onNameChange() {
    this.checkName()
  },

  toggleChangeGradeShow() {
    this.setData({
      changeGradeShow: !this.data.changeGradeShow
    })
  },

  onGradeChange(e) {
    this.setData({
      grade: e.detail.value
    })
  },

  // 页面载入时
  onLoad(e) {
    this.init(e)
  },
  // 页面初始化
  init(e) {
    var that = this
    // 拉取并配置海报二维码和背景的链接
    wx.cloud.getTempFileURL({
      fileList: [
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Poster/证书背景1.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Poster/证书背景2.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Poster/证书背景3.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Poster/证书背景4.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Poster/qrCode.jpeg',
      ],
      success: res => {
        let index = Math.floor(Math.random() * 4)
        PosterConfig.setImg(res.fileList[index].tempFileURL, res.fileList[4].tempFileURL)
        console.log(res.fileList)
      },
      fail: console.error
    })

    // 拉取轮播图背景链接
    wx.cloud.getTempFileURL({
      fileList: [
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/图艺楼.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/孔子.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/宿舍.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/宿舍晚.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/操场跑操.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/高三教室.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/高三楼.jpg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Carousel/高三楼晚上.jpg'
      ],
      success: res => {
        let temp = []
        for (let index = 0; index < res.fileList.length; index++) {
          temp.push(res.fileList[index].tempFileURL)
        }
        this.setData({
          swiperURL: temp
        })
      },
      fail: console.error
    })

    // 初始化可选年份
    let temp = []
    for (let index = 2023; index > 1980; index--) {
      temp.push(index.toString())
      this.setData({
        grades: temp
      })
    }
  },
  // 页面准备好时
  onReady() { },
  // 页面显示时
  onShow() {

  },
  // 页面隐藏时
  onHide() { },
  // 页面卸载时
  onUnload() { },
  // 下拉页面时
  onPullDownRefresh() { },
  // 到达页面底部时
  onReachBottom() { },
  // 页面滚动时
  onPageScroll() { },
}

Page(pageOptions)
