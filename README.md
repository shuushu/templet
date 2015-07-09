# templet
grunt를 이용한 프로젝트 세팅

1) Grunt CLI 설치
먼저, Grunt의 Command Line Interface(CLI)를 설치한다. 이때, ‘-g’ 는 설치를 global로 하여 콘솔 어디서나 grunt를 사용하기 위함이다.

<pre>
 $ npm install -g grunt-cli
</pre>


2) templet을 다운 받은 후 shell 을 이용해 플러그인 설치
<pre>
npm install grunt
npm install grunt-autoprefixer
npm install grunt-concurrent
npm install grunt-contrib-clean
npm install grunt-contrib-concat
npm install grunt-contrib-connect
npm install grunt-contrib-copy
npm install grunt-contrib-csslint
npm install grunt-contrib-cssmin
npm install grunt-contrib-imagemin
npm install grunt-contrib-jshint
npm install grunt-contrib-less
npm install grunt-contrib-uglify
npm install grunt-contrib-watch
npm install grunt-csscomb
npm install grunt-htmlhint
npm install grunt-includes
npm install grunt-newer
npm install jshint-stylish
npm install load-grunt-tasks
npm install time-grunt
</pre>


3) 현재 저장소에 올라간 파일에 보면 압축 파일이 존재하는데 grunt-contrib-imagemin 제외한 모듈이 들어있다.
압축을 풀고, grunt-contrib-imagemin 만 인스톨 해주면 바로 사용할수 있다.


4) 마지막으로 shell을 이용해 서버를 실행해보자
```
& grunt serve
```