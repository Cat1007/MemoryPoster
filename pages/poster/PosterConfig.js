const NAME = 0
const GRADE = 1
const TITLW = 2

const BACKGROUND = 0
const QRCODE = 1

var PosterConfig = {
    posterConfig: {
        width: 800,
        height: 550,
        debug: false,
        texts: [
            {
                x: 100,
                y: 100,
                text: '校友名字占位符',
                fontSize: 40,
                color: '#ffffff'
            },
            {
                x: 100,
                y: 180,
                text: '校友毕业年份占位符',
                fontSize: 40,
                color: '#ffffff'
            },
            {
                x: 100,
                y: 220,
                text: '证书标题',
                fontSize: 40,
                color: '#ffffff'
            }
        ],
        images: [
            {
                x: 0,
                y: 0,
                url: '',
                width: 800,
                height: 550
            },
            {
                x: 700,
                y: 400,
                url: '',
                width: 80,
                height: 80
            }
        ]
    },
    setInfo(name,grade) {
        this.posterConfig.texts[NAME].text = name
        this.posterConfig.texts[GRADE].text = grade
    },
    setImg(background,qrcode) {
        this.posterConfig.images[BACKGROUND].url = background
        this.posterConfig.images[QRCODE].url = qrcode
    },
    getConfig() { return this.posterConfig }
}

export default PosterConfig