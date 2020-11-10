const GRADE = 0
const NAME = 1
const TITLE = 2

const BACKGROUND = 0
const QRCODE = 1

const TITLELIST = [
    "肇中权威级考古学家",
    "肇中行走小百科",
    "肇中忠实铁粉",
    "肇中冷知识文化推广大使",
    "肇中热知识产权持有者",
    "肇中全球粉丝后援会会员",
]

var PosterConfig = {
    posterConfig: {
        width: 2100,
        height: 3000,
        debug: false,
        preload: true,
        blocks: [
            {
                x: 170,
                y: 490,
                height: 120,
                width: 350,
                zIndex: 10,
                text: {
                    x: 0,
                    y: 0,
                    text: '',
                    fontSize: 100,
                    color: '#000000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    baseLine: 'middle'
                }
            },
            {
                x: 630,
                y: 490,
                height: 120,
                width: 450,
                zIndex: 10,
                text: {
                    x: 0,
                    y: 0,
                    text: '',
                    fontSize: 100,
                    color: '#000000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    baseLine: 'middle'
                }
            },
            {
                x: 780,
                y: 875,
                height: 115,
                width: 940,
                zIndex: 10,
                text: {
                    x: 0,
                    y: 0,
                    text: '',
                    fontSize: 83,
                    color: '#000000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    baseLine: 'middle',
                    fontFamily: 'FZZhongDengXian-Z07S'
                }
            }

        ],
        images: [
            {
                x: 0,
                y: 0,
                url: '',
                width: 2100,
                height: 3000,
                zIndex: 1
            },
            {
                x: 288,
                y: 2460,
                url: '',
                width: 380,
                height: 380,
                zIndex: 5
            }
        ]
    },
    setInfo(name, grade) {
        this.posterConfig.blocks[NAME].text.text = name
        this.posterConfig.blocks[GRADE].text.text = grade
        let index = Math.floor(Math.random() * TITLELIST.length)
        this.posterConfig.blocks[TITLE].text.text = TITLELIST[index]
    },
    setImg(background, qrcode) {
        this.posterConfig.images[BACKGROUND].url = background
        this.posterConfig.images[QRCODE].url = qrcode
    },
    getConfig() { return this.posterConfig }
}

export default PosterConfig