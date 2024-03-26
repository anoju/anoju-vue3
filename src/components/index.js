// Components 폴더 내의 모든 Vue 및 JavaScript 파일 가져오기
export function registerComponents(app) {
  //const files = require.context('@/components', true, /\.(vue|js)$/);
  const files = require.context('@/components', true, /\.vue$/);
  files.keys().forEach((key) => {
    const name = key.replace(/^.+\/([^/]+)\.\w+$/, '$1'); // 파일 이름 추출
    const component = files(key).default; // 컴포넌트 가져오기
    // console.log('Registering component:', name); // 등록된 컴포넌트 확인
    app.component(name, component); // 전역으로 컴포넌트 등록
  });
}
