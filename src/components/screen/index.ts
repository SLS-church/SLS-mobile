import makeWebPageView from './makeWebPageView';

const HOME_PAGE_URI = 'http://m.sls.or.kr/';
const YOUTUBE_URI = 'https://www.youtube.com/channel/UCdysNhgE7XTGuMXaBBg41bA';

const HomePage = makeWebPageView(HOME_PAGE_URI);
const Youtube = makeWebPageView(YOUTUBE_URI);

export { HomePage, Youtube };
