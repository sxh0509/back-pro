import { ref } from 'vue'

/*图型验证码*/
export function useGetImgCode() {
  //图片验证码
  const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)

  //点击切换图片验证码
  const getImgCode = () => {
    console.log('toggle img')
  }
  return { imgCodeSrc, getImgCode }
}
