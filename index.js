'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'LIAMDEV_PLAYER_STORAGE_KEY';

const nowPlaying = $('.now-playing');
const trackArt = $('.track-art');
const trackName = $('.track-name');
const trackSingle = $('.track-single');
const seekSlider = $('#seek_slider');
const volumeSlider = $('#volume_slider');
const currentTime = $('.current-time');
const totalDuration = $('.total-duration');
const audio = $('#audio');
const playPauseBtn = $('.playpause-track');
const playPauseIcon = $('.playPauseIcon');
const nextButton = $('.next-track img');
const prevButton = $('.prev-track img');
const repeatButton = $('.repeat-track');
const randomButton = $('.random-track');
const wave = document.getElementById('wave');
// console.log(playPauseIcon.src);

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: 'Cứ Chill Thôi',
      singer: ['Chillies', 'Suni Hạ Linh', 'Rhymastic'],
      path: './assets/music/listSong1/song1.mp3',
      image: './assets/images/listSong1/song1.jpg',
    },
    {
      name: 'Crush',
      singer: ['WN', 'Vani', 'An An'],
      path: './assets/music/listSong1/song2.mp3',
      image: './assets/images/listSong1/song2.jpg',
    },
    {
      name: 'Vô Tình',
      singer: ['Xesi', 'Hoaprox'],
      path: './assets/music/listSong1/song3.mp3',
      image: './assets/images/listSong1/song3.jpg',
    },
    {
      name: "Because I'm Stupid",
      singer: ['SS501'],
      path: './assets/music/listSong1/song4.flac',
      image: './assets/images/listSong1/song4.jpg',
    },
    {
      name: 'Mama Boy',
      singer: ['AMEE'],
      path: './assets/music/listSong1/song5.mp3',
      image: './assets/images/listSong1/song5.jpg',
    },
    {
      name: 'Anh Đã Quen Với Cô Đơn',
      singer: ['Soobin Hoàng Sơn'],
      path: './assets/music/listSong1/song7.mp3',
      image: './assets/images/listSong1/song7.jpg',
    },
    {
      name: 'Túy Âm',
      singer: ['Xesi', 'Masew', 'Nhật Nguyễn'],
      path: './assets/music/listSong1/song8.mp3',
      image: './assets/images/listSong1/song8.jpg',
    },
    {
      name: 'Kém Duyên',
      singer: ['Rum', 'NIT', 'Masew'],
      path: './assets/music/listSong1/song9.mp3',
      image: './assets/images/listSong1/song9.jpg',
    },
    {
      name: 'Tình Bạn Diệu Kì',
      singer: ['AMEE', 'Ricky Star', 'Lăng LD'],
      path: './assets/music/listSong1/song10.flac',
      image: './assets/images/listSong1/song10.jpg',
    },
    {
      name: 'Em Có Nghe',
      singer: ['Kha'],
      path: './assets/music/listSong1/song11.mp3',
      image: './assets/images/listSong1/song11.jpg',
    },
    {
      name: 'Lạc Trôi',
      singer: ['Sơn Tùng M-TP'],
      path: './assets/music/listSong1/song12.mp3',
      image: './assets/images/listSong1/song12.jpg',
    },
    {
      name: 'Một Năm Mới Bình An',
      singer: ['Sơn Tùng MTP'],
      path: './assets/music/listSong1/song13.mp3',
      image: './assets/images/listSong1/song13.jpg',
    },
    {
      name: 'Hongkong1 (Official Version)',
      singer: ['Nguyễn Trọng Tài', 'San Ji', 'Double X'],
      path: './assets/music/listSong1/song14.mp3',
      image: './assets/images/listSong1/song14.jpg',
    },
    {
      name: 'Gác Lại Âu Lo',
      singer: ['Da LAB', 'Miu Lê'],
      path: './assets/music/listSong1/song15.mp3',
      image: './assets/images/listSong1/song15.jpg',
    },
    {
      name: 'Chạy Ngay Đi',
      singer: ['Sơn Tùng MTP'],
      path: './assets/music/listSong1/song16.mp3',
      image: './assets/images/listSong1/song16.jpg',
    },
    {
      name: 'Cùng Anh',
      singer: ['Ngọc Dolil', 'Hagi', 'STee'],
      path: './assets/music/listSong1/song17.mp3',
      image: './assets/images/listSong1/song17.jpg',
    },
    {
      name: 'Hãy Trao Cho Anh',
      singer: ['Sơn Tùng MTP'],
      path: './assets/music/listSong1/song18.mp3',
      image: './assets/images/listSong1/song18.jpg',
    },
    {
      name: 'Tộc Ca',
      singer: ['Phúc Du', 'SONBEAT'],
      path: './assets/music/listSong1/song19.mp3',
      image: './assets/images/listSong1/song19.jpg',
    },
    {
      name: 'Phố Đã Lên Đèn',
      singer: ['Phố Đã Lên Đèn'],
      path: './assets/music/listSong1/song21.mp3',
      image: './assets/images/listSong1/song21.jpg',
    },
    {
      name: 'Rồi Tới Luôn',
      singer: ['Nal'],
      path: './assets/music/listSong2/song1.mp3',
      image: './assets/images/listSong2/song1.jpg',
    },
    {
      name: 'Yêu Là Cưới',
      singer: ['PHÁT HỒ X2X'],
      path: './assets/music/listSong2/song2.mp3',
      image: './assets/images/listSong2/song2.jpg',
    },
    {
      name: 'Độ Tộc 2',
      singer: ['Masew', 'Độ Mixi', 'Phúc Du', 'Pháo'],
      path: './assets/music/listSong2/song3.mp3',
      image: './assets/images/listSong2/song3.jpg',
    },
    {
      name: 'Chúng Ta Của Hiện Tại',
      singer: ['Sơn Tùng M-TP'],
      path: './assets/music/listSong2/song4.mp3',
      image: './assets/images/listSong2/song4.jpg',
    },
    {
      name: 'Em Không Hiểu',
      singer: ['Changg', 'Minh Huy'],
      path: './assets/music/listSong2/song5.mp3',
      image: './assets/images/listSong2/song5.jpg',
    },
    {
      name: 'Đã Lỡ Yêu Em Nhiều',
      singer: ['JustaTee'],
      path: './assets/music/listSong2/song6.mp3',
      image: './assets/images/listSong2/song6.jpg',
    },
    {
      name: 'Cưới Đi',
      singer: ['2T', 'ChangC'],
      path: './assets/music/listSong2/song7.mp3',
      image: './assets/images/listSong2/song7.jpg',
    },
    {
      name: 'Ái Nộ',
      singer: ['Masew', 'Khoi Vu'],
      path: './assets/music/listSong2/song8.mp3',
      image: './assets/images/listSong2/song8.jpg',
    },
    {
      name: 'Thằng Điên',
      singer: ['JustaTee', 'Phương Ly'],
      path: './assets/music/listSong2/song9.mp3',
      image: './assets/images/listSong2/song9.jpg',
    },
    {
      name: 'Yêu Đơn Phương',
      singer: ['OnlyC', 'Karik'],
      path: './assets/music/listSong2/song10.mp3',
      image: './assets/images/listSong2/song10.jpg',
    },
    {
      name: 'Trời Giấu Trời Mang Đi',
      singer: ['AMEE', 'VIRUSS'],
      path: './assets/music/listSong2/song11.mp3',
      image: './assets/images/listSong2/song11.jpg',
    },
    {
      name: "Ex's Hate Me",
      singer: ['B Ray', 'Masew', 'AMEE'],
      path: './assets/music/listSong2/song12.mp3',
      image: './assets/images/listSong2/song12.jpg',
    },
    {
      name: 'The PlayAh(Special Performance / Official Music Video)',
      singer: ['Soobin', 'SlimV'],
      path: './assets/music/listSong2/song13.mp3',
      image: './assets/images/listSong2/song13.jpg',
    },
    {
      name: 'Muộn Rồi Mà Sao Còn',
      singer: ['Sơn Tùng MTP'],
      path: './assets/music/listSong2/song14.mp3',
      image: './assets/images/listSong2/song14.jpg',
    },
    {
      name: 'Cưới Thôi',
      singer: ['Masew', 'B Ray', 'TAP'],
      path: './assets/music/listSong2/song15.mp3',
      image: './assets/images/listSong2/song15.jpg',
    },
    {
      name: 'Mượn Rượu Tỏ Tình',
      singer: ['Big Daddy', 'Emily'],
      path: './assets/music/listSong2/song16.mp3',
      image: './assets/images/listSong2/song16.jpg',
    },
    {
      name: 'Yêu Một Người Có Lẽ',
      singer: ['Lou Hoàng', 'Miu Lê'],
      path: './assets/music/listSong2/song17.mp3',
      image: './assets/images/listSong2/song17.jpg',
    },
    {
      name: 'Anh Không Đòi Quà',
      singer: ['OnlyC', 'Karik'],
      path: './assets/music/listSong2/song18.mp3',
      image: './assets/images/listSong2/song18.jpg',
    },
    {
      name: 'Đi Đu Đưa Đi',
      singer: ['Bích Phương'],
      path: './assets/music/listSong2/song19.mp3',
      image: './assets/images/listSong2/song19.jpg',
    },
    {
      name: 'BlackJack',
      singer: ['Soobin', 'Binz'],
      path: './assets/music/listSong2/song20.webm',
      image: './assets/images/listSong2/song20.jpg',
    },
  ],
  //Định nghĩa các thuộc tính trong trang web
  defineProperties() {
    //Định nghĩa thuộc tính currentSong để gọi ở nhiều nơi
    Object.defineProperty(this, 'currentSong', {
      get: () => this.songs[this.currentIndex],
    });
  },
  //Lắng nghe những sự kiện của web khi người dùng nhấn
  handlerEvents() {
    const _this = this;

    //Xử lý CD quay / dừng
    const cdAnimate = trackArt.animate([{ transform: 'rotate(360deg)' }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdAnimate.pause();
    //Lắng nghe khi sự kiện khi nhấn nút play
    playPauseBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    //Khi bài hát được play
    audio.onplay = function () {
      _this.isPlaying = true;
      wave.classList.add('loader');
      playPauseIcon.src = './assets/images/icon-svg/pause.svg';
      cdAnimate.play();
    };
    //Khi bài hát được pause
    audio.onpause = function () {
      _this.isPlaying = false;
      wave.classList.remove('loader');
      playPauseIcon.src = './assets/images/icon-svg/play.svg';
      cdAnimate.pause();
    };

    //Load thanh tiến độ bài hát
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const currentTimePercent = Math.floor((audio.currentTime / audio.duration) * 100);
        // console.log(currentTimePercent);
        seekSlider.value = currentTimePercent;
        // console.log(Math.floor(audio.currentTime));
      }
    };

    //Xử lý khi tua thanh tiến độ
    seekSlider.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    //Next song
    nextButton.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
    };
    //Prev song
    prevButton.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
    };

    //random bật / tắt
    randomButton.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomButton.classList.toggle('active', _this.isRandom);
    };

    //Xử lý repeat bài hát
    repeatButton.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      repeatButton.classList.toggle('active', _this.isRepeat);
    };

    //Xử lý khi bài hát kết thúc
    audio.onended = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else if (_this.isRepeat) {
        audio.play();
      } else {
        _this.prevSong();
      }
      audio.play();
    };
  },

  //Hàm load bài hát đầu tiên
  loadCurrentSong() {
    trackArt.style.backgroundImage = `url(${this.currentSong.image})`;
    trackName.textContent = this.currentSong.name;
    trackSingle.textContent = this.currentSong.singer;
    audio.src = this.currentSong.path;
    nowPlaying.innerHTML = `PLAYING ${this.currentIndex + 1} OF ${this.songs.length}`;

    //Hàm convert số giây sang phút -- Đang bị lỗi

    if (audio.duration) {
      var minutes = Math.floor(this.currentSong.duration / 60);
      var remainingSeconds = this.currentSong.duration % 60;
      var formattedMinutes = ('0' + minutes).slice(-2);
      var formattedSeconds = ('0' + remainingSeconds).slice(-2);

      totalDuration.textContent = `${formattedMinutes} : ${formattedSeconds}`;
    }
  },

  //Load âm lượng bài hát -- Đang lỗi

  loadConfig() {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;

    // Object.assign(this, this.config);
  },

  //next song
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  //Prev song
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  //   random song
  playRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.currentIndex === newIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  getRandomSongs() {
    let currentIndex = this.songs.length;
    let temporaryValue = null;
    let randomIndex = null;

    // Chạy vòng lặp để xáo trộn danh sách các bài hát
    while (currentIndex !== 0) {
      // Lấy một vị trí ngẫu nhiên trong mảng
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Hoán đổi chỗ phần tử hiện tại với phần tử ở vị trí ngẫu nhiên
      temporaryValue = this.songs[currentIndex];
      this.songs[currentIndex] = this.songs[randomIndex];
      this.songs[randomIndex] = temporaryValue;
    }
    console.log(this.songs[randomIndex]);
  },

  //Hàm khỏi tạo
  start() {
    //Gán cấu hình từ config vào ứng dụng
    this.loadConfig();
    //Định nghĩa các thuộc tính trong ứng dụng
    this.defineProperties();
    //Lắng nghe các sự kiện trong trang web
    this.handlerEvents();
    //load thông tin bài hát đầu tiên khi chạy ứng dụng
    this.loadCurrentSong();
    // this.setVolume();
    // this.getRandomSongs();
    randomButton.classList.toggle('active', this.isRandom);
    repeatButton.classList.toggle('active', this.isRepeat);
  },
};

app.start();

function setVolume(volume) {
  let audio = document.getElementById('volume_slider');
  if (audio) {
    audio.volume = volume;
  }
}

//Những thứ còn thiếu
//1. Hiển thị số giây hiện tại
//2. Hiển thị số giáy của bài hát
//3. Tùy chỉnh âm lượng của bài hát
//4. Repeat song *
//5. Nốt nhạc bay
//6. Hạn chế sự lặp lại của random
