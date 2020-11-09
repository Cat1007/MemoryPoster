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
    swiperURL: []
  },

  generatePoster() {
    PosterConfig.setInfo(this.data.name, this.data.grade)
    let config = PosterConfig.getConfig()
    console.log(config.texts)
    this.setData({
      posterConfig: config
    }, () => {
      Poster.create();
    })
  },

  onPosterSuccess(e) {
    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },

  onPosterFail(e) {
    console.log(e.detail)
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
    // 拉取并配置二维码和
    wx.cloud.getTempFileURL({
      fileList: [
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Poster/cat.jpeg',
        'cloud://memory-poster-env.6d65-memory-poster-env-1304168193/Poster/qrCode.jpeg'],
      success: res => {
        PosterConfig.setImg(res.fileList[0].tempFileURL, res.fileList[1].tempFileURL)
        console.log(res.fileList)
      },
      fail: console.error
    })

    // 拉去轮播图背景链接
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
