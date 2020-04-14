# SLS-mobile
서울광염교회앱 소스코드입니다.
서울광염교회 앱은 현재 단순하게 광염교회 홈페이지와 유튜브 페이지를 웹뷰로 보여줍니다.

## RN 환경설정
`react-native`프레임워크 0.62 버전을 사용하여 개발하였습니다.
`node` 또는 `yarn`이 설치되어 있어야 합니다. 
자세한 개발환경설정 방법은 [이 페이지](https://reactnative.dev/docs/environment-setup)를 참조하세요.

## node modules 설치
SLS-mobile 저장소를 클론하여 yarn 이나 npm 으로 의존성 모듈을 설치합니다. 
```
git clone https://github.com/SLS-church/SLS-mobile
cd SLS-mobile
yarn install
```
### iOS의 경우
iOS 앱을 빌드하기 위해서는 pod 패키지를 설치해야 합니다. 
```
cd ios && pod install
```

## 디버그 버전 실행
`yarn start` 로 메트로번들러를 실행합니다. 
`yarn ios`로 앱을 iOS시뮬레이터에서 실행합니다.
`yarn android`로 앱을 연결된 디바이스나 안드로이드 시뮬레이터에서 실행합니다. 


## 릴리즈 버전 빌드
### Android
```
cd android
./gradlew bundleRelease
```
### iOS
xCode로 빌드합니다.

## 이슈
발견된 문제점이나 개선요청사항은 [이슈 페이지](https://github.com/SLS-church/SLS-mobile/issues)에 등록해 주세요.

## 기여자
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/JongtaekChoi">
      <img src="https://avatars1.githubusercontent.com/u/17980230?v=4" width="60px;" alt=""/>
      <br />
      <sub><b>Choi, Jongtaek</b></sub>
      </a>
      <br />
      <a href="https://github.com/SLS-church/SLS-mobile/commits?author=JongtaekChoi" title="Code">💻</a> 
    </td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

